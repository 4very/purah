<script lang="ts" setup>
import type { Collection } from '~/strapi/src/types/api/collection'

const route = useRoute()

const { find } = useStrapi<Collection['attributes']>()
const collection = (
  await find('collections', {
    filters: {
      slug: { $eq: route.params.slug },
    },
    populate: {
      photos: {
        populate: ['photo'],
      },
    },
  })
).data[0]

await navigateTo({
  path: `/gallery`,
  query: { q: `collection:(${collection.attributes.title})` },
})
</script>

<template>
  <div>
    <h1>{{ collection.attributes.title }}</h1>
    <ul>
      <li
        v-for="photo in (collection.attributes.photos ?? {}).data"
        :key="photo.id"
      >
        <NuxtLink :to="`/photo/${photo.id}`">
          {{ photo.attributes.photo.data.attributes.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
