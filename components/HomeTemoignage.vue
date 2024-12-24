<script setup lang="ts">
defineProps<{
  title: string;
  text: string;
  temoignages: { image: { asset: { _ref: string } }; nom: string; text: string; note: number }[];
}>();


</script>

<template>
  <section class="latest-news">
    <div class="latest-news__content">
      <h1 class="latest-news__title">{{ title }}</h1>
      <p class="latest-news__text">{{ text }}</p>

      <ul v-if="temoignages?.length" class="latest-news__list">
        <li
          v-for="(temoignage, index) in temoignages"
          :key="index"
          class="latest-news__item"
        >
          <CardTemoignage v-bind="temoignage" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
  
</style>