<script setup lang="ts">
import type { Filter } from '~/strapi/src/types/components/gallery/Filter'

const props = defineProps<{
  filters: Filter[]
}>()

console.log(props.filters)
</script>

<template>
  <div id="gallery-filter-body">
    <GalleryFilterBlock
      v-for="(filter, i) in filters"
      :key="i"
      :title="filter.name"
      :total="filter.filters.sum"
      :values="filter.filters.values"
      :type="filter.type"
    >
    </GalleryFilterBlock>
  </div>
</template>

<style></style>
