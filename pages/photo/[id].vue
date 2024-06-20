<script lang="ts" setup>
import type { Photo } from '~/strapi/src/types/api/photo'
import exifr from 'exifr'

const route = useRoute()

const { findOne } = useStrapi<Photo['attributes']>()
const photo = await findOne('photos', (route.params.id as string) ?? '1', {
  populate: {
    photo: {
      populate: '*',
    },
  },
})

console.log(photo)

const metadata = await getEXIFPhoto(photo)
</script>

<template>
  <div>
    <h1>{{ photo.data.attributes.photo.data.attributes.name }}</h1>
    <NuxtImg
      :src="`http://localhost:1337${photo.data.attributes.photo.data.attributes.url}`"
    >
    </NuxtImg>
    <pre>{{ metadata }}</pre>
  </div>
</template>
