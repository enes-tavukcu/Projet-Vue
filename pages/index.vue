<script setup lang="ts">
// Imports nécessaires
import type { SanityDocument } from "@sanity/client";

// === Récupération des données de la page d'accueil ===
const { data: homepage } = await useSanityQuery<SanityDocument>(
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
    <BannerHome v-bind="homepage?.hero" />

    <LatestNews v-bind="homepage?.actualite" />


    <HomePricing v-bind="homepage?.pricing" />

    <HomeTemoignage v-bind="homepage?.temoignage" />

    <!-- Dernière actualité -->
  </div>
</template>

<style lang="scss">
.homepage {
  /* Disposition globale de la page */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
}
</style>
