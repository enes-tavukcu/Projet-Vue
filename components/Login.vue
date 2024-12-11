<script setup lang="ts">
// import { RouterLink, RouterView } from "vue-router";

const props = defineProps<{
  variant: "login" | "register";
}>();

// function getImage() {
//   if (props.variant === "login") {
//     return "@/img/home2.jpg";
//   } else if (props.variant === "signup") {
//     return "@/img/home1.jpg";
//   }
// }

function getTextForm() {
  if (props.variant === "login") {
    return "Connexion";
  } else if (props.variant === "register") {
    return "Inscription";
  } else {
    return "Connexion";
  }
}

// function getText() {
//   if (props.variant === "login") {
//     return "Bienvenue sur la page Connexion";
//   } else if (props.variant === "signup") {
//     return "Bienvenue sur la page Inscription";
//   }
// }

function getRedirectText() {
  if (props.variant === "login") {
    return "Vous n'avez pas de compte ? inscrivez-vous ";
  } else if (props.variant === "register") {
    return "Vous avez déjà un compte ? connectez-vous ";
  }
}

function getRedirectLink(): string {
  if (props.variant === "login") {
    return "/register";
  } else if (props.variant === "register") {
    return "/connexion";
  }
  return "/"; // Valeur par défaut si variant est undefined
}
</script>

<template>
  <main
    :class="{
      home: true,
      '-login': variant === 'login',
      '-signup': variant === 'register',
    }"
  >
    <div class="home__content">
      <div class="home__form">
        <Form2 :action="variant" class="button -borderless" :title="getTextForm()" />
        <p
          :class="{
            redirect: true,
            '-login': variant === 'login',
            '-signup': variant === 'register',
          }"
        >
          {{ getRedirectText() }}
          <NuxtLink :to="getRedirectLink()" class="home__link">ici</NuxtLink>.
        </p>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;

  &.-login {
    background: url("@/assets/img/home2.jpg");
    background-size: cover;
    min-height: 100vh;
    color: $white;

    @include small-down() {
      background-position: right;
    }

    @include medium-up() {
      background-position: right;
    }
  }

  &.-signup {
    background: url("@/assets/img/home1.jpg");
    background-size: cover;
    min-height: 100vh;
    color: $white;

    @include small-down() {
      background-position: bottom;
    }

    @include small-up() {
    }

    @include medium-up() {
      background-position: center;
    }
    .redirect {
      color: $white;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @include large-up() {
      flex-direction: row;
      position: absolute;
      left: 10%;
      top: 10%;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.title {
  text-align: center;
}

.subtitle {
  text-align: center;
}

.redirect {
  color: $white;
  //   background-color: $white100;
  padding: 2vh 4vh;
  border-radius: rem(8px);
  font-size: small;
}
</style>
