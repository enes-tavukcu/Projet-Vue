<script setup lang="ts">
defineProps<{
  title: string;
  text: string;
  abonnements: { image: { asset: { _ref: string } }; titre: string; text: string; prix: string }[];
}>();


</script>

<template>
  <section class="latest-news">
    <div class="latest-news__content">
      <h1 class="latest-news__title">{{ title }}</h1>
      <p class="latest-news__text">{{ text }}</p>

      <ul v-if="abonnements?.length" class="latest-news__list">
        <li
          v-for="(abonnement, index) in abonnements"
          :key="index"
          class="latest-news__item"
        >
          <CardNews v-bind="abonnement" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
  
</style>