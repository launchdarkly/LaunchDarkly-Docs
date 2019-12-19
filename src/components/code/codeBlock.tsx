/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useEffect } from 'react'
import { LanguageName } from './languages'
import { useCodeSnippetContext } from './codeContext'

export type CodeBlockProps = { snippetId: string; children: string; className: string }

export function CodeBlock({ snippetId, children, className = '' }: CodeBlockProps): ReactElement {
  const [language] = className.replace(/language-/, '').split(' ') as LanguageName[]
  const { snippets, setLanguage, unsetLanguage } = useCodeSnippetContext()
  const languages = snippets[snippetId]

  useEffect(() => {
    // Avoid duplicates
    if (languages && languages.find(({ language: l }) => l === language)) {
      return
    }

    setLanguage(snippetId, language, children)

    return () => {
      unsetLanguage(snippetId, language)
    }
  }, [])

  return null
}
