<script setup lang="ts">
import { computed } from 'vue';

import Silhouette from './icons/Silhouette.vue';

const props = defineProps({
  memberName: {
    default: "John D.",
    type: String
  },
  department: {
    default: "Department",
    type: String
  },
  role: {
    default: "",
    type: String
  }
});
</script>

<template>
  <div :id="`team-member-card-${props.memberName.toLowerCase()}`" class="team-member-card">
    <div class="card-photo-container">
      <img v-if="props.memberName == 'Șerban'" src="../assets/images/Serban.jpeg" />
      <img v-else-if="props.memberName == 'David'" src="../assets/images/David.jpeg" />
      <Silhouette v-else class="silhouette" />
    </div>
    <em class="team-member-name">{{ props.memberName }}</em>
    <p class="team-member-department">{{ props.department }}</p>
    <p v-if="props.role" class="team-member-role">{{ props.role }}</p>
  </div>
</template>

<style scoped>
.team-member-card {
  display: inline-flex;
  padding: 5px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.card-photo-container {
  display: flex;
  width: 200px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 0.05vw solid var(--mechabyte-green);
  background: var(--mechabyte-grey);
  cursor: pointer;
}

.card-photo-container:hover {
  box-shadow: 0 0 0.5vw 0.1vw var(--mechabyte-green);
}

img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
}

.silhouette {
  width: 100px;
  height: 114px;
}

.team-member-name {
  color: var(--mechabyte-green);
}

.team-member-role {
  color: var(--mechabyte-green);
  font-size: 0.9em;
  margin-top: -5px;
}
</style>