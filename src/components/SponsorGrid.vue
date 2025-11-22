<script setup lang="ts">
import SponsorCard from './SponsorCard.vue';

export type Sponsor = {
  name: string;
  logo: string;
  descriptionEn: string;
  descriptionRo: string;
  isPrimary?: boolean;
};

defineProps<{
  sponsors: Sponsor[];
  language: 'en' | 'ro';
}>();
</script>

<template>
  <div class="sponsor-grid">
    <SponsorCard
      v-for="(sponsor, index) in sponsors"
      :key="index"
      :name="sponsor.name"
      :logo="sponsor.logo"
      :description="language === 'en' ? sponsor.descriptionEn : sponsor.descriptionRo"
      :is-primary="sponsor.isPrimary"
    />
  </div>
</template>

<style scoped>
.sponsor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
}

@media (max-width: 767px) {
  .sponsor-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
