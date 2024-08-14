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
  aperture: ['a'],
  shutter_speed: ['shutter'],
  focal_length: ['mm'],
  camera_body: ['body', 'camera'],
  camera_lens: ['lens'],
  mode: ['shooting_mode'],
  last_modified: [],
  taken: ['taken_at'],
  metering_mode: ['focus_mode'],
  collections: ['collection', 'c_title', 'collection_title', 'c'],
  slug: ['c_slug', 'collection_slug', 'collections_slug'],
}

const relation_searches: Record<string, string[]> = {
  collections: ['collections', 'title'],
  slug: ['collections', 'slug'],
}

const reverse_lookup_table = Object.fromEntries(
  Object.entries(lookup_table).flatMap(([e, vs]) => vs.map((v) => [v, e]))
)

function transform_key(str: string) {
  return str.toLowerCase().replace(' ', '_')
}

function build_filter(key: string, ope: string, value: any): filter {
  let filter = { [ope]: value }
  if (key in relation_searches)
    for (let v of relation_searches[key].toReversed()) filter = { [v]: filter }
  else filter = { [key]: filter }
  return filter
}

function wrap_filter(filter: filter | filter[]): or_filter | filter {
  return Array.isArray(filter) ? { $or: filter } : filter
}

function use_key(raw_key: string): string {
  const trans_key = transform_key(raw_key)
  if (trans_key in reverse_lookup_table) return reverse_lookup_table[trans_key]
  else {
    if (!(trans_key in lookup_table))
      throw createError({
        statusCode: 400,
        statusMessage: EvaluateError.InvalidKey,
        data: trans_key,
      })
  }
  return trans_key
}

function eval_StringLiteral(
  str: StringLiteral,
  keyStr: StringLiteral = DEFAULT_KEY
): filter {
  const key = use_key(keyStr.value)
  return build_filter(key, '$contains', str.value)
}

function eval_unpairedKey(str: StringLiteral): filter {
  const key = use_key(str.value)
  return build_filter(key, '$notNull', true)
}

function eval_SearchExpr(expr: SearchExpr): filter | filter[] {
  if (expr.right === undefined)
    return eval_unpairedKey(expr.left as StringLiteral)
  if (expr.right.kind == 'StringLiteral')
    return eval_StringLiteral(expr.right, expr.left)

  const rl = eval_SearchExpr({
    kind: 'SearchExpr',
    left: expr.left,
    right: expr.right.left as StringLiteral | SearchExpr,
    opr: expr.right.opr,
  })

  const rr = eval_SearchExpr({
    kind: 'SearchExpr',
    left: expr.left,
    right: expr.right.right,
    opr: expr.right.opr,
  })

  return [rl, rr].flat()
}

function eval_expr(expr: Expr): filter | or_filter {
  switch (expr.kind) {
    case 'StringLiteral':
      return eval_StringLiteral(expr as StringLiteral)
    case 'SearchExpr':
      return wrap_filter(eval_SearchExpr(expr as SearchExpr))
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
