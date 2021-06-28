import mockData from './fixtures'
import useNavChildren from '.'

jest.mock('gatsby', () => ({
  graphql: jest.fn(),
  useStaticQuery: () => mockData,
}))

describe('useNavChildren hook', () => {
  it('throws for a non-existent path', () => {
    expect(() => useNavChildren('/foo/bar')).toThrow('Navigation path not found /foo/bar, or it has no children')
  })

  it('returns a list of children for a top level path', () => {
    const result = useNavChildren('/integrations')

    expect(result).toEqual([
      {
        path: '/integrations/collaboration',
        label: 'Collaboration tools',
      },
      {
        path: '/integrations/ide',
        label: 'IDE connectors',
      },
    ])
  })

  it('returns a list of children at depth 2', () => {
    const result = useNavChildren('/integrations/collaboration')

    expect(result).toEqual([
      {
        path: '/integrations/microsoft-teams',
        label: 'Microsoft Teams',
      },
      {
        path: '/integrations/slack',
        label: 'Slack',
      },
    ])
  })

  it('returns a list of children at depth 3', () => {
    const result = useNavChildren('/home/code/code-references')

    expect(result).toEqual([
      {
        path: '/home/code/bitbucket',
        label: 'Bitbucket Pipes',
      },
      {
        path: '/home/code/circleci',
        label: 'CircleCI Orbs',
      },
    ])
  })
})
