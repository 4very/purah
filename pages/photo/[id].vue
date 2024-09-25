<script lang="ts" setup>
import type { Photo, Photo_Plain } from '~/strapi/src/types/api/photo'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const id = route.params.id as string

const { findOne } = useStrapi<Photo_Plain>()
const photo = await findOne('photos', id, {
  populate: {
    photo: {
      populate: '*',
    },
    collections: {
      populate: {
        photos: {
          populate: '*',
        },
      },
    },
  },
})

const color = photo.data.color ?? '$background'
const collections = photo.data.collections
// console.log(collections)
</script>

<template>
  <main id="art_page">
    <div id="art_return">
      <a @click="$router.back()"><ArrowLeftIcon />Return</a>
    </div>
    <section id="art_main">
      <div id="art_image">
        <NuxtImg
          :src="`http://localhost:1337${photo.data.photo.url}`"
        ></NuxtImg>
      </div>
    </section>
    <PhotoCollectionBump
      v-if="collections && collections.length"
      :photo_id="id"
      :collection="collections"
    ></PhotoCollectionBump>
    <section id="photo_info">
      <PhotoAbout :photo="photo.data"></PhotoAbout>
    </section>
  </main>
</template>

<style lang="postcss">
:root {
  background-color: v-bind(color);
}
#art_main,
body {
  background-color: v-bind(color);
}

#photo_info,
#art_return {
  background-color: #93886d;
  color: white;
}
</style>
