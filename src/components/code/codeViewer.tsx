/** @jsx jsx */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jsx, Flex, Box } from 'theme-ui'
import { Card, Button } from '@theme-ui/components'
import { useMemo, useCallback } from 'react'
import { copyToClipboard } from '../../utils/copyToClipboard'
import { LanguageName, languageDisplay } from './languages'
import { useCodeSnippetContext } from './codeContext'
import { CodeSnippet } from './codeSnippet'

export type CodeViewerProps = { snippetId: string }

export function CodeViewer({ snippetId }: CodeViewerProps) {
  const { preferredLanguage, snippets, setPreferredLanguage } = useCodeSnippetContext()

  const languages = useMemo(() => {
    const ls = snippets[snippetId] || []

    ls.sort((a, b) => {
      return a.language.localeCompare(b.language)
    })

    return ls
  }, [snippetId, snippets])

  const onClickLanguage = (language: LanguageName) => {
    setPreferredLanguage(language)
  }

  const pair = languages.find(({ language }) => preferredLanguage === language) || languages[0]

  const onClickCopy = useCallback(() => {
    copyToClipboard(pair.code, { preserveFormatting: true })
  }, [pair])

  if (!pair) {
    return null
  }

  return (
    <Card variant="code">
      <Flex sx={{ flexDirection: 'column' }}>
        <Box sx={{ marginBottom: 4 }}>
          <Flex sx={{ alignItems: 'center' }}>
            <Box>
              {languages.map(({ language }) => (
                <Button
                  variant={`code.${language === pair.language ? 'languageActive' : 'language'}`}
                  key={`${snippetId}-${language}`}
                  onClick={() => onClickLanguage(language)}
                >
                  {languageDisplay[language]}
                </Button>
              ))}
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
              <Button variant="code.copy" onClick={onClickCopy}>
                Copy
              </Button>
            </Box>
          </Flex>
        </Box>
        <Box>
          <CodeSnippet {...pair} />
        </Box>
      </Flex>
    </Card>
  )
}
