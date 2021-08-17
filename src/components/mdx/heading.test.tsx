import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { H1 } from './heading'

describe('heading', () => {
  afterEach(cleanup)

  test('clicking anchor copies link to clipboard', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    })

    jest.spyOn(navigator.clipboard, 'writeText')

    const { container } = render(<H1 id="some-anchor">Heading 1</H1>)
    fireEvent.click(container.querySelector('h1 > a'))

    expect(navigator.clipboard.writeText).toBeCalledWith('http://localhost/#some-anchor')
  })
})
