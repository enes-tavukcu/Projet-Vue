<script setup lang="ts">
import Home from "@/components/Login.vue";
// import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <body>
    <Home variant="login" />
  </body>
</template>

<style lang="scss">
body {
  background-position: center;
  background-repeat: no-repeat;
}

img {
  border-style: none;
  width: 100vw;
  object-fit: cover;
  height: 100vh;
}
</style>
