<script setup lang="ts">
import type { NuxtError } from "#app";

// const props = defineProps({
//   error: Object as () => NuxtError,
// });

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div v-if="error" class="p-error">
    <h1>Ma page d'erreur {{ error.statusCode }} personnalisé</h1>
    {{ NuxtError }}
    Message d'erreur : {{ error.statusMessage }}
    <Button @click="handleError">Retourner à l'accueil</Button>
  </div>
</template>

<style scoped>
.p-error {
  text-align: center;
}
</style>
