<script setup lang="ts">
defineProps<{
  title: string;
  text: string;
  image: { asset: { _ref: string } };
  partenaires: { image: { asset: { _ref: string } } }[];
}>();

const { urlFor } = useSanityImage();
</script>

<template>
  <section class="item-partenaires">
    <div class="item-partenaires__left">
      <img v-if="image" :src="urlFor(image)?.url()" alt="Image principale" class="item-partenaires__left-image" >
      <div class="item-partenaires__left-overlay">
        <h1 class="item-partenaires__left-title">{{ title }}</h1>
      </div>
    </div>
    <div class="item-partenaires__right">
      <h2 class="item-partenaires__right-title">{{ title }}</h2>
      <div class="item-partenaires__right-grid">
        <div 
          v-for="(partenaire, index) in partenaires" 
          :key="index" 
          class="item-partenaires__right-grid-item"
        >
          <img :src="urlFor(partenaire.image)?.url()" alt="Image partenaire" >
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.item-partenaires {
  display: flex;
  
  @include small-down() {
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  &__left {
    position: relative;
    width: 50%;
    height: auto;

    @include small-down() {
        width: 100%;
    }

    &-image {
    //   width: 100%;
    //   height: 100%;
    //   object-fit: cover;
      filter: brightness(70%);

      @include small-down() {
        height: 160px;
        width: 100%;
        object-fit: cover;
      }
    }

    &-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      text-align: center;

      &-title {
        font-size: 2rem;
        font-weight: 700;
      }
    }
  }

  &__right {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    &-title {
      font-size: 1.5rem;
      font-weight: 700;
      text-align: center;
    }

    &-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      justify-items: center;
      align-items: center;
    }
    &-grid-item {
      
      width: 150px;

      @include small-down() {
        width: 100px;
      }
        img {
            object-fit: contain;
            height: auto;
        }
      
    }
  }

  // Responsive design
  @media (max-width: 768px) {
    flex-direction: column;

    &__left,
    &__right {
      width: 100%;
    }

    &__left-overlay {
      &-title {
        font-size: 1.5rem;
      }
    }

    &__right-title {
      font-size: 1.2rem;
    }

    &__grid {
      grid-template-columns: repeat(2, 1fr);

      &-item {
        max-height: 80px; // Ajuste la taille des logos en mobile
      }
    }
  }
}

</style>