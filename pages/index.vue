<script setup lang="ts">
// Imports nécessaires
import type { SanityDocument } from "@sanity/client";

// Configuration de la page
definePageMeta({ layout: "default" });

// === Gestion des Images ===
const { urlFor } = useSanityImage();

// === Récupération des données de la page d'accueil ===
const { data: homepage } = await useSanityQuery<SanityDocument[]>(
  groq`*[_type == "homepage"][0]`
);

// Gestion des erreurs si les données n'existent pas
if (!homepage.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

// Définir les métadonnées SEO pour la page d'accueil
useSeoMeta({
  title: homepage.value?.title || "Accueil",
  description:
    "Bienvenue sur notre site, découvrez nos actualités et statistiques.",
  ogTitle: homepage.value?.title || "Accueil",
  ogDescription: "Découvrez nos dernières statistiques et actualités.",
});
</script>

<template>
  <div class="homepage">
    <!-- Hero Banner -->
    <section class="hero">
      <div class="hero__content">
        <h1 class="hero__title">{{ homepage?.hero?.title }}</h1>
        <p class="hero__text">{{ homepage?.hero?.text }}</p>
        <ul v-if="homepage?.hero?.stats?.length" class="hero__stats">
          <li
            v-for="(stat, index) in homepage.hero.stats"
            :key="index"
            class="hero__stat"
          >
            <span class="stat__value">{{ stat.value }}</span>
            <span class="stat__text">{{ stat.text }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Dernière actualité -->
    <section class="latest-news">
      <div class="latest-news__content">
        <h1 class="latest-news__title">{{ homepage?.actualite?.title }}</h1>
        <p class="news__text">{{ homepage?.actualite?.text }}</p>
        <ul
          v-if="homepage?.actualite?.last_actualite?.length"
          class="latest-news__list"
        >
          <li
            v-for="(last_actualite, index) in homepage.actualite.last_actualite"
            :key="index"
            class="latest-news__item"
          >
            <div class="latest-news__item-image">
              <img
                v-if="last_actualite.image"
                :src="urlFor(last_actualite.image)?.url()"
                alt="Image du personnage"
              />

              <p class="latest-news__item-title">
                {{ last_actualite.titre }}
              </p>
            </div>
            <p class="latest-news__item-text">{{ last_actualite.text }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.homepage {
  /* Disposition globale de la page */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background-color: #f9f9f9;
  font-family: "Arial", sans-serif;

  .hero {
    /* Section Hero */
    width: 100%;
    max-width: 1200px;
    background: linear-gradient(to right, #007bff, #0056b3);
    color: #fff;
    border-radius: 10px;
    padding: 40px 20px;
    margin: 20px 0;
    text-align: center;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;

    &__content {
      position: relative;
      z-index: 1;
    }

    &__title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 10px;
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }

    &__text {
      font-size: 1.2rem;
      margin-bottom: 20px;
    }

    &__stats {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
      list-style: none;
      padding: 0;
      margin: 20px 0 0;

      .hero__stat {
        background: rgba(255, 255, 255, 0.2);
        padding: 15px 20px;
        border-radius: 8px;
        text-align: center;
        width: 120px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
        display: flex;
        flex-direction: column;
        gap: 10px;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
        }

        .stat__value {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .stat__text {
          font-size: 0.9rem;
          color: #f0f0f0;
        }
      }
    }

    &__background {
      /* Fond décoratif (par ex. une image ou un motif) */
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("/path-to-your-hero-image.jpg") center/cover no-repeat;
      filter: blur(5px) brightness(0.5);
      z-index: 0;
    }
  }
}

// css pour les actus
.latest-news {
  /* Style global de la section */
  padding: 40px 20px;
  background-color: #f8f9fa; /* Fond clair */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

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

    .news__text {
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
  }

  &__item-image {
    display: flex;
    align-items: center;
    gap: 10px;
  }

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
