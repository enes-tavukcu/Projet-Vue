<script lang="ts" setup>
defineProps<{
  name: string;
  description: string;
  price: number;
  image: {
    url: string;
    alt: string;
  };
}>();

const getExcerpt = (text: string, length: number): string => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};
</script>

<template>
  <div class="c-item">
    <div class="c-item__container">
      <img class="c-item__image -blue" :src="image.url" :alt="image.alt" >
      <div class="c-item__details">
        <div class="c-item__content">
          <div class="c-item__intitle">
            <p class="c-item__title">{{ name }}</p>
            <p class="c-item__price">{{ price }} €</p>
          </div>
          <p>
            {{ getExcerpt(description, 150) }}
          </p>
        </div>
        <div class="c-item__actions">
          <button class="button c-item__button">Ajouter au panier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.c-item {
  container-type: inline-size;
  $self: &;

  &__container {
    padding: rem(0px);
    border: 1px solid $gray100;
    background-color: rgb(255, 255, 255);

    @container (min-width: 450px) {
      display: flex;
    }
  }

  @each $color, $value in $colors {
    &.-#{$color} #{$self}__image {
      border-color: $value;
    }

    &.-#{$color} #{$self}__button {
      background: $value;
      border-color: $value;
    }
  }

  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba($gray100, 0.6);

    // #{$self}__title {
    //     color: $primaryColor;
    // }
  }

  &__content {
    padding: rem(15px);
  }

  &__title {
    font-size: rem(18px);
    color: $gray800;
    font-weight: bold;

    &:hover {
      color: $primaryColor;
    }
  }

  &__price {
    font-size: rem(18px);
    color: $grayclair;
  }

  &__image {
    border-bottom: 4px solid $grayclair;
    object-fit: cover;
    max-width: -webkit-fill-available;

    @include medium-up {
      width: 100%;
    }
  }

  &__button {
    display: block;
    margin: auto;
  }

  &__intitle {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  &__details {
    padding: 5px;
  }
  &__actions {
    padding: 5px;
  }
}
</style>
