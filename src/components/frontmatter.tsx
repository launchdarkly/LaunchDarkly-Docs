/** @jsx jsx */
import { jsx } from 'theme-ui'

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
      <h5>Est Read Time: 6 Minutes</h5>
      <h5>Last edited: Sep 28, 2019</h5>
    </div>
  )
}

export default Frontmatter
