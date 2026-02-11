<script setup lang="ts">
const props = defineProps<{
  season: "centerstage" | "into-the-deep";
}>();

const centerstageLayout = [
  { function: "Drive & strafe", driver1: "✔", driver2: "" },
  { function: "Rotate", driver1: "✔", driver2: "" },
  { function: "Raise/Lower arm", driver1: "✔", driver2: "✔ (secondary)" },
  { function: "Open/Close intake", driver1: "", driver2: "✔" },
  { function: "Arm/Release drone launcher", driver1: "✔", driver2: "" },
];

const intoTheDeepLayout = [
  { function: "Drive & strafe", driver1: "✔", driver2: "" },
  { function: "Rotate", driver1: "✔", driver2: "" },
  { function: "Extend/retract slider", driver1: "", driver2: "✔" },
  { function: "Raise/lower intake", driver1: "", driver2: "✔" },
  { function: "Open/close intake & out-take", driver1: "", driver2: "✔" },
];

const layout =
  props.season === "centerstage" ? centerstageLayout : intoTheDeepLayout;
</script>

<template>
  <div class="driver-control-table">
    <table>
      <thead>
        <tr>
          <th>Function</th>
          <th>Driver 1</th>
          <th>Driver 2</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in layout" :key="index">
          <td class="function-name">{{ row.function }}</td>
          <td class="driver-cell">{{ row.driver1 }}</td>
          <td class="driver-cell">{{ row.driver2 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.driver-control-table {
  width: 100%;
  overflow-x: auto;
  margin: 1.5vw 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: var(--background-grey);
  border: 0.1vw solid var(--mechabyte-green);
}

thead {
  background: var(--dark-grey);
}

th {
  color: var(--mechabyte-green);
  padding: 1vw;
  text-align: left;
  font-size: 1.1vw;
  font-weight: 600;
  border-bottom: 0.2vw solid var(--mechabyte-green);
}

td {
  padding: 0.8vw 1vw;
  border-bottom: 0.05vw solid rgba(0, 255, 0, 0.2);
  font-size: 1vw;
}

tr:last-child td {
  border-bottom: none;
}

tbody tr:hover {
  background: rgba(0, 255, 0, 0.05);
}

.function-name {
  color: #fff;
  font-weight: 500;
}

.driver-cell {
  color: var(--mechabyte-green);
  text-align: center;
  font-weight: 500;
}

@media only screen and (max-width: 1000px) {
  table {
    border: 1px solid var(--mechabyte-green);
  }

  th {
    padding: 12px;
    font-size: 14px;
    border-bottom: 2px solid var(--mechabyte-green);
  }

  td {
    padding: 10px 12px;
    font-size: 13px;
    border-bottom: 1px solid rgba(0, 255, 0, 0.2);
  }
}
</style>
