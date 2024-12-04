<script setup lang="ts">
// import { SanityContent } from "#build/components";

import type { SanityDocument } from "@sanity/client";
// import imageUrlBuilder from "@sanity/image-url";
// import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const POST_QUERY = groq`*[_type == "personnage" && slug.current == $slug][0] {
    title, body, image,  "categories": categories[]->{title, slug} }`;
const route = useRoute();

const { data: personnage } = await useSanityQuery<SanityDocument>(POST_QUERY, {
  slug: route.params.slug,
});

if (!personnage.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}
</script>

<template>
  <div v-if="personnage" class="p-blog-slug">
    <h1>{{ personnage.title }}</h1>

    <div v-for="categorie in personnage.categories" :key="categorie.slug">
      <h2>{{ categorie.title }}</h2>
    </div>

    <!-- <SanityContent v-bind="{ blocks: personnage.body }" /> -->
    <!-- <SanityContent v-bind="{ blocks: personnage.categories }" /> -->
  </div>
</template>

<style scoped>
.p-blog-slug {
  margin-top: 100px;
}
</style>
