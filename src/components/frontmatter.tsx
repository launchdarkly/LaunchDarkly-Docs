/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

const Frontmatter = () => {
  return (
    <div
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'grayMed',
        pb: 2,
        mb: 4,
      }}
    >
      <Styled.h5>Est Read Time: 6 Minutes</Styled.h5>
      <Styled.h5>Last edited: Sep 28, 2019</Styled.h5>
    </div>
  )
}

export default Frontmatter
