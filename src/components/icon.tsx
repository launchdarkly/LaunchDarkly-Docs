/** @jsx jsx */
import { jsx } from 'theme-ui'
import { BoxOwnProps } from '@theme-ui/components'
import { HTMLProps } from 'react'

export type IconName =
  | 'alert-rhombus'
  | 'checkbox-marked-circle'
  | 'remove-circle'
  | 'atom'
  | 'bullseye-arrow'
  | 'calendar-edit'
  | 'chart-areaspline'
  | 'clock-start'
  | 'compass'
  | 'earth'
  | 'file-table'
  | 'information'
  | 'launchdarkly-logo'
  | 'launchdarkly-icon'
  | 'launchdarkly-word'
  | 'lightbulb-on-outline'
  | 'link-variant'
  | 'menu'
  | 'message-reply-text'
  | 'open-in-new'
  | 'people'
  | 'search'
  | 'security'
  | 'toggles-multiple-solid'
  | 'window-close'
  | 'arrow-down'
  | 'arrow-up'
  | 'pencil'

export type IconProps = {
  name: IconName
  onClick?: Function
  fill?: string
} & BoxOwnProps &
  HTMLProps<SVGSVGElement>

export default function Icon({ name = 'window-close', className, variant, onClick, ...props }: IconProps) {
  const SVGComponent = require(`../../assets/icons/${name}.svg`).default
  return (
    <SVGComponent
      className={className}
      sx={{
        variant: `icons.${variant}`,
        ...props,
        flex: 'none',
      }}
      onClick={onClick}
    />
  )
}
