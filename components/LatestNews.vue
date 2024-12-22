<script setup lang="ts">
defineProps<{
  title: string;
  text: string;
  actualites: { image: { asset: { _ref: string } }; titre: string; text: string }[];
}>();


</script>

<template>
  <section class="latest-news">
    <div class="latest-news__content">
      <h1 class="latest-news__title">{{ title }}</h1>
      <p class="latest-news__text">{{ text }}</p>
      <ul v-if="actualites?.length" class="latest-news__list">
        <li
          v-for="(actualite, index) in actualites"
          :key="index"
          class="latest-news__item"
        >
          <CardNews v-bind="actualite" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
.latest-news {
  /* Style global de la section */
  border-radius: 10px;

  &__content {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;

    &__title {
      font-size: 2.2rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 20px;
    }

    &__news__text {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 30px;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 10px;

    @include medium-up () {
      margin: 20px;  
    }

    
  }

  

  &__item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
    border: 2px solid transparent; /* Bordure initiale transparente */
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s, box-shadow 0.3s, border 0.3s;

    /* Effet de bordure brillante */
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(90deg, #1e3a8a, #60a5fa); /* Bleu foncé à bleu ciel */
    background-origin: border-box;
    background-clip: padding-box, border-box;

    

    &:hover {
      transform: translateY(-5px); /* Légère élévation */
      box-shadow: 0 8px 12px rgba(30, 58, 138, 0.3); /* Ombre bleutée */
      border: 2px solid transparent;
      background-image: linear-gradient(#fff, #fff),
        linear-gradient(90deg, #3b82f6, #93c5fd); /* Dégradé plus lumineux */
    }

    img {
      /* Image dans un carré arrondi */
      width: 40px;
      height: 40px; /* Pour garantir un carré parfait */
      border-radius: 50%; /* Rond parfait */
      object-fit: cover;
      border: 2px solid #007bff; /* Bordure colorée pour faire ressortir */

      /* Ombre intérieure */
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4),
        /* Légère ombre douce */ inset 0 -2px 4px rgba(255, 255, 255, 0.2); /* Effet lumineux subtil */
    }

    &__item-title {
      font-size: 1.2rem;
      font-weight: bold;
      color: #333;
      margin: 0 0 10px 0; /* Espacement sous le titre */
    }

    &__item-text {
      font-size: 1rem;
      color: #666;
      line-height: 1.5; /* Espacement des lignes pour meilleure lisibilité */
      margin: 0;
    }
  }
}
</style>
