import { Token, type TokenType } from './lexer'

export type NodeType = 'Search' | 'SearchExpr' | 'StringLiteral'

export interface Stmt {
  kind: NodeType
}

export interface Search extends Stmt {
  kind: 'Search'
  body: Expr[]
}

export interface Expr extends Stmt {}

export interface SearchExpr extends Expr {
  kind: 'SearchExpr'
  left: StringLiteral | undefined
  right: StringLiteral | SearchExpr
  opr: string
}

export interface StringLiteral extends Expr {
  kind: 'StringLiteral'
  value: string
}
