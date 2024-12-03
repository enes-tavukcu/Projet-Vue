<script setup lang="ts">
definePageMeta({ layout: "minimal" });
import type { SanityDocument } from "@sanity/client";

const POSTS_QUERY = groq`*[
  _type == "personnage"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);
</script>

<template>
  <div class="l-blog">Page test</div>
  {{ posts }}
</template>

<style lang="scss">
body {
  background-position: center;
  background-repeat: no-repeat;
}

img {
  border-style: none;
  width: 100vw;
  object-fit: cover;
  height: 100vh;
}
</style>
