<template>
  <Menu />
  <div class="reportes-container">
    <div class="reporte-form">
      <h2>{{ isEditing ? 'Editar Reporte' : 'Crear Nuevo Reporte' }}</h2>
      <form @submit.prevent="saveReporte" class="form">
        <div class="form-group">
          <label for="tipo">Tipo de Reporte:</label>
          <select v-model="currentReporte.tipo" id="tipo" required class="input">
            <option value="asistencia">Asistencia</option>
            <option value="ventas">Ventas</option>
            <option value="inventario">Inventario</option>
          </select>
        </div>
        <div class="form-group">
          <label for="fecha">Fecha:</label>
          <input type="date" v-model="currentReporte.fecha" id="fecha" required class="input" />
        </div>
        <div class="form-group">
          <label for="descripcion">Descripción:</label>
          <textarea v-model="currentReporte.descripcion" id="descripcion" required class="input"></textarea>
        </div>
        <div class="form-group">
          <label for="valor">Valor:</label>
          <input type="number" v-model="currentReporte.valor" id="valor" required class="input" />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">{{ isEditing ? 'Actualizar' : 'Guardar' }}</button>
          <button type="button" @click="cancelEdit" class="btn btn-secondary" v-if="isEditing">Cancelar</button>
        </div>
      </form>
    </div>

    <div class="reportes-table">
      <h2>Lista de Reportes</h2>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Valor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(reporte, index) in reportes" :key="index">
            <td>{{ reporte.tipo }}</td>
            <td>{{ reporte.fecha }}</td>
            <td>{{ reporte.descripcion }}</td>
            <td>{{ reporte.valor }}</td>
            <td>
              <button @click="editReporte(index)" class="btn btn-edit">Editar</button>
              <button @click="deleteReporte(index)" class="btn btn-delete">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/MainMenu.vue';

export default {
  components: { Menu },
  name: 'ReportesView',
  data() {
    return {
      reportes: [],
      currentReporte: {
        tipo: '',
        fecha: '',
        descripcion: '',
        valor: 0,
      },
      isEditing: false,
      editIndex: null,
    };
  },
  methods: {
    saveReporte() {
      if (this.isEditing) {
        this.reportes[this.editIndex] = { ...this.currentReporte };
      } else {
        this.reportes.push({ ...this.currentReporte });
      }
      this.resetForm();
    },
    editReporte(index) {
      this.currentReporte = { ...this.reportes[index] };
      this.isEditing = true;
      this.editIndex = index;
    },
    deleteReporte(index) {
      this.reportes.splice(index, 1);
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.currentReporte = {
        tipo: '',
        fecha: '',
        descripcion: '',
        valor: 0,
      };
      this.isEditing = false;
      this.editIndex = null;
    },
  },
};
</script>

<style scoped>
.reportes-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center; /* Centrado vertical */
  gap: 40px;
  padding-top: 150px;
  padding-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
}

.reporte-form, .reportes-table {
  background-color: #33302a59;
  padding: 30px;
  border-radius: 10px;
  color: #fff;
  flex: 1;
  max-width: 30%;

  /* Efecto de brillo */
  /* box-shadow: 
    0 0 15px rgba(255, 84, 84, 0.8), 
    0 0 30px rgba(255, 255, 255, 0.5), 
    0 0 50px rgba(255, 255, 255, 0.3);  */
}


.reportes-table {
  max-width: 50%; /* Tabla más grande */
  overflow-x: auto;
}

.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  background-color: #333;
  border: 1px solid #f44343;
  border-radius: 5px;
  color: white;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #f44343;
  color: white;
}

.btn-primary:hover {
  background-color: #d62c1a;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

th, td {
  padding: 14px; /* Espaciado un poco mayor */
  text-align: left;
  border-bottom: 1px solid #444;
}

th {
  background-color: #f44343;
}

tr:hover {
  background-color: #292929;
}

@media (max-width: 768px) {
  .reportes-container {
    flex-direction: column;
    align-items: center;
  }

  .reporte-form, .reportes-table {
    width: 90%;
  }
}
</style>

