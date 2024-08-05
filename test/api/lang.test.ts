import { describe, expect, test, beforeEach, onTestFailed } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'
import LEXER_TESTS from './lexer'
import * as PARSER from './parser'

const ENDPOINTS = {
  LEXER: '/api/lexer',
  PARSER: '/api/parser',
}

const log = console.log

describe('Link', async () => {
  await setup({
    server: true,
    browser: false,
  })

  describe('Sanity Checks', async () => {
    Object.entries(ENDPOINTS).forEach(([name, endpoint]) => {
      describe(name, () => {
        test('Reachable', async () => {
          const r = await $fetch(endpoint)
          expect(r).not.toBeUndefined()
        })

        test('Empty', async () => {
          const r = await $fetch(endpoint)
          expect(r).toEqual([])
        })
      })
    })
  })

  describe('Lexer', async () => {
    LEXER_TESTS.forEach(([query, expected]) =>
      test(`"${query}"`, async () => {
        const r = await $fetch(ENDPOINTS.LEXER, { query: { q: query } })
        expect(r).toEqual(expected)
      })
    )
  })

  describe('Parser', async () => {
    PARSER.TESTS.forEach(([query, expected]) =>
      test(`"${query}"`, async () => {
        const r = await $fetch(ENDPOINTS.PARSER, { query: { q: query } })
        onTestFailed((e) => {
          log(query, '\n', JSON.stringify(r, undefined, 4))
        })
        expect(r).toEqual(expected)
      })
    )
    describe('Error', () => {
      PARSER.ERRORS.forEach(([query, expected]) => {
        test(`"${query}"`, async () => {
          const r = $fetch(ENDPOINTS.PARSER, { query: { q: query } })
          expect(r).rejects.toThrow(expected)
        })
      })
    })
  })

  // test('"Title"', async () => {
  //   const r = await $fetch(endpoint, { query: { q: 'Title' } })
  //   expect(r).toEqual([{ type: TokenType.String, value: 'Title' }])
  // })
})
