import { Expr, Search, SearchExpr, Stmt, StringLiteral } from '../types/ast'
import { EvaluateError } from '../types/evaluate'
import { Parser } from './parser'

type filter = {
  [key: string]: {
    [key: string]: any
  }
}

type or_filter = {
  [key: string]: filter
}

const DEFAULT_KEY: StringLiteral = {
  kind: 'StringLiteral',
  value: 'title',
}

const lookup_table: Record<string, string[]> = {
  title: ['t'],
  iso: [],
  aperture: [],
  shutter_speed: ['shutter'],
  focal_length: ['mm'],
  camera_body: ['body', 'camera'],
  camera_lens: ['lens'],
  mode: ['shooting_mode'],
  last_modified: [],
  taken: ['taken_at'],
  metering_mode: ['focus_mode'],
}

const reverse_lookup_table = Object.fromEntries(
  Object.entries(lookup_table).flatMap(([e, vs]) => vs.map((v) => [v, e]))
)

function transform_key(str: string) {
  return str.toLowerCase().replace(' ', '_')
}

function eval_StringLiteral(
  str: StringLiteral,
  keyStr: StringLiteral = DEFAULT_KEY
): filter {
  const trans_key = transform_key(keyStr.value)
  let key: string = trans_key
  if (trans_key in reverse_lookup_table) key = reverse_lookup_table[trans_key]
  else {
    if (!(trans_key in lookup_table))
      throw createError({
        statusCode: 400,
        statusMessage: EvaluateError.InvalidKey,
        data: trans_key,
      })
  }

  key =
    trans_key in reverse_lookup_table
      ? reverse_lookup_table[trans_key]
      : trans_key
  return { [key]: { $contains: str.value } }
}

function eval_SearchExpr(expr: SearchExpr): filter[] {
  if (expr.right.kind == 'StringLiteral')
    return [eval_StringLiteral(expr.right, expr.left)]
  return [
    ...eval_SearchExpr({
      kind: 'SearchExpr',
      left: expr.left,
      right: expr.right.left as StringLiteral | SearchExpr,
      opr: expr.right.opr,
    }),
    ...eval_SearchExpr({
      kind: 'SearchExpr',
      left: expr.left,
      right: expr.right.right,
      opr: expr.right.opr,
    }),
  ]
}

function eval_expr(expr: Expr): filter | or_filter {
  switch (expr.kind) {
    case 'StringLiteral':
      return eval_StringLiteral(expr as StringLiteral)
    case 'SearchExpr':
      return { $or: eval_SearchExpr(expr as SearchExpr) }
  }

  return {}
}

function evaluate(ast: Search) {
  const filters: (filter | or_filter)[] = []
  for (const expr of ast.body) {
    filters.push(eval_expr(expr))
  }
  return { filters: { $and: filters } }
}

export default defineEventHandler<{ query: { q: string } }>(async (event) => {
  const query = getQuery(event)
  if (query && query.q) {
    const parser = new Parser()
    const ast = parser.produceAST(query.q)
    return evaluate(ast)
  }
  return []
})
