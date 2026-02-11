<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
  level?: 1 | 2;
}>();
</script>

<template>
  <div class="section-header centered-header">
    <h1 v-if="level === 1 || !level" class="section-title">{{ title }}</h1>
    <h2 v-else class="section-title">{{ title }}</h2>
    <p v-if="subtitle" class="section-subtitle muted-subtitle">
      {{ subtitle }}
    </p>
  </div>
</template>

<style scoped>
.section-header {
  margin: 2rem 0;
  text-align: center;
}

.section-title {
  margin-bottom: 0.5rem;
}

.section-subtitle {
  margin-top: 0.5rem;
  font-style: italic;
}
</style>
