declare module 'scanfs' {
  import type { Stats } from 'fs'

  // technically it will accept any falsey response, but void will do
  type Typer = (pathname: string, stat: Stats) => string | void

  type Scanner = {
    on: OnDone & OnFile
    relatively: (path: string) => Scanner
  }

  type FileHandler = (err: Error, filepath: string, stat: Stats) => void
  type DoneHandler = (err: Error, count: number) => void
  type OnDone = (event: 'done', handler: DoneHandler) => Scanner
  type OnFile = (event: string, handler: FileHandler) => Scanner

  export default function Scanfs(ignore: string[], typer: Typer): Scanner
}
