<script lang="ts" setup>
import type {
  Collection,
  Collection_Plain,
} from '~/strapi/src/types/api/collection'

const { find } = useStrapi<Collection_Plain>()
const collections = await find('collections')
</script>

<template>
  <div>
    <h1>Hello</h1>
    <ul>
      <li
        v-for="collection in collections.data"
        :key="collection.id"
      >
        <NuxtLink :to="`collection/${collection.attributes.slug}`">{{
          collection.attributes.title
        }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
