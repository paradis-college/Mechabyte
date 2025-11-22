<script setup lang="ts">
defineProps<{
  columns?: 2 | 3 | 4;
}>();
</script>

<template>
  <div :class="['card-grid', `card-grid-${columns || 3}`]">
    <slot />
  </div>
</template>

<style scoped>
.card-grid {
  display: grid;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
}

.card-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

@media (min-width: 768px) {
  .card-grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

@media (min-width: 768px) {
  .card-grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

.card-grid-4 {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

@media (min-width: 768px) {
  .card-grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 767px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
