/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Node } from 'unist'

type Transformer = (tree: Node, file: any) => void

export default function createCustomToc(): Transformer
