<script setup lang="ts">
// Imports nécessaires
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Configuration de la page
definePageMeta({ layout: "minimal" });

// === Données Réactives ===
const filter = ref(""); // Filtre actif (catégorie sélectionnée)
const page = ref(1); // Page actuelle
const perPage = 3; // Nombre d'éléments par page

// === Calculs Dérivés ===
const paginationStart = computed(() => (page.value - 1) * perPage);
const paginationEnd = computed(() => page.value * perPage);

// === Récupération des Catégories ===
const { data: categories } = await useSanityQuery<SanityDocument[]>(
  groq`*[ _type == "category" && defined(slug.current) ]`
);

// === Compte des Personnages ===
const { data: personnagesCount } = await useSanityQuery<number>(
  groq`count(*[
    _type == "personnage" 
    && defined(slug.current) 
    && ($filter == '' || $filter in (categories[]->slug.current))
  ])`,
  { filter }
);

// === Calcul des Pages Totales ===
const totalPages = computed(() =>
  Math.ceil((personnagesCount.value || 0) / perPage)
);

// === Récupération des Personnages (Filtrés et Paginés) ===
const { data: personnages } = await useSanityQuery<SanityDocument[]>(
  groq`*[ 
    _type == "personnage" 
    && defined(slug.current) 
    && ($filter == '' || $filter in (categories[]->slug.current))
  ]|order(publishedAt desc)[$start...$end]{
    _id, image, title, "categories": categories[]->{title, slug}, slug, publishedAt
  }`,
  { filter: filter, start: paginationStart, end: paginationEnd }
);

// === Gestion des Images ===
const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// === Méthodes ===
/** Gestion du clic sur une catégorie */
function onCategoriesClick(categorie: SanityDocument) {
  filter.value =
    filter.value === categorie.slug.current ? "" : categorie.slug.current;
  page.value = 1; // Réinitialise la page lors d'un changement de filtre
}

/** Gestion du clic sur une page de pagination */
function onPageClick(index: number) {
  page.value = index;
}
</script>

<template>
  <div class="l-blog">
    <!-- Titre -->
    <h1>Blog</h1>

    <!-- Pagination -->
    <div class="p-blog_pagination">
      <div
        v-for="n in totalPages"
        :key="n"
        class="pagination__item"
        :class="{ active: n === page }"
        @click="onPageClick(n)"
      >
        Page {{ n }}
      </div>
    </div>

    <!-- Filtres par Catégorie -->
    <div class="p-blog_filters">
      <h2>Filtres</h2>
      <div
        v-for="(categorie, index) in categories"
        :key="index"
        class="blog__filter"
      >
        <button
          :class="{ active: filter === categorie.slug.current }"
          @click="onCategoriesClick(categorie)"
        >
          {{ categorie.title }}
        </button>
      </div>
    </div>

    <!-- Liste des Personnages -->
    <ul v-if="personnages && personnages.length" class="p-blog_list">
      <li
        v-for="(personnage, index) in personnages"
        :key="index"
        class="blog__item"
      >
        <div class="blog__categories">
          <span v-for="(categorie, i) in personnage.categories" :key="i">
            {{ categorie.title }}
          </span>
        </div>
        <h3>
          <NuxtLink :to="`/blog/${personnage.slug.current}`">
            {{ personnage.title }}
          </NuxtLink>
        </h3>
        <img
          v-if="personnage.image"
          :src="urlFor(personnage.image)?.url()"
          alt="Image du personnage"
        />
      </li>
    </ul>

    <!-- Message Aucun Résultat -->
    <p v-else>Aucun résultat trouvé.</p>
  </div>
</template>

<style lang="scss">
.l-blog {
  padding: 20px;
}

.p-blog_pagination {
  display: flex;
  justify-content: center;
  gap: 10px;

  .pagination__item {
    cursor: pointer;
    padding: 10px 20px;
    background: #ddd;
    border-radius: 5px;
    transition: background 0.3s;

    &:hover {
      background: #bbb;
    }

    &.active {
      background: #333;
      color: #fff;
    }
  }
}

.p-blog_filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;

  .blog__filter {
    button {
      cursor: pointer;
      padding: 5px 10px;
      border: 1px solid #333;
      background: #fff;
      border-radius: 5px;
      transition: background 0.3s, transform 0.2s;

      &:hover {
        background: #f5f5f5;
        transform: scale(1.05); /* Légère mise en avant au survol */
      }

      &.active {
        background: #333;
        color: #fff;
        border-color: #333;
      }
    }
  }
}

.p-blog_list {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(200px, 1fr)
  ); /* Grille réactive */
  gap: 20px;

  .blog__item {
    border: 1px solid #ddd;
    padding: 10px; /* Réduction des marges */
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center; /* Centrer les éléments dans la carte */
    gap: 10px;
    background-color: #f9f9f9; /* Ajout d'un fond léger */
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: translateY(-5px); /* Légère élévation au survol */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombre douce */
    }

    h3 {
      text-align: center; /* Centrer le texte */
      font-size: 1rem; /* Réduction de la taille de la police */
      margin: 0;
    }

    img {
      max-width: 100%;
      height: 120px; /* Hauteur fixe pour uniformiser les cartes */
      object-fit: cover;
      border-radius: 5px;
    }

    .blog__categories {
      font-size: 0.9rem; /* Réduction de la taille de police */
      color: #555;
    }
  }
}
</style>
