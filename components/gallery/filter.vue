<script setup lang="ts">
import type { Filter } from '~/strapi/src/types/components/gallery/Filter'

const props = defineProps<{
  filters: Filter[]
}>()

const [search] = defineModel<string>('search')
const [filtersOpen] = defineModel<boolean>('filtersOpen')

const checked: { [key: string]: string[] } = reactive(
  Object.fromEntries(props.filters.map((filter) => [filter.key, []]))
)

// watch(checked, (c) => console.log(c), { deep: true })

watch(
  checked,
  async (newChecked) => {
    const r: string[] = []

    for (let [key, values] of Object.entries(checked)) {
      if (values.length == 0) continue
      const cleanedValues = values.map((value) =>
        value.includes(' ') ? `(${value})` : value
      )
      r.push(`${key}:${cleanedValues.join(':')}`)
    }

    const q = r.join(' ')
    search.value = q

    const req = await $fetch('/api/search/count', {
      query: { q },
    })
    results.value = req
  },
  { deep: true }
)

const results = ref(0)
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
