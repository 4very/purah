<script lang="ts" setup>
import type { Photo } from '~/strapi/src/types/api/photo'
import type { GalleryView } from '~/strapi/src/types/api/gallery-view'

const { findOne } = useStrapi<GalleryView['attributes']>()
const gallery = await findOne('gallery-view', {
  populate: {
    photos: {
      populate: ['photo'],
    },
  },
})

const photos = gallery.data.attributes.photos.data

const divisions = ref(4)
</script>

<template>
  <div>
    <GalleryHeader v-model:divisions="divisions"></GalleryHeader>
    <GalleryBody
      :photos="photos"
      :divisions="divisions"
    ></GalleryBody>
  </div>
</template>
