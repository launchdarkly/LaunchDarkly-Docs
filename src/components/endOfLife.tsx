/** @jsx jsx */
import { jsx } from 'theme-ui'
import sdkData from '../content/sdkVersions.json'
import relayData from '../content/relayVersions.json'
import Table, { TableBody, TableCell, TableHeadCell, TableHeader, TableRow } from './mdx/table'
import Details from './mdx/details'

export function SdksEndOfLife() {
  return <EndOfLife data={sdkData} expandable={true} />
}

export function RelayEndOfLife() {
  return <EndOfLife data={relayData} expandable={false} />
}

type EOLVersion = {
  versionMajorMinor: string
  releaseYear: number
  releaseMonthDay: string
}

type EOL = {
  name: string
  versions: EOLVersion[]
}

type EndOfLifeProps = {
  data: EOL[]
  expandable: boolean
}

function EndOfLife({ data, expandable }: EndOfLifeProps) {
  const eols: EOL[] = data

  if (!eols) {
    console.warn("There's no EOL data")
    return null
  }

  const getVersion = (v: EOLVersion) => {
    return v.versionMajorMinor + '.x'
  }

  const getInitialReleaseDate = (v: EOLVersion) => {
    return v.releaseYear + '-' + v.releaseMonthDay
  }

  const getEOLText = (v: EOLVersion) => {
    return v.releaseYear + 1 + '-' + v.releaseMonthDay
  }

  const getEOL = (vs: EOLVersion[], i: number) => {
    if (i == 0) return 'Current'
    else if (vs.length > i) return getEOLText(vs[i - 1])
    else return 'Unknown'
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
                <TableRow key={name + v.versionMajorMinor}>
                  <TableCell>{getVersion(v)}</TableCell>
                  <TableCell>{getInitialReleaseDate(v)}</TableCell>
                  <TableCell>{getEOL(versions, i)}</TableCell>
                </TableRow>
              ))}
              {oldestVersion.versionMajorMinor !== '1.0' ? (
                <TableRow key={name + 'Older'}>
                  <TableCell>{'< ' + getVersion(oldestVersion)}</TableCell>
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
