<script setup lang="ts">
import type { Photo } from '~/strapi/src/types/api/photo'

const props = defineProps<{
  photos: Photo[]
  divisions: number
}>()

const divisions = computed(() => 7 - props.divisions)
</script>

<template>
  <section id="gallery-body">
    <div id="gallery-flex">
      <div
        v-for="photo in photos"
        :key="photo.id"
        id="gallery-item"
      >
        <NuxtLink :to="`/photo/${photo.id}`">
          <img
            :src="`http://localhost:1337${photo.attributes.photo.data.attributes.formats.medium.url}`"
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="postcss">
#gallery-flex {
  grid-template-columns: repeat(v-bind(divisions), 1fr);
}

#gallery-item {
  --hover-scale: calc(0.015 * (5 * v-bind(divisions) + 64));
}
</style>
