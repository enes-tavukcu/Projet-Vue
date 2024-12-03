<script setup lang="ts">
definePageMeta({ layout: "minimal" });
</script>

<template>
  <body>
    <login variant="signup" />
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
