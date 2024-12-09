<script setup lang="ts">
defineProps<{
  value: string;
  text: string;
}>();
</script>

<template>
  <span class="stat__value">{{ value }}</span>
  <span class="stat__text">{{ text }}</span>
</template>

<style lang="scss">
.stat__value {
  font-size: 1.5rem;
  font-weight: 700;
}

.stat__text {
  font-size: 0.9rem;
  color: #f0f0f0;
}
</style>
