import { Expr, Search, SearchExpr, StringLiteral } from '../types/ast'
import { Token, TokenType } from '../types/lexer'
import { ParserError } from '../types/parser'
import { tokenize } from './lexer'

export class Parser {
  private tokens: Token[] = []

  private eat(): Token {
    return this.tokens.shift() as Token
  }
  private at(): Token {
    return this.tokens[0]
  }
  private next(): Token {
    return this.tokens[1]
  }
  private not_eof(): boolean {
    return this.at().type != TokenType.EOF
  }
  private break_char(): boolean {
    return this.at().type == TokenType.EOF || this.at().type == TokenType.Space
  }
  private throw(err: string, obj = {}) {
    throw createError({
      statusCode: 400,
      statusMessage: err,
      data: obj,
    })
  }
  private expect(type: TokenType, err: any) {
    const prev = this.eat()
    if (!prev || prev.type != type) {
      this.throw(err)
    }
    return prev
  }

  public produceAST(sourceCode: string): Search {
    this.tokens = tokenize(sourceCode)
    const search: Search = {
      kind: 'Search',
      body: [],
    }

    while (this.not_eof()) {
      search.body.push(this.parse_searchExpr())
    }

    return search
  }

  private parse_searchExpr(): Expr {
    let left = this.parse_expr()
    while (this.at().type == TokenType.Pairing) {
      const operator = this.eat().value
      let right = undefined
      if (!this.break_char()) right = this.parse_searchExpr()
      left = {
        kind: 'SearchExpr',
        left,
        right,
        opr: operator,
      } as SearchExpr
    }

    return left
  }

  private parse_expr(): Expr {
    const tk = this.at().type
    switch (tk) {
      case TokenType.String:
        return {
          kind: 'StringLiteral',
          value: this.eat().value,
        } as StringLiteral
      case TokenType.Space:
        this.eat()
        return this.parse_expr()
      case TokenType.OpenParen:
        this.eat()
        const exprs: Expr[] = []
        while (this.at().type !== TokenType.CloseParen && this.not_eof()) {
          exprs.push(this.parse_searchExpr())
        }
        this.expect(TokenType.CloseParen, ParserError.NoClosingParen)
        if (exprs.every((e) => e.kind === 'StringLiteral'))
          return {
            kind: 'StringLiteral',
            value: (exprs as StringLiteral[]).map((e) => e.value).join(' '),
          } as StringLiteral
        else return exprs[0]
      case TokenType.CloseParen:
        this.throw(ParserError.UnexpectedClosingParen, this.at())

      default:
        this.throw(ParserError.UnknownToken, this.at())
        throw Error // just so typescript is happy
    }
  }
}

export default defineEventHandler<{ query: { q: string } }>(async (event) => {
  const query = getQuery(event)

  const parser = new Parser()
  if (query && query.q) return parser.produceAST(query.q)
  return []
})
