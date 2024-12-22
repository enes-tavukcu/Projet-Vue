<script setup lang="ts">
interface Header {
  logo: { asset: { url: string } };
  navigation: { label: string; url: string }[];
  cta: { label: string; url: string };
}

const { data: header } = await useSanityQuery<Header>(groq`
  *[_type == "header"][0]{
    logo {
      asset -> { url }
    },
    navigation[] {
      label,
      url
    },
    cta {
      label,
      url
    }
  }
`);

const isOpen = ref(false);

const toggleMobileMenu = () => {
  isOpen.value = !isOpen.value;
};

// const closeMobileMenu = () => {
//   isOpen.value = false;
// };
</script>

<template>
  <header v-if="header" class="header">
    <div class="header__container">
      <!-- Logo -->
      <div class="header__logo">
        <img :src="header.logo.asset.url" alt="Site Logo" class="header__logo-img" >
      </div>

      <!-- Mobile Menu Button -->
      <button class="header__menu-button" @click="toggleMobileMenu">
        <svg v-if="!isOpen" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 9h14a1 1 0 110 2H3a1 1 0 110-2zm0-4h14a1 1 0 110 2H3a1 1 0 110-2zm0 8h14a1 1 0 110 2H3a1 1 0 110-2z" clip-rule="evenodd" />
        </svg>
        <svg v-else viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M6 6a.75.75 0 011.06 0L10 8.94l2.47-2.47a.75.75 0 111.06 1.06L11.06 10l2.47 2.47a.75.75 0 11-1.06 1.06L10 11.06l-2.47 2.47a.75.75 0 01-1.06-1.06L8.94 10 6.47 7.53A.75.75 0 016 6z" clip-rule="evenodd" />
        </svg>
      </button>

      <!-- Navigation -->
      <nav v-if="header.navigation" :class="['header__nav', { 'header__nav--active': isOpen }]">
        <ul class="header__nav-list">
          <li v-for="(navItem, index) in header.navigation" :key="index" class="header__nav-item">
            <NuxtLink :to="navItem.url" class="header__nav-link">
              {{ navItem.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <Deconnexion />
    </div>
  </header>
</template>

<style lang="scss">
.header {
    $self: &;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 10px 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  &__logo {
    &-img {
      height: 50px;
      width: 50px;
    }
  }

  &__menu-button {
    display: none;
    cursor: pointer;
    background: transparent;
    border: none;

    svg {
      width: 30px;
      height: 30px;
      fill: #000;
    }

    @media (max-width: 768px) {
      display: block;
      position: relative;
        right: -30%;
    }
  }

  &__nav {
    display: flex;
    gap: 20px;

    &--active {
      display: flex;

      #{$self}__nav-list {
        @media (max-width: 768px) {
            display: flex;
        }
      }
    }

    &-list {
      display: flex;
      gap: 20px;
      list-style: none;
      margin: 0;
      padding: 0;

      @media (max-width: 768px) {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 64px;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        padding: 10px 20px;
      }
    }

    &-item {
      text-align: center;
    }

    &-link {
      color: #000;
      text-decoration: none;
      padding: 10px 15px;
      font-weight: bold;
      transition: color 0.3s ease;

      &:hover {
        color: #007bff;
      }
    }
  }

  &__cta {
    &-button {
      display: inline-block;
      padding: 10px 20px;
      background: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      transition: background 0.3s ease;

      &:hover {
        background: #0056b3;
      }
    }
  }
}
</style>
