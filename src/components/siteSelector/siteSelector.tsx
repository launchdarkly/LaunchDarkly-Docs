/** @jsx jsx */
import { jsx } from 'theme-ui'
import { navigate } from 'gatsby'
import React, { ChangeEventHandler } from 'react'
import { SiteType } from '../../types/siteType'
import useSite from './useSite'
import { getUrlSiteAware } from './siteUtils'

const SiteSelector = () => {
  const [site, setSite] = useSite()

  const onChangeSite: ChangeEventHandler<HTMLSelectElement> = event => {
    const selectedValue = event.target.value as SiteType
    setSite(selectedValue)

    navigate(getUrlSiteAware('', selectedValue, true), { replace: true })
  }

  return (
    <select
      onChange={onChangeSite}
      value={site}
      sx={{
        border: '1px solid',
        borderColor: 'grayBase',
        borderRadius: '6px',
        mr: 4,
      }}
    >
      <option value="launchDarkly">LaunchDarkly docs</option>
      <option value="federal">Federal docs</option>
    </select>
  )
}

export default SiteSelector
