<script setup lang="ts">
// import { SanityContent } from "#build/components";

import type { SanityDocument } from "@sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
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

const { urlFor } = useSanityImage();

useSeoMeta({
  title: `${personnage.value.title} | Le foot`,
  description:
    "Le foot est une communauté francophone et d'aventuriers passionnés par le football.",
  ogDescription:
    " Le foot est une communauté francophone et d'aventuriers passionnés par le football.",
  ogTitle: personnage.value.title,
  ogImage:
    personnage.value.image && urlFor(personnage.value.image)
      ? urlFor(personnage.value.image)?.url()
      : "/SiteKubilay.jpg",
});
</script>

<template>
  <div v-if="personnage" class="p-blog-slug">
    <h1>{{ personnage.title }}</h1>

    <div v-for="categorie in personnage.categories" :key="categorie.slug">
      <h2>{{ categorie.title }}</h2>
    </div>

    <SanityContent v-bind="{ blocks: personnage.body }" />

    <img v-if="personnage.image" :src="urlFor(personnage.image)" />

    <!-- <SanityContent v-bind="{ blocks: personnage.body }" /> -->
    <!-- <SanityContent v-bind="{ blocks: personnage.categories }" /> -->
  </div>
</template>

<style scoped>
.p-blog-slug {
  margin-top: 100px;
}
</style>
