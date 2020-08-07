import { HELLO_WORLD } from '@/main'

describe('Example suite', () => {
  test('failing', () => {
    expect(HELLO_WORLD).not.toEqual('Hello World')
  })
})
