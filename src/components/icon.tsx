/** @jsx jsx */
import { jsx, SxProps } from 'theme-ui'

type IconName =
  | 'alert-rhombus'
  | 'atom'
  | 'bullseye-arrow'
  | 'calendar-edit'
  | 'chart-areaspline'
  | 'clock-start'
  | 'compass'
  | 'earth'
  | 'file-table'
  | 'information'
  | 'launchdarkly'
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

export type IconProps = {
  name: IconName
  variant?: string
  onClick?: Function
} & SxProps &
  React.HTMLProps<SVGSVGElement>

export default function Icon({ name, className, variant, onClick, ...props }: IconProps) {
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
