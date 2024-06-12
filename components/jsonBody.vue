<script lang="ts" setup>
import type { Attribute } from '@strapi/strapi'
const { body } = defineProps<{
  body: Attribute.BlocksValue
}>()
</script>

<template>
  <div>
    <template v-for="block in body">
      <p v-if="block.type === 'paragraph'">
        <template v-for="child of block.children">
          <span v-if="child.type === 'text'">{{ child.text }}</span>
          <a
            v-else-if="child.type === 'link'"
            :href="child.url"
            >{{ child }}</a
          >
        </template>
      </p>
    </template>
  </div>
</template>
