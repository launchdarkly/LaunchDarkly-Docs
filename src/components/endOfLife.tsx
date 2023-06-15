/** @jsx jsx */
import { jsx } from 'theme-ui'

import relayData from '../content/relayVersions.json'
import sdkData from '../content/sdkVersions.json'

import Details from './mdx/details'
import Table, { TableBody, TableCell, TableHeadCell, TableHeader, TableRow } from './mdx/table'

export function SdksEndOfLife() {
  return <EndOfLife data={sdkData} expandable={true} />
}

export function RelayEndOfLife() {
  return <EndOfLife data={relayData} expandable={false} />
}

/**
 * Represents a single version entry within an SDK's EOL policy JSON.
 */
type RawVersionEntry = {
  versionMajorMinor: string
  releaseYear: number
  releaseMonthDay: string
}

/**
 * Represents a list of version entries specific to an SDK in the policy JSON.
 */
type RawEOLPolicy = {
  name: string
  versions: RawVersionEntry[]
}

/**
 * Represents a transformation of a raw entry in order to parse out the
 * major/minor versions from the combined versionMajorMinor field.
 */
type VersionEntry = {
  versionMajor: number
  versionMinor: number
  releaseYear: number
  releaseMonthDay: string
}

/**
 * Represents a list of VersionEntries suitable for usage in EOL calculations.
 */
type EOLPolicy = {
  name: string
  versions: VersionEntry[]
}

/**
 * Passed into the EndOfLife components.
 */
type EndOfLifeProps = {
  data: RawEOLPolicy[]
  expandable: boolean
}

function EndOfLife({ data, expandable }: EndOfLifeProps) {
  const getVersionNumbers = (semver: string) => {
    return semver.split('.').map(v => parseInt(v))
  }

  const parseSemVer = (eols: RawVersionEntry[]): VersionEntry[] => {
    return eols.map(eol => {
      const [major, minor] = getVersionNumbers(eol.versionMajorMinor)
      return { ...eol, versionMajor: major, versionMinor: minor }
    })
  }

  const getFullVersion = (v: VersionEntry) => {
    return v.versionMajor + '.' + v.versionMinor
  }

  const getDisplayVersion = (v: VersionEntry) => {
    return getFullVersion(v) + '.x'
  }

  const getInitialReleaseDate = (v: VersionEntry) => {
    return v.releaseYear + '-' + v.releaseMonthDay
  }

  const getEOLText = (v: VersionEntry) => {
    return v.releaseYear + 1 + '-' + v.releaseMonthDay
  }

  const getEOL = (vs: VersionEntry[], i: number) => {
    if (i == 0) {
      return 'Current'
    }
    const nextMajor = getNextMajor(vs, i)
    const nextRelease = i - 1

    // If this is a version within the currently supported major version,
    // then the EOL date is the next release + 1 year.
    if (nextMajor == i) {
      return getEOLText(vs[nextRelease])
    }

    // Otherwise, there's another major version out: cap the EOL date
    // at min(nextMajor + 1 year, nextRelease + 1 year). Otherwise, releases
    // to old major branches will indefinitely extend the support window.

    const nextMajorEOL = getEOLText(vs[nextMajor])
    const nextReleaseEOL = getEOLText(vs[nextRelease])

    if (new Date(nextMajorEOL) < new Date(nextReleaseEOL)) {
      return nextMajorEOL
    } else {
      return nextReleaseEOL
    }
  }
  const getNextMajor = (vs: VersionEntry[], i: number) => {
    const currMajor = vs[i].versionMajor
    for (let j = i - 1; j >= 0; j--) {
      if (vs[j].versionMajor > currMajor) {
        return j
      }
    }
    return i
  }

  const eols: EOLPolicy[] = data.map(eol => ({ name: eol.name, versions: parseSemVer(eol.versions) }))

  if (!eols) {
    console.warn("There's no EOL data")
    return null
  }

  return (
    <div>
      {eols.map(({ name, versions }) => {
        if (!versions.length) {
          return
        }
        const oldestVersion = versions[versions.length - 1]
        const tableContent = (
          <Table>
            <TableHeader>
              <TableHeadCell>Version</TableHeadCell>
              <TableHeadCell>Initial release date</TableHeadCell>
              <TableHeadCell>End of life (EOL)</TableHeadCell>
            </TableHeader>
            <TableBody>
              {versions.map((v, i) => (
                <TableRow key={name + getFullVersion(v)}>
                  <TableCell>{getDisplayVersion(v)}</TableCell>
                  <TableCell>{getInitialReleaseDate(v)}</TableCell>

                  <TableCell>{getEOL(versions, i)}</TableCell>
                </TableRow>
              ))}
              {getFullVersion(oldestVersion) !== '1.0' ? (
                <TableRow key={name + 'Older'}>
                  <TableCell>{'< ' + getDisplayVersion(oldestVersion)}</TableCell>
                  <TableCell>{'Various'}</TableCell>
                  <TableCell>{getEOLText(oldestVersion) + ' or earlier'}</TableCell>
                </TableRow>
              ) : (
                ''
              )}
            </TableBody>
          </Table>
        )
        return (
          <div key={name}>
            {expandable ? (
              <Details summary={name} open={false}>
                <h3 sx={{ fontSize: 5, lineHeight: 'medium', mb: 2 }}>{name}</h3>
                {tableContent}
              </Details>
            ) : (
              tableContent
            )}
          </div>
        )
      })}
    </div>
  )
}
