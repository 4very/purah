<script lang="ts" setup>
import type { Photo } from '~/strapi/src/types/api/photo'
import type { GalleryView } from '~/strapi/src/types/api/gallery-view'

const { findOne } = useStrapi<GalleryView['attributes']>()
const query = useRoute().query

const gallery = await findOne('gallery-view', {
  populate: {
    filters: '*',
    photos: {
      populate: ['photo'],
    },
  },
})

let photos: Ref<Photo[]> = ref([])

const search = ref(query.q ? (query.q as string) : '')
const filtersOpen = ref(false)
const divisions = ref(4)

watch(
  [search, filtersOpen],
  async ([newSearch, deferSearch]) => {
    if (search.value === '') photos.value = gallery.data.attributes.photos.data
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
      :filters="gallery.data.attributes.filters"
      v-model:search="search"
      v-model:filtersOpen="filtersOpen"
    ></GalleryFilter>
    <GalleryBody
      v-show="!filtersOpen"
      :photos="photos"
      :divisions="divisions"
    ></GalleryBody>
  </div>
</template>
