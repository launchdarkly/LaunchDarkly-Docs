/** @jsx jsx */
import { Button } from '@theme-ui/components'
import { jsx } from 'theme-ui'
import Icon from '../icon'

export default function EditButton({ path }: { path: string }) {
  const onClick = () => {
    window.open(path)
  }
  return (
    <Button variant="edit" onClick={onClick}>
      <Icon name="pencil" height="1rem" fill="grayBase" marginBottom="-.15rem" marginRight=".2rem" marginTop=".75rem" />
      Edit on github
    </Button>
  )
}
