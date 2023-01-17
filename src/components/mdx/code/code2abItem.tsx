import React, { PropsWithChildren } from 'react'

export type TabsItemProps2 = {
  label: string
}

export function CodeTabItem2({ children }: PropsWithChildren<TabsItemProps2>) {
  return <>{children}</>
}
