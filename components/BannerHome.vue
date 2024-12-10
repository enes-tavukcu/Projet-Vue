<script setup lang="ts">
defineProps<{
  title: string;
  text: string;
  images: string;
  stats: { value: string; text: string }[];
}>();

// === Gestion des Images ===
const { urlFor } = useSanityImage();
</script>

<template>
  <!-- Hero Banner -->
  
  <section class="hero">
     
    <img v-if="images" :src="urlFor(images)?.url()" class="banner-img" alt="Image du personnage">    
    <div class="hero__content">
      <h1 class="hero__title">{{ title }}</h1>
      <p class="hero__text">{{ text }}</p>
      <ul v-if="stats?.length" class="hero__stats">
        <li v-for="(stat, index) in stats" :key="index" class="hero__stat">
          <StatCard v-bind="stat" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">

.banner-img {
    width: 100%;
    object-fit: cover;
}
.hero {
    width: 100%;
    color: #fff;
    text-align: center;
    position: relative;
    overflow: hidden;
    display: block;

  &__content {
    left: 0;
    position: absolute;
    bottom: 4px;
    background: linear-gradient(to right, #007bff, #0056b3);
    width: 66.6666%;
    padding: 30px;
    border-radius: 0 125px 0px 0px;

    @include small-down() {
    left: 0;
    position: absolute;
    bottom: 4px;
    background: linear-gradient(to right, #007bff, #0056b3);
    padding: 30px;
}
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
</style>
