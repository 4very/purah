import type { ModelRef } from 'vue'
import type { ReformedFilter } from '~/server/types/reform'

export function updateSearchFromReformed(
  reformedFilters: Ref<ReformedFilter> | ReformedFilter,
  search: Ref<string> | ModelRef<string | undefined, string>
) {
  const newSearch = []
  for (const [key, values] of Object.entries(unref(reformedFilters))) {
    let trailingSemi = false
    if (values.length === 0) continue
    if (key === 'title') {
      newSearch.push(values.join(' '))
      continue
    }
    const cleanedValues = values.map((value) => {
      if (value === undefined) {
        trailingSemi = true
        return
      }
      return value.includes(' ') ? `(${value})` : value
    })

    newSearch.push(
      `${key}:${cleanedValues.join(':')}${trailingSemi ? ':' : ''}`
    )
  }
  search.value = newSearch.join(' ')
}

export async function updateReformedFromSearch(
  search: Ref<string> | string,
  reformedFilters: Ref<ReformedFilter>
) {
  const v = await $fetch('/api/reform', { query: { q: unref(search) } })
  reformedFilters.value = v
}
