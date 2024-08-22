<script lang="ts" setup>
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  Squares2X2Icon,
  CodeBracketSquareIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline'

const divisions = defineModel('divisions')
const filtersOpen = defineModel<boolean>('filtersOpen')
const search = defineModel<string>('search')

watch(search, (newSearch) =>
  navigateTo({
    path: `/gallery`,
    query: { q: newSearch },
  })
)

const goSearch = async () => {
  return await navigateTo({
    path: `/gallery`,
    query: { q: search.value },
  })
  // navigateTo(`/gallery?q=${search.value}`)
}
</script>

<template>
  <section id="gallery-header">
    <div id="gallery-header-inner">
      <div id="gallery-header-search">
        <form @submit.prevent="goSearch">
          <div id="gallery-header-search-input">
            <input
              class="search"
              placeholder="Search photographs"
              v-model="search"
            />
            <button><XMarkIcon /></button>
          </div>
          <button
            id="gallery-header-search-submit"
            type="submit"
          >
            <MagnifyingGlassIcon />
          </button>
        </form>
      </div>
      <div id="gallery-header-slider">
        <button
          type="button"
          @click="divisions = Math.max((divisions as number) - 1, 1)"
        >
          <Squares2X2Icon />
        </button>
        <div>
          <input
            type="range"
            min="1"
            max="6"
            id="slider"
            v-model.number="divisions"
          />
        </div>
        <button
          type="button"
          @click="divisions = Math.min((divisions as number) + 1, 7)"
        >
          <CodeBracketSquareIcon />
        </button>
      </div>
      <div id="gallery-header-filter-toggle">
        <button @click="filtersOpen = !filtersOpen">
          Filter
          <ChevronDownIcon />
        </button>
      </div>
    </div>
  </section>
</template>
