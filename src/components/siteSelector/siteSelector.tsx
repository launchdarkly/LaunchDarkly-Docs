import type { NavigateFn } from '@gatsbyjs/reach-router'
import { useSelect } from 'downshift'
import { Button } from 'theme-ui'

import { SiteType } from '../../types/siteType'
import { trackSiteSelection } from '../../utils/analyticsUtils'
import { addRemoveSiteParam } from '../../utils/siteAwareUtils'
import Icon from '../icon'

import useSite from './useSite'

const items: SiteType[] = ['launchDarkly', 'federal']

const getLabel = (site: SiteType) => (site === 'federal' ? 'Federal docs' : 'LaunchDarkly docs')

type SiteSelectorProps = {
  navigateFn: NavigateFn
}
const SiteSelector = ({ navigateFn }: SiteSelectorProps) => {
  const [site, setSite] = useSite()
  const { isOpen, getToggleButtonProps, getMenuProps, getLabelProps, highlightedIndex, selectedItem, getItemProps } =
    useSelect({
      items,
      selectedItem: site,
      onSelectedItemChange,
    })

  function onSelectedItemChange({ selectedItem: selectedSite }: { selectedItem?: SiteType }) {
    trackSiteSelection(selectedSite)
    setSite(selectedSite)
    navigateFn(addRemoveSiteParam('', selectedSite, true), { replace: true })
  }
  const dropdownWidth = '11rem'

  return (
    <div sx={{ px: [6, 2], mx: [0, 2], my: [4, 0] }}>
      <Button
        variant="siteSelector"
        sx={{
          backgroundColor: isOpen ? ['grayscaleGray300', 'grayscaleGray700'] : ['grayscaleWhite', 'grayscaleBlack100'],
          width: ['100%', dropdownWidth],
        }}
        {...getToggleButtonProps()}
        id="dropdown-button"
        aria-labelledby="dropdown-label"
      >
        <span data-testid="dropdown-label" {...getLabelProps()} id="dropdown-label" htmlFor="dropdown-button">
          {getLabel(site)}
        </span>
        <Icon name="expand-more" sx={{ height: 1, fill: ['grayscaleBlack300', 'grayscaleWhite'] }} />
      </Button>
      <ul
        {...getMenuProps()}
        id="dropdown-menu"
        aria-labelledby="dropdown-label"
        sx={{
          position: 'absolute',
          mt: '10px',
          border: 0,
          // HACK: the mobile width is calculated to fill the screen without overflowing it
          width: ['calc(100vw - 4rem)', dropdownWidth],
          borderRadius: 3,
          boxShadow: 'small',
          zIndex: 3,
        }}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              sx={{
                backgroundColor: highlightedIndex === index ? 'grayscaleGray100' : 'grayscaleWhite',
                color: 'grayscaleBlack',
                minWidth: dropdownWidth,
                height: 4,
                padding: 2,
                position: 'relative',
                fontSize: 3,
                '&:first-of-type': {
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                },
                '&:last-of-type': {
                  borderBottomLeftRadius: 3,
                  borderBottomRightRadius: 3,
                },
              }}
              key={`${item}${index}`}
              data-testid="option"
              {...getItemProps({ item, index })}
            >
              {selectedItem === item && <Icon name="check" sx={{ height: 1, position: 'absolute' }} />}
              <span sx={{ pl: 4, ml: 2 }}>{getLabel(item)}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default SiteSelector
