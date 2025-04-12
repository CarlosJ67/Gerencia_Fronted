<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

export default {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
    chartType: {
      type: String,
      default: 'line',
    },
  },
  setup(props) {
    const chartCanvas = ref(null);
    let chartInstance = null;

    const renderChart = () => {
      if (chartInstance) {
        chartInstance.destroy(); // 🔴 Destruye el gráfico anterior antes de crear uno nuevo
      }
      if (chartCanvas.value) {
        const ctx = chartCanvas.value.getContext('2d');
        chartInstance = new Chart(ctx, {
          type: props.chartType,
          data: props.chartData,
          options: props.chartOptions,
        });
      }
    };

    onMounted(() => {
      Chart.register(...registerables);
      renderChart();
    });

    watch(() => props.chartData, renderChart, { deep: true });

    return {
      chartCanvas,
    };
  },
};
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: auto;
}
</style>
