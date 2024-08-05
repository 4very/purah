import type { Search } from '~/server/types/ast'
import { ParserError } from '~/server/types/parser'

export const TESTS: [string, any][] = [
  [
    'string',
    {
      kind: 'Search',
      body: [
        {
          kind: 'StringLiteral',
          value: 'string',
        },
      ],
    },
  ],
  [
    'two strings',
    {
      kind: 'Search',
      body: [
        {
          kind: 'StringLiteral',
          value: 'two',
        },
        {
          kind: 'StringLiteral',
          value: 'strings',
        },
      ],
    },
  ],
  [
    '(parens joining strings)',
    {
      kind: 'Search',
      body: [
        {
          kind: 'StringLiteral',
          value: 'parens joining strings',
        },
      ],
    },
  ],
  [
    '(side by)(side parens)',
    {
      kind: 'Search',
      body: [
        {
          kind: 'StringLiteral',
          value: 'side by',
        },
        {
          kind: 'StringLiteral',
          value: 'side parens',
        },
      ],
    },
  ],
  [
    '((((nested (parens)))))',
    {
      kind: 'Search',
      body: [
        {
          kind: 'StringLiteral',
          value: 'nested parens',
        },
      ],
    },
  ],
  [
    'key:value',
    {
      kind: 'Search',
      body: [
        {
          kind: 'SearchExpr',
          left: {
            kind: 'StringLiteral',
            value: 'key',
          },
          right: {
            kind: 'StringLiteral',
            value: 'value',
          },
          opr: ':',
        },
      ],
    },
  ],
  [
    '(paren key):(paren value)',
    {
      kind: 'Search',
      body: [
        {
          kind: 'SearchExpr',
          left: {
            kind: 'StringLiteral',
            value: 'paren key',
          },
          right: {
            kind: 'StringLiteral',
            value: 'paren value',
          },
          opr: ':',
        },
      ],
    },
  ],
  [
    'key:value1:value2',
    {
      kind: 'Search',
      body: [
        {
          kind: 'SearchExpr',
          left: {
            kind: 'StringLiteral',
            value: 'key',
          },
          right: {
            kind: 'SearchExpr',
            left: {
              kind: 'StringLiteral',
              value: 'value1',
            },
            right: {
              kind: 'StringLiteral',
              value: 'value2',
            },
            opr: ':',
          },
          opr: ':',
        },
      ],
    },
  ],
  [
    '(long key):value',
    {
      kind: 'Search',
      body: [
        {
          kind: 'SearchExpr',
          left: {
            kind: 'StringLiteral',
            value: 'long key',
          },
          right: {
            kind: 'StringLiteral',
            value: 'value',
          },
          opr: ':',
        },
      ],
    },
  ],
  [
    'key:(long value)',
    {
      kind: 'Search',
      body: [
        {
          kind: 'SearchExpr',
          left: {
            kind: 'StringLiteral',
            value: 'key',
          },
          right: {
            kind: 'StringLiteral',
            value: 'long value',
          },
          opr: ':',
        },
      ],
    },
  ],
  [
    'key:((((((nested long value))))))',
    {
      kind: 'Search',
      body: [
        {
          kind: 'SearchExpr',
          left: {
            kind: 'StringLiteral',
            value: 'key',
          },
          right: {
            kind: 'StringLiteral',
            value: 'nested long value',
          },
          opr: ':',
        },
      ],
    },
  ],
  [
    '(long key):(long value1):(long value2)',
    {
      kind: 'Search',
      body: [
        {
          kind: 'SearchExpr',
          left: {
            kind: 'StringLiteral',
            value: 'long key',
          },
          right: {
            kind: 'SearchExpr',
            left: {
              kind: 'StringLiteral',
              value: 'long value1',
            },
            right: {
              kind: 'StringLiteral',
              value: 'long value2',
            },
            opr: ':',
          },
          opr: ':',
        },
      ],
    },
  ],
  [
    'key:value1:value2:value3:value4',
    {
      kind: 'Search',
      body: [
        {
          kind: 'SearchExpr',
          left: {
            kind: 'StringLiteral',
            value: 'key',
          },
          right: {
            kind: 'SearchExpr',
            left: {
              kind: 'StringLiteral',
              value: 'value1',
            },
            right: {
              kind: 'SearchExpr',
              left: {
                kind: 'StringLiteral',
                value: 'value2',
              },
              right: {
                kind: 'SearchExpr',
                left: {
                  kind: 'StringLiteral',
                  value: 'value3',
                },
                right: {
                  kind: 'StringLiteral',
                  value: 'value4',
                },
                opr: ':',
              },
              opr: ':',
            },
            opr: ':',
          },
          opr: ':',
        },
      ],
    },
  ],
  [
    '(key:value)',
    {
      kind: 'Search',
      body: [
        {
          kind: 'SearchExpr',
          left: {
            kind: 'StringLiteral',
            value: 'key',
          },
          right: {
            kind: 'StringLiteral',
            value: 'value',
          },
          opr: ':',
        },
      ],
    },
  ],
  [
    'key:',
    {
      kind: 'Search',
      body: [
        {
          kind: 'SearchExpr',
          left: {
            kind: 'StringLiteral',
            value: 'key',
          },
          opr: ':',
        },
      ],
    },
  ],
  [
    'key: value',
    {
      kind: 'Search',
      body: [
        {
          kind: 'SearchExpr',
          left: {
            kind: 'StringLiteral',
            value: 'key',
          },
          opr: ':',
        },
        {
          kind: 'StringLiteral',
          value: 'value',
        },
      ],
    },
  ],
  [
    'key:value string',
    {
      kind: 'Search',
      body: [
        {
          kind: 'SearchExpr',
          left: {
            kind: 'StringLiteral',
            value: 'key',
          },
          right: {
            kind: 'StringLiteral',
            value: 'value',
          },
          opr: ':',
        },
        {
          kind: 'StringLiteral',
          value: 'string',
        },
      ],
    },
  ],
  [
    'key:value key2:value2',
    {
      kind: 'Search',
      body: [
        {
          kind: 'SearchExpr',
          left: {
            kind: 'StringLiteral',
            value: 'key',
          },
          right: {
            kind: 'StringLiteral',
            value: 'value',
          },
          opr: ':',
        },
        {
          kind: 'SearchExpr',
          left: {
            kind: 'StringLiteral',
            value: 'key2',
          },
          right: {
            kind: 'StringLiteral',
            value: 'value2',
          },
          opr: ':',
        },
      ],
    },
  ],
  [
    'key: key2:value2',
    {
      kind: 'Search',
      body: [
        {
          kind: 'SearchExpr',
          left: {
            kind: 'StringLiteral',
            value: 'key',
          },
          opr: ':',
        },
        {
          kind: 'SearchExpr',
          left: {
            kind: 'StringLiteral',
            value: 'key2',
          },
          right: {
            kind: 'StringLiteral',
            value: 'value2',
          },
          opr: ':',
        },
      ],
    },
  ],
]

export const ERRORS: [string, string][] = [
  ['value!', ParserError.UnknownToken],
  ['(no closing paren', ParserError.NoClosingParen],
]
