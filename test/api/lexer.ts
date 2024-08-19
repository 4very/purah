import { TokenType, type Token } from '~/server/types/lexer'

const tests: [string, Token[]][] = [
  [
    'string',
    [
      { type: TokenType.String, value: 'string' },
      { type: TokenType.EOF, value: 'EOF' },
    ],
  ],
  [
    'two strings',
    [
      { type: TokenType.String, value: 'two' },
      { type: TokenType.Space, value: ' ' },
      { type: TokenType.String, value: 'strings' },
      { type: TokenType.EOF, value: 'EOF' },
    ],
  ],
  [
    '(one string)',
    [
      { type: TokenType.OpenParen, value: '(' },
      { type: TokenType.String, value: 'one' },
      { type: TokenType.Space, value: ' ' },
      { type: TokenType.String, value: 'string' },
      { type: TokenType.CloseParen, value: ')' },
      { type: TokenType.EOF, value: 'EOF' },
    ],
  ],
  [
    'ISO:200',
    [
      { type: TokenType.String, value: 'ISO' },
      { type: TokenType.Pairing, value: ':' },
      { type: TokenType.String, value: '200' },
      { type: TokenType.EOF, value: 'EOF' },
    ],
  ],
  [
    'Title ISO:200',
    [
      { type: TokenType.String, value: 'Title' },
      { type: TokenType.Space, value: ' ' },
      { type: TokenType.String, value: 'ISO' },
      { type: TokenType.Pairing, value: ':' },
      { type: TokenType.String, value: '200' },
      { type: TokenType.EOF, value: 'EOF' },
    ],
  ],
  [
    'title:(Juncos sitting in tree)',
    [
      { type: TokenType.String, value: 'title' },
      { type: TokenType.Pairing, value: ':' },
      { type: TokenType.OpenParen, value: '(' },
      { type: TokenType.String, value: 'Juncos' },
      { type: TokenType.Space, value: ' ' },
      { type: TokenType.String, value: 'sitting' },
      { type: TokenType.Space, value: ' ' },
      { type: TokenType.String, value: 'in' },
      { type: TokenType.Space, value: ' ' },
      { type: TokenType.String, value: 'tree' },
      { type: TokenType.CloseParen, value: ')' },
      { type: TokenType.EOF, value: 'EOF' },
    ],
  ],
  [
    'key:!value',
    [
      { type: TokenType.String, value: 'key' },
      { type: TokenType.Pairing, value: ':!' },
      { type: TokenType.String, value: 'value' },
      { type: TokenType.EOF, value: 'EOF' },
    ],
  ],
]

export default tests
