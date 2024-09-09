<script setup lang="ts">
import type { Photo } from '~/strapi/src/types/api/photo'

const strapiUrl = useStrapiUrl()
console.log(strapiUrl)

const props = defineProps<{
  photos: Photo[]
  divisions: number
}>()

// const media = useStrapiMedia(
//   props.photos[0].attributes.photo.data.attributes.formats.medium.url
// )
// console.log('media', media)

const divisions = computed(() => 7 - props.divisions)
</script>

<template>
  <section id="gallery-body">
    <div id="gallery-photo-grid">
      <div
        v-for="photo in photos"
        :key="photo.id"
        id="gallery-grid-item"
      >
        <NuxtLink :to="`/photo/${photo.id}`">
          <NuxtImg
            provider="strapi"
            :src="photo.attributes.photo.data.attributes.formats.medium.url"
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="postcss">
#gallery-photo-grid {
  grid-template-columns: repeat(v-bind(divisions), 1fr);
}

#gallery-grid-item {
  --hover-scale: calc(0.015 * (4 * v-bind(divisions) + 64));
}
</style>
