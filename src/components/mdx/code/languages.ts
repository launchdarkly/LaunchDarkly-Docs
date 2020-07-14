export type LanguageName =
  | 'go'
  | 'ruby'
  | 'java'
  | 'javascript'
  | 'python'
  | 'haskell'
  | 'hcl'
  | 'lua'
  | 'swift'
  | 'objectivec'
  | 'csharp'
  | 'php'
  | 'c'
  | 'cpp'
  | 'json'
  | 'text'

export const languageDisplay: { [key in LanguageName]: string } = {
  go: 'Go',
  ruby: 'Ruby',
  java: 'Java',
  c: 'C',
  cpp: 'C++',
  csharp: '.NET',
  haskell: 'Haskell',
  hcl: 'HCL',
  javascript: 'JavaScript',
  lua: 'Lua',
  php: 'PHP',
  python: 'Python',
  objectivec: 'iOS Objective-C',
  swift: 'iOS Swift',
  json: 'JSON',
  text: 'Text',
}
