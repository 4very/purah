<script lang="ts" setup>
import type { Attribute } from '@strapi/strapi'
const { text } = defineProps<{
  text: Attribute.BlocksTextNode[]
}>()
</script>

<template>
  <template v-for="node in text"> </template>
</template>
