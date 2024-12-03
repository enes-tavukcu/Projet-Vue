<script setup lang="ts">
// import { SanityContent } from "#build/components";

// import type { SanityDocument } from "@sanity/client";
// import imageUrlBuilder from "@sanity/image-url";
// import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const POST_QUERY = groq`*[_type == "personnage" && slug.current == $slug][0]`;
const route = useRoute();

const { data: personnage } = await useSanityQuery(POST_QUERY, {
  slug: route.params.slug,
});
</script>

<template>
  <div v-if="personnage" class="p-blog-slug">
    <h1>{{ personnage.title }}</h1>

    <SanityContent v-bind="{ blocks: personnage.body }" />
  </div>
</template>

<style scoped>
.p-blog-slug {
  margin-top: 100px;
}
</style>
