<template>
  <BaseCard>
    <div style="height: 300px;">
      <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
  </BaseCard>
</template>

<script setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = ref({
  labels: ['January', 'February', 'March'],
  datasets: [{ label: 'Prodeje', data: [40, 20, 12] }],
});

const chartOptions = ref({
  responsive: true,
});
</script>