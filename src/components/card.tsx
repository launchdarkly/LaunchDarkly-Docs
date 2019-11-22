/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

const Card = () => {
  return (
    <div sx={{
      mb: 4,
      padding: 2,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'grayMed',
      boxShadow: '0 2px 4px #CED4DA',
      paddingX: 5,
      paddingY: 4,
      lineHeight: 'body',
      display: 'flex',
      justifyContent: 'space-between',
      bg: 'graywash'}}>
      <span>See also Creating a card </span>
      <img src="https://75oio.csb.app/bookmark-outline.svg" />
    </div>
  )
}

export default Card