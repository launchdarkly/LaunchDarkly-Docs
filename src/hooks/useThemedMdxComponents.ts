import { useMDXComponents } from '@mdx-js/react'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'
import { Card } from 'theme-ui'

import ChildPageList from '../components/ChildPageList'
import { RelayEndOfLife, SdksEndOfLife } from '../components/endOfLife'
import Homepage from '../components/home/landingPage'
import AllIntegrations from '../components/home/sdks/allIntegrations'
import ClientSideSdks from '../components/home/sdks/clientSideSdks'
import EdgeSdks from '../components/home/sdks/edgeSdks'
import { AllSdks } from '../components/home/sdks/exploreSdks'
import ReactSdks from '../components/home/sdks/reactSdks'
import ServerSideSdks from '../components/home/sdks/serverSideSdks'
import Icon from '../components/icon'
import Link from '../components/link'
import Callout, { CalloutDescription, CalloutTitle } from '../components/mdx/callout'
import { Code, CodeSample, CSTab } from '../components/mdx/code'
import Details from '../components/mdx/details'
import Feature from '../components/mdx/feature'
import Figure, { FigCaption } from '../components/mdx/figure'
import { H1, H2, H3, H4, H5, H6 } from '../components/mdx/heading'
import LearnMore from '../components/mdx/learnMore'
import Metadata from '../components/mdx/metadata'
import Pre from '../components/mdx/pre'
import { Span } from '../components/mdx/span'
import Table, { TableBody, TableCell, TableHeadCell, TableHeader, TableRow } from '../components/mdx/table'

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: Link,
  figure: Figure,
  figcaption: FigCaption,
  Card,
  Metadata,
  Table,
  TableHeader,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Callout,
  CalloutTitle,
  CalloutDescription,
  LearnMore,
  Link,
  CodeSample,
  CSTab,
  Homepage,
  AllSdks,
  ClientSideSdks,
  ServerSideSdks,
  EdgeSdks,
  ReactSdks,
  SdksEndOfLife,
  RelayEndOfLife,
  Icon,
  code: Code,
  pre: Pre,
  ChildPageList,
  Feature,
  Details,
  AllIntegrations,
  span: Span,
}

export const useThemedMdxComponents = () => {
  const componentsWithStyles = useThemedStylesWithMdx(useMDXComponents(components))

  return { componentsWithStyles }
}
