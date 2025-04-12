<template>
  <div class="dashboard">
    <Menu />
    <div class="content">
      <!-- Gráficas -->
      <div class="charts">
        <div class="chart-container">
          <ZoomableTimeseriesChart :data="chartData" :key="chartData.length" />
        </div>
        <div class="chart-container stacked-column-chart">
          <StackedColumnChart :data="graficaReportesData" />
        </div>
      </div>

      <!-- Tabla de transacciones -->
      <div class="transactions-table-container">
        <div class="table-header">
          <h2>Transacciones</h2>
          <button @click="openModal" class="add-transaction-button">
            Agregar Transacción
          </button>
        </div>
        <DataTable :data="formattedTableData" :headers="headers" />
      </div>

      <!-- Tabla de reportes -->
      <div class="reports-table-container">
        <div class="table-header">
          <h2>Reportes</h2>
        </div>
        <ReportesTable :data="reportesData" :headers="reportesHeaders" />
      </div>
    </div>

    <TransactionModal
      :isVisible="showModal"
      @close="showModal = false"
      @submit="handleTransaction"
    />
  </div>
</template>

<script>
import Menu from "@/components/MainMenu.vue";
import TransactionModal from "@/components/TransactionModal.vue";
import ReportesTable from "@/components/ReportesTable.vue";
import StackedColumnChart from "@/components/StackedColumnChart.vue";
import ZoomableTimeseriesChart from "@/components/ZoomableTimeseriesChart.vue";
import DataTable from "@/components/DataTable.vue";
import api from "@/api/api.js";
import { websocketService } from "@/api/webSocket";

export default {
  components: {
    Menu,
    TransactionModal,
    ReportesTable,
    StackedColumnChart,
    ZoomableTimeseriesChart,
    DataTable,
  },
  data() {
    return {
      showModal: false,
      tableData: [], // Aquí almacenamos los datos sin formatear
      formattedTableData: [], // Aquí almacenamos los datos formateados para la tabla
      chartData: [],
      headers: [
        "nombreUsuario",
        "rol",
        "metodoPago",
        "monto",
        "estatus",
        "fechaRegistro",
        "tipoTransaccion",
      ],

      reportesData: [
        {
          sucursal: "Sucursal A",
          mes: "Enero",
          ingresos: 10000,
          egresos: 5000,
          beneficio_neto: 5000,
          actividad: "Activo",
        },
      ],
      reportesHeaders: [
        "Sucursal",
        "Mes",
        "Ingresos",
        "Egresos",
        "Beneficio Neto",
        "Actividad",
      ],
      graficaReportesData: [{ mes: "Enero", ingresos: 10000, egresos: 5000 }],
    };
  },
  // watch: {
  //   // Observa los cambios en las transacciones recibidas por el WebSocket
  //   "websocketService.transactions": {
  //     handler(newVal) {
  //       console.log("🔄 Transacciones actualizadas desde WebSocket:", newVal); // Log los datos recibidos desde el WebSocket

  //       // Actualiza la tabla con las nuevas transacciones
  //       this.tableData = newVal;

  //       // Agregar un log justo después de actualizar la tabla
  //       console.log("📋 Tabla actualizada con los datos:", this.tableData);

  //       this.formatTableData(); // Formatea los datos de la tabla
  //       this.updateChartData(); // Actualiza la gráfica si es necesario
  //     },
  //     deep: true,
  //   },
  // },

  methods: {
    openModal() {
      this.showModal = true;
    },
    handleTransaction(transaction) {
      // Asegúrate de que los datos de la transacción sean completos
      const formattedTransaction = {
        ...transaction,
        nombre_usuario: transaction.nombre_usuario || "—", // Asegura que 'nombre_usuario' esté presente
        rol: transaction.rol || "—", // Asegura que 'rol' esté presente
        fecha_registro: transaction.fecha_registro
          ? new Date(transaction.fecha_registro).toLocaleString()
          : "—", // Asegura que 'fecha_registro' esté formateada correctamente
      };

      // Agrega la transacción formateada a la lista
      this.tableData.unshift(formattedTransaction);

      // Luego formatea la tabla con la nueva transacción
      this.formatTableData();
      this.updateChartData();
      this.showModal = false;
    },
    async fetchTransacciones() {
      try {
        const transacciones = await api.obtenerTransacciones();
        this.tableData = transacciones; // Guardamos las transacciones en tableData
        this.formatTableData(); // Formateamos los datos
        this.updateChartData(); // Actualizamos los datos de la gráfica
      } catch (error) {
        console.error("Error al obtener transacciones:", error);
      }
    },
    formatTableData() {
      console.log("🎯 Formateando los datos de la tabla...");
      this.formattedTableData = this.tableData.map((t) => {
        console.log("🔎 Transacción a formatear:", t);
        const formattedData = {
          nombreUsuario: t.nombre_usuario || "—",
          rol: t.rol || "—",
          metodoPago: t.metodo_pago || "—",
          monto:
            t.monto !== undefined && t.monto !== null
              ? `$${parseFloat(t.monto).toFixed(2)}`
              : "$0.00",
          estatus: t.estatus || "—",
          fechaRegistro: t.fecha_registro
            ? new Date(t.fecha_registro).toLocaleString()
            : "—",
          tipoTransaccion: t.tipo_transaccion || "—",
        };
        console.log("🟢 Datos formateados:", formattedData);

        return formattedData;
      });
    },
    updateChartData() {
      console.log("📊 Actualizando los datos de la gráfica...");
      this.chartData = this.tableData.map((t) => ({
        fecha: t.fecha_registro ? new Date(t.fecha_registro) : new Date(), // Asegúrate de convertir la fecha a formato Date
        monto: parseFloat(t.monto),
        tipoTransaccion: t.tipo_transaccion || "Desconocido",
      }));

      console.log("📊 Datos de la gráfica:", this.chartData); // Log para verificar los datos
    },
  },
  mounted() {
    this.fetchTransacciones(); // Datos iniciales
    websocketService.connect();

    websocketService.on("actualizar-transacciones", async () => {
      console.log("🔁 Señal de actualización recibida, recargando transacciones...");
      await this.fetchTransacciones(); // ✅ Recarga tabla y gráfica
    });
  },

  beforeUnmount() {
    websocketService.disconnect(); // Cerramos la conexión WebSocket al desmontar el componente
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 1100px; /* Ancho mínimo para la vista de escritorio */
  padding: 100px;
  height: calc(100vh - 60px); /* Ajusta la altura del contenido */
}

.add-transaction-button {
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-transaction-button:hover {
  background-color: #0056b3;
}

.charts {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.chart-container {
  background-color: #ffffff; /* Fondo blanco */
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra más suave */
  flex: 1;
  height: 340px; /* Ajusta la altura de cada gráfica */
}

/* Contenedor de la tabla de transacciones */
.transactions-table-container {
  background-color: #ffffff; /* Fondo blanco */
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra más suave */
  overflow-x: auto;
  transition: transform 0.3s ease;
  min-height: 600px; /* Altura mínima para la tabla de transacciones */
}

/* Contenedor de la tabla de reportes */
.reports-table-container {
  background-color: #ffffff; /* Fondo blanco */
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra más suave */
  overflow-x: auto;
  transition: transform 0.3s ease;
  min-height: 480px; /* Altura mínima para la tabla de reportes */
}

.transactions-table-container:hover,
.reports-table-container:hover {
  transform: scale(1.01);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

h2 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 0; /* Elimina el margen inferior para alinear mejor con el botón */
  color: #333333; /* Título en gris oscuro */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
  white-space: normal; /* Evita que el texto se rompa en varias líneas */
  overflow: hidden; /* Oculta el desbordamiento */
  text-overflow: ellipsis; /* Añade puntos suspensivos al texto desbordado */
}

th {
  background-color: #f4f4f4;
  cursor: pointer;
}
</style>
