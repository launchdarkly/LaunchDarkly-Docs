/** @jsx jsx */
import { jsx } from 'theme-ui'
import { FunctionComponent } from 'react'
import Icon from '../icon'
import Link from '../link'

const GITHUB_ROOT_URL = 'https://github.com/launchdarkly/LaunchDarkly-Docs/blob/master/src'

type EditOnGithubLinkProps = {
  fileAbsolutePath: string
}

const EditOnGithubLink: FunctionComponent<EditOnGithubLinkProps> = ({ fileAbsolutePath }) => {
  const relativePath = fileAbsolutePath.split('/src/')[1]
  const githubUrl = `${GITHUB_ROOT_URL}/${relativePath}`
  return (
    <Link variant="githubEdit" to={githubUrl}>
      <Icon name="pencil" height="1rem" fill="grayBase" pt=".2rem" mr=".2rem" />
      EDIT ON GITHUB
    </Link>
  )
}

export default EditOnGithubLink
