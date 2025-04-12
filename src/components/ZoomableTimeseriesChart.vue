<template>
  <div id="chart" v-if="chartReady && series.length > 0">
    <ApexChart :key="chartKey" type="pie" :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { websocketService } from "@/api/webSocket";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "SimplePieChart",
  components: {
    ApexChart: VueApexCharts,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const chartKey = ref(0);
    const chartReady = ref(false);
    const localData = ref([...props.data]);

    // Agrupamos los datos por tipo de transacción y sumamos el monto
    const groupedData = computed(() => {
      if (!localData.value || localData.value.length === 0) {
        console.warn("⚠️ No hay datos disponibles para agrupar. ");
        return {};
      }

      return localData.value.reduce((acc, item) => {
        const tipo = item.tipoTransaccion || "Sin tipo"; // Maneja casos donde no haya tipo
        const monto = parseFloat(item.monto); // Asegúrate de que monto sea un número

        // Verificar que monto sea un número válido
        if (!isNaN(monto)) {
          acc[tipo] = (acc[tipo] || 0) + monto;
        }

        return acc;
      }, {});
    });

    const series = computed(() => {
      return Object.values(groupedData.value).map((value) => parseFloat(value));
    });

    const labels = computed(() => {
      return Object.keys(groupedData.value);
    });

    const chartOptions = computed(() => ({
      chart: {
        type: "pie",
        height: 400,
        width: 400,
        animations: { enabled: true },
      },
      labels: labels.value,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: "100%", height: 300 },
            legend: { position: "bottom" },
          },
        },
      ],
    }));

    // --- WebSocket Listener ---
    watch(
      () => websocketService.transactions,
      async (newVal) => {
        console.log("🟡 Nuevos datos desde WebSocket:", newVal);

        if (Array.isArray(newVal) && newVal.length > 0) {
          localData.value = [...newVal]; // Actualizamos los datos locales
          console.log("Datos locales antes de pasar a la gráfica:", localData.value);

          chartKey.value = Date.now(); // Forzar rerender
          await nextTick(); // Asegurarse de que el DOM esté actualizado
          chartReady.value = true; // Activar la gráfica
          console.log("🟢 Datos cargados en gráfica (watch)");
        } else {
          console.warn("⚠️ WebSocket aún no tiene datos válidos");
          chartReady.value = false; // Desactivar la gráfica si no hay datos válidos
        }
      },
      { immediate: true }
    );

    // --- On Mounted ---
    onMounted(async () => {
      console.log("🔵 Montando gráfica...");
      console.log("🟡 Datos iniciales:", props.data); // Verifica los datos que se reciben como prop

      // Asegúrate de que los datos recibidos no estén vacíos
      if (Array.isArray(props.data) && props.data.length > 0) {
        localData.value = [...props.data];
        chartKey.value = Date.now(); // Forzar rerender
        await nextTick();
        chartReady.value = true; // Activar la gráfica
        console.log("🟢 Datos cargados en gráfica (onMounted)");
      } else {
        console.warn("⚠️ No hay datos disponibles al montar el componente.");
        chartReady.value = false;
      }
    });

    // Logs adicionales para depuración
    watch(
      () => groupedData.value,
      (newGroupedData) => {
        console.log("🔍 Datos agrupados:", newGroupedData);
        console.log("📊 Datos de la gráfica:", series.value);
        console.log("📝 Etiquetas de la gráfica:", labels.value);
      },
      { immediate: true }
    );

    return {
      series,
      chartOptions,
      chartKey,
      chartReady,
    };
  },
};
</script>

<style scoped>
#chart {
  width: 90%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
