<script setup lang="ts">
const props = defineProps<{
  problemTitle: string;
  problemDescription: string;
  solutionTitle: string;
  solutionDescription: string;
  iteration?: number;
}>();
</script>

<template>
  <div class="problem-solution-card">
    <div class="iteration-badge" v-if="iteration">
      <span>Iteration {{ iteration }}</span>
    </div>

    <div class="problem-section">
      <div class="section-header problem">
        <span class="icon">❌</span>
        <h4>{{ problemTitle }}</h4>
      </div>
      <p class="description">{{ problemDescription }}</p>
    </div>

    <div class="arrow-divider">
      <span>→</span>
    </div>

    <div class="solution-section">
      <div class="section-header solution">
        <span class="icon">✅</span>
        <h4>{{ solutionTitle }}</h4>
      </div>
      <p class="description">{{ solutionDescription }}</p>
    </div>
  </div>
</template>

<style scoped>
.problem-solution-card {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2vw;
  background: rgba(0, 0, 0, 0.3);
  border: 0.15vw solid rgba(0, 255, 0, 0.2);
  border-radius: 0.5vw;
  padding: 2vw;
  margin: 2vw 0;
  position: relative;
}

.iteration-badge {
  position: absolute;
  top: -0.8vw;
  left: 50%;
  transform: translateX(-50%);
  background: var(--mechabyte-green);
  color: #000;
  padding: 0.3vw 1vw;
  border-radius: 1vw;
  font-size: 0.8vw;
  font-weight: 700;
}

.problem-section,
.solution-section {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.8vw;
  margin-bottom: 0.5vw;
}

.section-header .icon {
  font-size: 1.5vw;
}

.section-header h4 {
  font-size: 1.2vw;
  margin: 0;
}

.section-header.problem h4 {
  color: #ff6b6b;
}

.section-header.solution h4 {
  color: var(--mechabyte-green);
}

.description {
  font-size: 0.95vw;
  line-height: 1.6;
  color: #ddd;
}

.arrow-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3vw;
  color: var(--mechabyte-green);
  font-weight: 700;
}

@media only screen and (max-width: 1000px) {
  .problem-solution-card {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
    border: 2px solid rgba(0, 255, 0, 0.2);
  }

  .iteration-badge {
    top: -12px;
    padding: 4px 12px;
    font-size: 11px;
  }

  .section-header .icon {
    font-size: 20px;
  }

  .section-header h4 {
    font-size: 16px;
  }

  .description {
    font-size: 14px;
  }

  .arrow-divider {
    font-size: 30px;
    transform: rotate(90deg);
  }
}
</style>
