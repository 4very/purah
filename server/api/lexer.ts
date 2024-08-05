import { TokenType, Token } from '../types/lexer'

function isStringChar(char: string): boolean {
  return /^[A-Za-z0-9]$/.test(char)
}

function token(value: string = '', type: TokenType): Token {
  return { value, type }
}

export function tokenize(srcRaw: string): Token[] {
  const tokens = new Array<Token>()
  const src = srcRaw.split('')

  while (src.length > 0) {
    if (src[0] == '(') tokens.push(token(src.shift(), TokenType.OpenParen))
    else if (src[0] == ')')
      tokens.push(token(src.shift(), TokenType.CloseParen))
    else if (src[0] == ':') tokens.push(token(src.shift(), TokenType.Pairing))
    else if (src[0] == ' ') tokens.push(token(src.shift(), TokenType.Space))
    else if (isStringChar(src[0])) {
      let str = ''
      while (src.length > 0 && isStringChar(src[0])) str += src.shift()
      tokens.push(token(str, TokenType.String))
    } else {
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
