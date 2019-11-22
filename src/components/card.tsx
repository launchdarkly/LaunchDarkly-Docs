/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

const Card = () => {
  return (
    <div sx={{ justifyContent: 'space-between', variant: 'cards.primary' }}>
      <span>
        See also: <Styled.a href="">Creating a card</Styled.a>
      </span>
      <img src="https://75oio.csb.app/bookmark-outline.svg" />
    </div>
  )
}

export default Card
