import { SideNavItem } from '../../sideNav/types'

import SdkLinks from './sdkLinks'

const ReactSdks = () => {
  const reactSdkItems: SideNavItem[] = [
    {
      label: 'React Web SDK reference',
      shortLabel: 'React Web',
      path: '/sdk/client-side/react/react-web',
      svg: 'react',
    },
    {
      label: 'React Native SDK reference',
      shortLabel: 'React Native',
      path: '/sdk/client-side/react/react-native',
      svg: 'react',
    },
    {
      label: 'Gatsby plugin',
      shortLabel: 'Gatsby plugin',
      path: '/sdk/client-side/react/gatsby',
      svg: 'gatsby',
    },
  ]
  return (
    <ul
      sx={{
        m: 40,
      }}
    >
      <SdkLinks heading="" sideNavItems={reactSdkItems} />
    </ul>
  )
}

export default ReactSdks
