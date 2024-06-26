<script setup lang="ts">
import type { Photo } from '~/strapi/src/types/api/photo'
import dayjs from 'dayjs'
import af from 'dayjs/plugin/advancedFormat'

dayjs.extend(af)

const props = defineProps<{
  photo: Photo['attributes']
}>()
</script>

<template>
  <div>
    <h1>{{ photo.title ?? photo.photo.data.attributes.name }}</h1>
    <p
      id="photo_date"
      v-if="photo.taken"
    >
      {{ dayjs(photo.taken).format('MMMM Do, YYYY [at] h:ma') }}
    </p>
  </div>
</template>
