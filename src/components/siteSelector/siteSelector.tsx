/** @jsx jsx */
import React, { ChangeEventHandler } from 'react'
import { navigate } from 'gatsby'
import { jsx } from 'theme-ui'

import { SiteType } from '../../types/siteType'
import { trackSiteSelection } from '../../utils/analyticsUtils'
import { addRemoveSiteParam } from '../../utils/siteAwareUtils'

import useSite from './useSite'

const SiteSelector = () => {
  const [site, setSite] = useSite()

  const onChangeSite: ChangeEventHandler<HTMLSelectElement> = event => {
    const selectedValue = event.target.value as SiteType
    trackSiteSelection(selectedValue)
    setSite(selectedValue)

    navigate(addRemoveSiteParam('', selectedValue, true), { replace: true })
  }

  return (
    <select
      onChange={onChangeSite}
      value={site}
      sx={{
        border: '1px solid',
        borderColor: 'grayBase',
        borderRadius: '6px',
        mr: [0, 4],
        px: 3,
        height: [4, 'inherit'],
        width: ['100%', 'inherit'],
      }}
    >
      <option value="launchDarkly">LaunchDarkly docs</option>
      <option value="federal">Federal docs</option>
    </select>
  )
}

export default SiteSelector
