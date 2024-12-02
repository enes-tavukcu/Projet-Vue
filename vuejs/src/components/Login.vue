<script setup lang="ts">
import MyForm from "@/components/Form.vue";
import { RouterLink, RouterView } from "vue-router";

const props = defineProps<{
  variant?: "login" | "signup";
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
  } else if (props.variant === "signup") {
    return "Inscription";
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
  } else if (props.variant === "signup") {
    return "Vous avez déjà un compte ? connectez-vous ";
  }
}

function getRedirectLink() {
  if (props.variant === "login") {
    return "/signup";
  } else if (props.variant === "signup") {
    return "/";
  }
}
</script>

<template>
  <main
    :class="{
      home: true,
      '-login': variant === 'login',
      '-signup': variant === 'signup',
    }"
  >
    <div class="home__content">
      <div class="home__form">
        <MyForm class="button -borderless" :title="getTextForm()" />
        <p
          :class="{
            redirect: true,
            '-login': variant === 'login',
            '-signup': variant === 'signup',
          }"
        >
          {{ getRedirectText() }}
          <router-link :to="getRedirectLink()" class="home__link"
            >ici</router-link
          >.
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
    background: url("@/img/home2.jpg");
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
    background: url("@/img/home1.jpg");
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
    font-family: $fontTitleFamily;

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
