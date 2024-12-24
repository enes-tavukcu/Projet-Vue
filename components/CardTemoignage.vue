<script setup lang="ts">
defineProps<{
  image: { asset: { _ref: string }};
  nom: string;
  text: string;
  note?: number; // La note sera convertie en un nombre
}>();

// === Gestion des Images ===
const { urlFor } = useSanityImage();

// Transforme une note en étoiles
const generateStars = (note: number): string[] => {
  const maxStars = 5;
  const fullStars = Math.floor(note); // Étoiles pleines
  const hasHalfStar = note % 1 >= 0.5; // Étoile demi-pleine
  const stars = Array.from({ length: maxStars }, (_, i) => {
    if (i < fullStars) return '★';
    if (i === fullStars && hasHalfStar) return ''; // Demi-étoile (vous pouvez ajuster le symbole)
    return '☆';
  });
  return stars;
};
</script>

<template>
    <div class="latest-news">
      <img v-if="image" :src="urlFor(image)?.url()" alt="Image du personnage" >
  
      <p class="latest-news__item-title">
        {{ nom }}
      </p>
    </div>
    <div class="latest-news2">
      <p class="latest-news2__item-text3">
        <em>'{{ text }}'</em>
      </p>
      <p v-if="note" class="latest-news2__item-stars">
        <span v-for="(star, index) in generateStars(note)" :key="index">
          {{ star }}
        </span>
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

  &__item-text3 {
    font-size: 12px; // Taille de la police
    color: #666; // Couleur du texte
    font-family: $fontTitleFamily;
    text-align: left;
    font-style: italic; // Italique pour les commentaires
  }

  &__item-stars {
    font-size: 20px;
    color: #f5c518; // Couleur des étoiles remplies
    text-align: left;

    span {
      margin-right: 2px;
      font-size: 18px;
    }
  }
}

</style>
