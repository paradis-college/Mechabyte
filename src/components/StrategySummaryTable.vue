<script setup lang="ts">
const props = defineProps<{
  summary: Array<{
    period: string;
    mandatory: string[];
    optional: string[];
    scoring: string;
  }>;
}>();
</script>

<template>
  <div class="strategy-summary-table">
    <table>
      <thead>
        <tr>
          <th>Game Period</th>
          <th>Mandatory Tasks</th>
          <th>Optional Tasks</th>
          <th>Scoring</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in summary" :key="index">
          <td class="period-cell">{{ row.period }}</td>
          <td class="tasks-cell">
            <ul>
              <li v-for="(task, i) in row.mandatory" :key="i">{{ task }}</li>
            </ul>
          </td>
          <td class="tasks-cell">
            <ul v-if="row.optional.length > 0">
              <li v-for="(task, i) in row.optional" :key="i">{{ task }}</li>
            </ul>
            <span v-else class="no-tasks">-</span>
          </td>
          <td class="scoring-cell">{{ row.scoring }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.strategy-summary-table {
  width: 100%;
  overflow-x: auto;
  margin: 2vw 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: var(--background-grey);
  border: 0.15vw solid var(--mechabyte-green);
}

thead {
  background: rgba(0, 255, 0, 0.1);
}

th {
  color: var(--mechabyte-green);
  padding: 1vw;
  text-align: left;
  font-size: 1.1vw;
  font-weight: 600;
  border: 0.1vw solid var(--mechabyte-green);
}

td {
  padding: 1vw;
  border: 0.1vw solid rgba(0, 255, 0, 0.3);
  font-size: 1vw;
  vertical-align: top;
}

.period-cell {
  color: var(--mechabyte-green);
  font-weight: 600;
  min-width: 120px;
}

.tasks-cell {
  color: #fff;
}

.tasks-cell ul {
  margin: 0;
  padding-left: 1.5vw;
  list-style: disc;
}

.tasks-cell li {
  margin-bottom: 0.3vw;
}

.no-tasks {
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}

.scoring-cell {
  color: var(--mechabyte-green);
  font-weight: 600;
  text-align: center;
  min-width: 100px;
}

@media only screen and (max-width: 1000px) {
  table {
    border: 2px solid var(--mechabyte-green);
  }

  th {
    padding: 12px;
    font-size: 14px;
    border: 1px solid var(--mechabyte-green);
  }

  td {
    padding: 12px;
    font-size: 13px;
    border: 1px solid rgba(0, 255, 0, 0.3);
  }

  .tasks-cell ul {
    padding-left: 20px;
  }

  .tasks-cell li {
    margin-bottom: 5px;
  }
}
</style>
