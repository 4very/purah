<script lang="ts" setup>
import type { Photo } from '~/strapi/src/types/api/photo'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const id = Number((route.params.id as string) ?? '1')

const { findOne } = useStrapi<Photo['attributes']>()
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

const color = photo.data.attributes.color ?? '$background'
const collections = photo.data.attributes.collections?.data
</script>

<template>
  <main id="art_page">
    <div id="art_return">
      <NuxtLink to="/gallery"><ArrowLeftIcon />Return</NuxtLink>
    </div>
    <section id="art_main">
      <div id="art_image">
        <NuxtImg
          :src="`http://localhost:1337${photo.data.attributes.photo.data.attributes.url}`"
        ></NuxtImg>
      </div>
    </section>
    <PhotoCollectionBump
      v-if="collections"
      :photo_id="id"
      :collection="collections"
    ></PhotoCollectionBump>
    <section id="photo_info">
      <PhotoAbout :photo="photo.data.attributes"></PhotoAbout>
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
