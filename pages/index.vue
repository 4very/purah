<script lang="ts" setup>
import type { Photo } from '~/strapi/src/types/api/photo'

const a = useStrapi()
a.find('photos').catch(console.log).then(console.log)
</script>

<template>
  <div>
    <h1>Hello</h1>
  </div>
</template>
