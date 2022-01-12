/** @jsx jsx */
import { FunctionComponent } from 'react'
import { jsx, Card } from 'theme-ui'

const Table: FunctionComponent = ({ children }) => (
  <Card variant="table">
    <table sx={{ width: '100%' }}>{children}</table>
  </Card>
)
export default Table

export const TableHeader: FunctionComponent = ({ children }) => (
  <thead
    sx={{
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      borderColor: 'grayMed',
    }}
  >
    <tr>{children}</tr>
  </thead>
)

export const TableHeadCell: FunctionComponent = ({ children }) => (
  <th sx={{ p: [1, 2], overflow: 'hidden', textAlign: 'center', fontSize: [3, 4], fontWeight: 400 }}>{children}</th>
)

export const TableRow: FunctionComponent = ({ children }) => (
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
    {children}
  </tr>
)

export const TableCell: FunctionComponent = ({ children }) => (
  <td
    sx={{
      p: [1, 2],
    }}
  >
    {children}
  </td>
)

export const TableBody: FunctionComponent = ({ children }) => <tbody>{children}</tbody>
