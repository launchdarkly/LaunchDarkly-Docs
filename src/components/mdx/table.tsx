import { ReactNode } from 'react'
import { Card } from 'theme-ui'

type TableProps = {
  children: ReactNode
}
const Table = (props: TableProps) => (
  <Card variant="table">
    <table sx={{ width: '100%' }}>{props.children}</table>
  </Card>
)
export default Table

export const TableHeader = (props: TableProps) => (
  <thead
    sx={{
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      borderColor: 'grayMed',
    }}
  >
    <tr>{props.children}</tr>
  </thead>
)

export const TableHeadCell = (props: TableProps) => (
  <th sx={{ p: [1, 2], overflow: 'hidden', textAlign: 'center', fontSize: [3, 4], fontWeight: 400 }}>
    {props.children}
  </th>
)

export const TableRow = (props: TableProps) => (
  <tr
    sx={{
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      borderColor: 'grayMed',
      '&:last-child': {
        border: 'none',
      },
    }}
  >
    {props.children}
  </tr>
)

export const TableCell = (props: TableProps) => (
  <td
    sx={{
      p: [1, 2],
    }}
  >
    {props.children}
  </td>
)

export const TableBody = (props: TableProps) => <tbody>{props.children}</tbody>
