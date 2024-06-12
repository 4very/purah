<script lang="ts" setup>
import type { Post, Post_Plain } from '~/strapi/src/types/api/post'

const route = useRoute()
const { find } = useStrapi<Post_Plain>()
const post = (
  await find('posts', {
    filters: {
      slug: { $eq: route.params.slug },
    },
  })
).data[0]
</script>

<template>
  <div>
    <h1>{{ post.attributes.title }}</h1>
    <div v-html="post.attributes.body3"></div>
    <!-- <JsonBody :body="post.attributes.body2"></JsonBody> -->
  </div>
</template>
