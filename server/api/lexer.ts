import { TokenType, Token } from '../types/lexer'

function isStringChar(char: string): boolean {
  return /^[A-Za-z0-9_/]$/.test(char)
}

function isOperatorChar(char: string): boolean {
  return /^[:!~$^]$/.test(char)
}

function token(value: string = '', type: TokenType): Token {
  return { value, type }
}

function getMultiCharToken(
  src: string[],
  condition: { (str: string): boolean }
): string {
  let return_value = ''
  while (src.length > 0 && condition(src[0])) return_value += src.shift()
  return return_value
}

export function tokenize(srcRaw: string): Token[] {
  const tokens = new Array<Token>()
  const src = srcRaw.split('')

  while (src.length > 0) {
    if (src[0] == '(') tokens.push(token(src.shift(), TokenType.OpenParen))
    else if (src[0] == ')')
      tokens.push(token(src.shift(), TokenType.CloseParen))
    else if (isOperatorChar(src[0]))
      tokens.push(
        token(getMultiCharToken(src, isOperatorChar), TokenType.Pairing)
      )
    else if (src[0] == ' ') tokens.push(token(src.shift(), TokenType.Space))
    else if (isStringChar(src[0]))
      tokens.push(token(getMultiCharToken(src, isStringChar), TokenType.String))
    else {
      tokens.push(token(src.shift(), TokenType.Unknown))
    }
  }
  tokens.push(token('EOF', TokenType.EOF))

  return tokens
}

export default defineEventHandler<{ query: { q: string } }>(
  (event): Token[] => {
    const query = getQuery(event)
    if (query.q) return tokenize(query.q)

    return []
  }
)
