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
      <Icon name="pencil" height="1rem" fill="gray" marginBottom="-.2rem" marginRight=".2rem" />
      Edit on github
    </Button>
  )
}
