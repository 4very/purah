<script lang="ts" setup>
import type { Photo, Photo_Plain } from '~/strapi/src/types/api/photo'
import type { ReformedFilter } from '~/server/types/reform'

const gallery = await getGallery()
let photos: Ref<Photo_Plain[]> = ref([])

const query = useRoute().query
const search = ref(query.q ? (query.q as string) : '')
const filtersOpen = ref(false)
const divisions = ref(4)
const reformedFilters: Ref<ReformedFilter> = ref({})

watch(
  search,
  async (newSearch) => {
    await updateReformedFromSearch(newSearch, reformedFilters)
    console.log(reformedFilters.value)
  },
  { immediate: true }
)

watch(
  [search, filtersOpen],
  async ([newSearch, deferSearch]) => {
    if (search.value === '') photos.value = gallery.data.photos
    else {
      const r = await $fetch('/api/search', {
        query: { q: newSearch },
      }).catch(() => {})
      // console.log(r)
      photos.value = r.data
    }
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <GalleryHeader
      v-model:divisions="divisions"
      v-model:filtersOpen="filtersOpen"
      v-model:search="search"
    ></GalleryHeader>
    <GalleryFilter
      v-show="filtersOpen"
      :filters="gallery.data.filters"
      v-model:search="search"
      v-model:reformed="reformedFilters"
      v-model:filtersOpen="filtersOpen"
    ></GalleryFilter>
    <GalleryBody
      v-show="!filtersOpen"
      :photos="photos"
      :divisions="divisions"
    ></GalleryBody>
  </div>
</template>
