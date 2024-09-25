import { Parser } from './parser'
import { Expr, Search, SearchExpr, Stmt, StringLiteral } from '../types/ast'
import { EvaluateError } from '../types/evaluate'
import { ReformedFilter, ReformedValues } from '../types/reform'

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
  birds: ['bird', 'b'],
}

const reverse_lookup_table = Object.fromEntries(
  Object.entries(lookup_table).flatMap(([e, vs]) => vs.map((v) => [v, e]))
)

function transform_key(str: string) {
  return str.toLowerCase().replace(' ', '_')
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
): [string, ReformedValues[]] {
  const key = use_key(keyStr.value)
  return [key, [str.value]]
}

function eval_unpairedKey(str: StringLiteral): [string, ReformedValues[]] {
  const key = use_key(str.value)
  return [key, [undefined]]
}

function eval_SearchExpr(expr: SearchExpr): [string, ReformedValues[]] {
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

  return [use_key(expr.left?.value ?? ''), [rr[1], rl[1]].flat(1)]
}

function eval_expr(expr: Expr): [string, ReformedValues[]] {
  switch (expr.kind) {
    case 'StringLiteral':
      return eval_StringLiteral(expr as StringLiteral)
    case 'SearchExpr':
      return eval_SearchExpr(expr as SearchExpr)
  }

  return ['', []]
}

function addGrouped(gf: ReformedFilter, key: string, ta: ReformedValues[]) {
  if (key in gf) gf[key].push(...ta)
  else gf[key] = [...ta]
}

export function reform(ast: Search): ReformedFilter {
  const filters: ReformedFilter = {}
  for (const expr of ast.body) {
    const [key, ta] = eval_expr(expr)
    addGrouped(filters, key, ta)
  }
  return filters
}

export default defineEventHandler<{ query: { q: string } }>(async (event) => {
  const query = getQuery(event)
  if (query && query.q) {
    const parser = new Parser()
    const ast = parser.produceAST(query.q)
    return reform(ast)
  }
  return []
})
