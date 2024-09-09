<script setup lang="ts">
import type { ReformedFilter } from '~/server/types/reform'
import type { Filter } from '~/strapi/src/types/components/gallery/Filter'

const props = defineProps<{
  filters: Filter[]
}>()

const [search] = defineModel<string>('search')
const [filtersOpen] = defineModel<boolean>('filtersOpen')
const [reformed] = defineModel<ReformedFilter>('reformed')

const results = ref(0)

const checked = computed(() => {
  const value: ReformedFilter = {}
  for (const filter of props.filters) {
    value[filter.key] =
      reformed.value && filter.key in reformed.value
        ? reformed.value[filter.key]
        : reactive([])
  }
  return value
})

watch([search, filtersOpen], async ([newSearch]) => {
  if (!filtersOpen) return
  console.log('hello', newSearch)
  const req = await $fetch('/api/search/count', {
    query: { q: newSearch },
  })
  results.value = req
})

const update = () => updateSearchFromReformed(checked, search)
</script>

<template>
  <div id="gallery-filters">
    <GalleryFilterBlock
      v-for="(filter, i) in filters"
      :key="i"
      :title="filter.name"
      :total="filter.filters.count"
      :values="filter.filters.items"
      :type="filter.type"
      v-model:checked="checked[filter.key]"
      :update="update"
    >
    </GalleryFilterBlock>

    <button
      id="gallery-filter-count"
      @click="filtersOpen = false"
    >
      <span>Show {{ results }} results -></span>
    </button>
  </div>
</template>

<style></style>
