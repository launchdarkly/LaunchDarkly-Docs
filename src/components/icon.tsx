/** @jsx jsx */
import { jsx, BoxOwnProps } from 'theme-ui'
import { HTMLProps } from 'react'

export type IconName =
  | 'android'
  | 'c'
  | 'electron'
  | 'ios'
  | 'js'
  | 'node'
  | 'react'
  | 'roku'
  | 'swift'
  | 'xamarin'
  | 'erlang'
  | 'golang'
  | 'haskell'
  | 'java'
  | 'lua'
  | 'net'
  | 'php'
  | 'python'
  | 'ruby'
  | 'rust'
  | 'alert-rhombus'
  | 'checkbox-marked-circle'
  | 'remove-circle'
  | 'atom'
  | 'bullseye-arrow'
  | 'calendar-edit'
  | 'chart-areaspline'
  | 'clock-start'
  | 'compass'
  | 'cube'
  | 'docs'
  | 'earth'
  | 'file-table'
  | 'information'
  | 'launchdarkly'
  | 'launchdarkly-icon'
  | 'lightbulb-on-outline'
  | 'link-variant'
  | 'menu'
  | 'message-reply-text'
  | 'open-in-new'
  | 'puzzle-variation'
  | 'people'
  | 'search'
  | 'security'
  | 'toggles-multiple-solid'
  | 'window-close'
  | 'arrow-down'
  | 'arrow-right'
  | 'arrow-up'
  | 'pencil'
  | 'gatsby'

export type IconProps = {
  name: IconName
  onClick?: () => void
  fill?: string
} & BoxOwnProps &
  HTMLProps<SVGSVGElement>

export default function Icon({ name = 'window-close', className, variant, onClick, ...props }: IconProps) {
  let SVGComponent
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    SVGComponent = require(`../../assets/icons/${name}.svg`).default
  } catch (e) {
    console.error(`${name}.svg does not exist.`, e)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    SVGComponent = require('../../assets/icons/window-close.svg').default
  }

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
