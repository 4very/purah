import { Expr, Search, SearchExpr, Stmt, StringLiteral } from '../types/ast'
import { EvaluateError } from '../types/evaluate'
import { ReformedFilter, ReformedValues } from '../types/reform'
import { Parser } from './parser'
import { reform } from './reform'

type filter = {
  [key: string]: {
    [key: string]: any
  }
}

type or_filter = {
  [key: string]: filter
}

const relation_searches: Record<string, string[]> = {
  collections: ['collections', 'title'],
  slug: ['collections', 'slug'],
  birds: ['birds', 'comName'],
}

function build_filter(key: string, ope: string, value: any): filter {
  let filter = { [ope]: value }
  if (key in relation_searches)
    for (let v of relation_searches[key].toReversed()) filter = { [v]: filter }
  else filter = { [key]: filter }
  return filter
}

function wrap_filter(filter: filter | filter[]): or_filter | filter {
  return Array.isArray(filter)
    ? filter.length > 1
      ? { $or: filter }
      : filter[0]
    : filter
}

function evaluate(rf: ReformedFilter) {
  const filters: (filter | or_filter)[] = []
  for (const [key, value] of Object.entries(rf)) {
    if (value.length === 0) continue
    filters.push(
      wrap_filter(
        value.map((filter) => {
          if (filter === undefined) return build_filter(key, '$notNull', true)
          return build_filter(key, '$contains', filter)
        })
      )
    )
  }
  return { filters: { $and: filters } }
}

export default defineEventHandler<{ query: { q: string } }>(async (event) => {
  const query = getQuery(event)
  if (query && query.q) {
    const parser = new Parser()
    const ast = parser.produceAST(query.q)
    const rf = reform(ast)
    return evaluate(rf)
  }
  return []
})
