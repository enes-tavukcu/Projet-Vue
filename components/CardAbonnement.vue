<script setup lang="ts">
defineProps<{
  image: { asset: { _ref: string }};
  titre: string;
  text: string;
  prix: number;
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
  <div class="latest-news2">
    <p class="latest-news2__item-text2">{{ text }}</p>
    <p class="latest-news2__item-price">
    {{ prix === 0 ? 'Gratuit' : `${prix}€ /mois` }}
    </p>  
</div>

</template>

<style lang="scss">
.latest-news {
    display: flex;
    align-items: center;
    gap: 10px;

  
  &__item-title {
    font-size: 14px;
    font-family: $fontTitleFamily;
    text-align: center;
    font-weight: 600;
  }
  }

.latest-news2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__item-text2 {
    font-size: 16px;
    color: #666;
    font-family: $fontTitleFamily;
    text-align: left;
  }

  &__item-price {
    font-size: 30px;
    color: #000000;
    font-family: $fontTitleFamily;
    text-align: left;
  }
}
</style>
