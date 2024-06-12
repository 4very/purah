<script lang="ts" setup>
import type { Homepage_Plain } from '~/strapi/src/types/api/homepage'
import type { Post, Post_Plain } from '~/strapi/src/types/api/post'
const { findOne } = useStrapi<Homepage_Plain>()
const homepage = await findOne('homepage')
const { find } = useStrapi<Post_Plain>()
const posts = await find('posts')
console.log(posts)
</script>

<template>
  <div>
    <h1>{{ homepage.data.attributes.title }}</h1>
    <ul>
      <li
        v-for="post in posts.data"
        :key="post.id"
      >
        <nuxtLink :to="`/posts/${post.attributes.slug}`">
          {{ post.attributes.title }}
        </nuxtLink>
      </li>
    </ul>
  </div>
</template>
