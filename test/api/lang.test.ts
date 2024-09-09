import { describe, expect, test, beforeEach, onTestFailed } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'
import LEXER_TESTS from './lexer'
import * as PARSER from './parser'
import * as EVALUATE from './evaluate'
import * as REFORM from './reform'

const ENDPOINTS = {
  LEXER: '/api/lexer',
  PARSER: '/api/parser',
  EVALUATE: '/api/evaluate',
  REFORM: '/api/reform',
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
        onTestFailed(() =>
          log(
            'Lexer test failed: ',
            query,
            '\n',
            JSON.stringify(r, undefined, 4)
          )
        )
        expect(r).toEqual(expected)
      })
    )
  })

  describe('Parser', async () => {
    PARSER.TESTS.forEach(([query, expected]) =>
      test(`"${query}"`, async () => {
        const r = await $fetch(ENDPOINTS.PARSER, { query: { q: query } })
        onTestFailed(() =>
          log(
            'Parser test failed: ',
            query,
            '\n',
            JSON.stringify(r, undefined, 4)
          )
        )
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

  describe('Evaluate', async () => {
    EVALUATE.TESTS.forEach(([query, expected]) =>
      test(`"${query}"`, async () => {
        const r = await $fetch(ENDPOINTS.EVALUATE, { query: { q: query } })
        onTestFailed(() =>
          log(
            'Evaluate test failed: ',
            query,
            '\n',
            JSON.stringify(r, undefined, 4)
          )
        )
        expect(r).toEqual(expected)
      })
    )
    describe('Error', () => {
      EVALUATE.ERRORS.forEach(([query, expected]) => {
        test(`"${query}"`, async () => {
          const r = $fetch(ENDPOINTS.EVALUATE, { query: { q: query } })
          expect(r).rejects.toThrow(expected)
        })
      })
    })
  })

  describe('Reform', async () => {
    REFORM.TESTS.forEach(([query, expected]) =>
      test(`"${query}"`, async () => {
        const r = await $fetch(ENDPOINTS.REFORM, { query: { q: query } })
        onTestFailed(() =>
          log(
            'Reform test failed: ',
            query,
            '\n',
            JSON.stringify(r, undefined, 4)
          )
        )
        expect(r).toEqual(expected)
      })
    )
    // describe('Error', () => {
    //   EVALUATE.ERRORS.forEach(([query, expected]) => {
    //     test(`"${query}"`, async () => {
    //       const r = $fetch(ENDPOINTS.REFORM, { query: { q: query } })
    //       expect(r).rejects.toThrow(expected)
    //     })
    //   })
    // })
  })
})
