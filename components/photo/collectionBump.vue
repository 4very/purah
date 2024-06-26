<script setup lang="ts">
import type { Collection } from '~/strapi/src/types/api/collection'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  photo_id: number
  collection: Collection[]
}>()

const collection = props.collection[0]

const photo_index = collection.attributes.photos?.data.findIndex(
  (photo) => photo.id === props.photo_id
) as number

const total_photos = collection.attributes.photos?.data.length
const next_photo = collection.attributes.photos?.data[photo_index + 1]
const last_photo = collection.attributes.photos?.data[photo_index - 1]

// if (in_collection) {
//   const collection = collections.data[0]
//
//   total_photos = collection.attributes.photos?.data.length
// }
</script>

<template>
  <nav id="photo_collection">
    <div id="collection_link">
      <span>
        Part of
        <NuxtLink :to="`/collection/${collection.attributes.slug}`">{{
          collection.attributes.title
        }}</NuxtLink>
      </span>
    </div>
    <div id="collection_nav">
      <NuxtLink
        :class="{ invisible: !last_photo }"
        :to="last_photo?.id.toString() ?? ''"
      >
        <ChevronLeftIcon />
      </NuxtLink>
      <div>{{ photo_index + 1 }}/{{ total_photos }}</div>
      <NuxtLink
        :class="{ invisible: !next_photo }"
        :to="next_photo?.id.toString() ?? ''"
      >
        <ChevronRightIcon />
      </NuxtLink>
    </div>
  </nav>
</template>

<style lang="postcss">
@import '../../assets/_colors.css';

#photo_collection {
  background-color: #9f9478;
  color: white;
}
</style>
