/** @jsx jsx */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState, useCallback } from 'react'
import { jsx, Themed, Box, Button } from 'theme-ui'
import Highlight, { defaultProps } from 'prism-react-renderer'
import Prism from 'prismjs'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-haskell'
import 'prismjs/components/prism-hcl'
import 'prismjs/components/prism-lua'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-objectivec'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-brightscript'
import 'prismjs/components/prism-nginx'
import 'prismjs/components/prism-dart'
import 'prismjs/components/prism-erlang'
import { copyToClipboard } from '../../../utils/copyToClipboard'

export type CodeSnippetProps = {
  code: string
  className: string
  children: string
}

export function CodeSnippet({ children, className: languageClassName, ...props }: CodeSnippetProps) {
  const [showCopied, setShowCopied] = useState(false)

  let language = languageClassName && languageClassName.replace(/language-/, '')

  if (!language) {
    language = 'text'
  }

  const onClickCopy = useCallback(() => {
    setShowCopied(true)

    setTimeout(() => setShowCopied(false), 2000)
    copyToClipboard(children)
  }, [children])

  return (
    <Box sx={{ position: 'relative' }}>
      <Highlight
        {...defaultProps}
        {...props}
        code={children.trim()}
        theme={undefined}
        // Override prism-react-renderer's vendored Prism and limited language list
        Prism={Prism as any}
        language={language as any}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Fragment>
            <Themed.pre
              className={className}
              style={style}
              sx={{ position: 'relative', paddingLeft: 6, '& > div:last-child': { mb: 6 } }}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i })
                return (
                  <div key={lineProps.key} {...lineProps}>
                    <span
                      sx={{
                        color: 'grayMed',
                        paddingRight: 2,
                        marginRight: 2,
                        textAlign: 'right',
                        fontSize: 2,
                        display: 'inline-block',
                        userSelect: 'none',
                        pointerEvents: 'none',
                        width: 4,
                        position: 'absolute',
                        left: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    {line.map((token, key) => {
                      const tokenProps = getTokenProps({ token, key })
                      return <span key={tokenProps.key} {...tokenProps} sx={{ display: 'inline-block' }} />
                    })}
                  </div>
                )
              })}
            </Themed.pre>
          </Fragment>
        )}
      </Highlight>
      <Button
        sx={{ position: 'absolute', bottom: 4, right: 2 }}
        variant="code.copy"
        onClick={onClickCopy}
        aria-label="Copy code"
        type="button"
      >
        {showCopied ? 'COPIED' : 'COPY'}
      </Button>
    </Box>
  )
}
