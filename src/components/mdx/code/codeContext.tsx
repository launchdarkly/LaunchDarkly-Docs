import React, { ReactNode, useReducer, useContext, useMemo, createContext } from 'react'
import { ActionUnion, createAction } from '../../../utils/actions'
import usePersistentState from '../../../hooks/usePersistentState'
import { LanguageName } from './languages'

type LanguagePair = {
  language: LanguageName
  code: string
}

type SnippetLanguagePairs = {
  [key: string]: LanguagePair[]
}

type CodeSnippetContext = {
  preferredLanguage?: LanguageName
  snippets: SnippetLanguagePairs
  setLanguage: (snippet: string, language: LanguageName, content: string) => void
  unsetLanguage: (snippet: string, language: LanguageName) => void
  setPreferredLanguage: (language: LanguageName) => void
}

const Actions = {
  setLanguage: (snippet: string, language: LanguageName, code: string) =>
    createAction('SET_LANGUAGE', { snippet, language, code }),
  unsetLanguage: (snippet: string, language: LanguageName) => createAction('UNSET_LANGUAGE', { snippet, language }),
}

type Actions = ActionUnion<typeof Actions>

type State = Readonly<{
  snippets: SnippetLanguagePairs
}>

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        snippets: {
          ...state.snippets,
          [action.payload.snippet]: [
            ...(state.snippets[action.payload.snippet] || []),
            { language: action.payload.language, code: action.payload.code },
          ],
        },
      }
    case 'UNSET_LANGUAGE':
      return {
        ...state,
        snippets: {
          ...state.snippets,
          [action.payload.snippet]: (state.snippets[action.payload.snippet] || []).filter(
            l => l.language !== action.payload.language,
          ),
        },
      }
    default:
      return state
  }
}

export const CodeSnippetContext = createContext<CodeSnippetContext>(null)

export function CodeSnippetProvider({ children }: { children: ReactNode }) {
  const Provider = CodeSnippetContext.Provider

  const [preferredLanguage, setPreferredLanguage] = usePersistentState('ld-docs.code.language')

  const [state, dispatch] = useReducer(reducer, {
    snippets: {},
  })

  function setLanguage(snippet: string, language: LanguageName, code: string) {
    dispatch(Actions.setLanguage(snippet, language, code))
  }

  function unsetLanguage(snippet: string, language: LanguageName) {
    dispatch(Actions.unsetLanguage(snippet, language))
  }

  const contextValue = useMemo(
    () => ({
      preferredLanguage,
      snippets: state.snippets,
      setLanguage,
      unsetLanguage,
      setPreferredLanguage,
    }),
    [preferredLanguage, state, setPreferredLanguage],
  )

  return <Provider value={contextValue}>{children}</Provider>
}

export function useCodeSnippetContext() {
  return useContext(CodeSnippetContext)
}
