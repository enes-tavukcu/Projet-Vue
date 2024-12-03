<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

definePageMeta({ layout: "minimal" });
const POSTS_QUERY = groq`*[
  _type == "personnage"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, image, title, slug, publishedAt}`;

const { data: personnages } = await useSanityQuery<SanityDocument[]>(
  POSTS_QUERY
);

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>

<template>
  <div class="l-blog">
    <h1>Blog</h1>
    <h2>Blog</h2>
    <div>
      <ul>
        <li v-for="(personnage, index) in personnages" :key="index">
          <Button>
            <NuxtLink :to="`/blog/${personnage.slug.current}`">{{
              personnage.title
            }}</NuxtLink>
          </Button>
          <img
            v-if="personnage.image"
            :src="urlFor(personnage.image)?.url()"
            alt=""
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-position: center;
  background-repeat: no-repeat;
}

img {
  border-style: none;
  width: 300px;
  height: 200px;
}
</style>
