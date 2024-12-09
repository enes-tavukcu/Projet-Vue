<script setup lang="ts">
defineProps<{
  image: string;
  titre: string;
  text: string;
}>();

// === Gestion des Images ===
const { urlFor } = useSanityImage();
</script>

<template>
  <div class="latest-news">
    <img v-if="image" :src="urlFor(image)?.url()" alt="Image du personnage">

    <p class="latest-news__item-title">
      {{ titre }}
    </p>
  </div>
  <p class="latest-news__item-text">{{ text }}</p>
</template>

<style lang="scss">
.latest-news {
    display: flex;
    align-items: center;
    gap: 10px;

  &__item-text {
    font-size: 10px;
    color: #666;
    font-family: $fontTitleFamily;
    text-align: left;
  }
  &__item-title {
    font-size: 14px;
    font-family: $fontTitleFamily;
    text-align: center;
    font-weight: 600;
  }
  }

 

</style>
