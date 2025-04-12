<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>{{ isEdit ? "Actualizar Sucursal" : "Registrar Sucursal" }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="sucursal.Nombre" required />
        </div>

        <div class="form-group">
          <label for="direccion">Dirección:</label>
          <input type="text" id="direccion" v-model="sucursal.Direccion" required />
        </div>

        <div class="form-group">
          <label for="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            v-model="sucursal.Telefono"
            required
            pattern="[0-9]{10}"
            title="Ingrese un número de 10 dígitos"
          />
        </div>

        <div class="form-group">
          <label for="email">Correo:</label>
          <input
            type="email"
            id="correo"
            v-model="sucursal.Correo_Electronico"
            required
            title="Ingrese un correo válido"
          />
        </div>

        <div class="form-group">
          <label for="gerenteEncargado">Gerente Encargado:</label>
          <input
            type="text"
            id="gerenteEncargado"
            v-model="busquedaGerente"
            placeholder="Buscar gerente..."
            @input="buscarGerente"
            class="input"
          />
          <ul v-if="gerentesFiltrados.length > 0" class="search-results">
            <li
              v-for="gerente in gerentesFiltrados"
              :key="gerente.id"
              @click="seleccionarGerente(gerente)"
              class="search-item"
            >
              {{ gerente.nombre_usuario }}
            </li>
          </ul>
        </div>

        <div class="form-group">
          <label for="capacidadMaxima">Capacidad Máxima:</label>
          <input
            type="number"
            id="capacidadMaxima"
            v-model.number="sucursal.Capacidad_Maxima"
            min="1"
            required
          />
        </div>

        <div class="form-actions">
          <button type="button" @click="closeModal">Cancelar</button>
          <button type="submit">{{ isEdit ? "Actualizar" : "Registrar" }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../api/api.js";

export default {
  props: {
    isVisible: Boolean,
    isEdit: Boolean,
    sucursalData: Object,
  },
  data() {
    return {
      sucursal: {
        Nombre: "",
        Direccion: "",
        Telefono: "",
        Correo_Electronico: "",
        Responsable_Id: 0,
        Capacidad_Maxima: 0,
        Estatus: "Activa",
      },
      busquedaGerente: "", // Campo para mostrar el nombre del gerente en el buscador
      gerentes: [],
      gerentesFiltrados: [],
    };
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.resetForm();
        if (this.isEdit && this.sucursalData) {
          this.cargarDatosEdicion();
        }
        this.cargarGerentes();
      }
    },
  },
  methods: {
    async cargarGerentes() {
      try {
        const gerentes = await api.obtenerGerentes();
        this.gerentes = gerentes;
      } catch (error) {
        console.error("Error al cargar gerentes:", error);
      }
    },
    buscarGerente() {
      const query = this.busquedaGerente.toLowerCase();
      this.gerentesFiltrados = this.gerentes.filter((gerente) =>
        gerente.nombre_usuario.toLowerCase().includes(query)
      );
    },
    seleccionarGerente(gerente) {
      this.sucursal.Responsable_Id = gerente.id;
      this.busquedaGerente = gerente.nombre_usuario;
      this.gerentesFiltrados = [];
    },
    cargarDatosEdicion() {
      // Cargar los datos de la sucursal en el formulario
      this.sucursal = {
        id: this.sucursalData.id,
        Nombre: this.sucursalData.Nombre,
        Direccion: this.sucursalData.Direccion,
        Telefono: this.sucursalData.Telefono || "",
        Correo_Electronico: this.sucursalData.Correo_Electronico || "",
        Responsable_Id: this.sucursalData.Responsable_Id,
        Capacidad_Maxima: this.sucursalData.Capacidad_Maxima,
        Estatus: this.sucursalData.Estatus,
      };

      // Buscar el nombre del gerente basado en el Responsable_Id
      const gerente = this.gerentes.find(
        (g) => g.id === this.sucursalData.Responsable_Id
      );
      if (gerente) {
        this.busquedaGerente = gerente.nombre_usuario; // Mostrar el nombre del gerente en el buscador
      } else {
        this.busquedaGerente = ""; // Si no se encuentra, dejar vacío
      }
    },
    closeModal() {
      this.$emit("close");
    },
    async submitForm() {
      if (!this.validarFormulario()) {
        return;
      }

      const datosParaEnviar = {
        id: this.sucursal.id,
        Nombre: this.sucursal.Nombre.trim(),
        Direccion: this.sucursal.Direccion.trim(),
        Telefono: this.sucursal.Telefono.trim(),
        Correo_Electronico: this.sucursal.Correo_Electronico.trim(),
        Responsable_Id: parseInt(this.sucursal.Responsable_Id, 10),
        Capacidad_Maxima: parseInt(this.sucursal.Capacidad_Maxima, 10),
        Estatus: this.sucursal.Estatus,
      };

      console.log("Datos enviados al backend:", datosParaEnviar);

      try {
        if (this.isEdit) {
          this.$emit("editar", datosParaEnviar); // Emitir evento para edición
        } else {
          this.$emit("crear", datosParaEnviar); // Emitir evento para creación
        }
        this.closeModal();
      } catch (error) {
        console.error("Error al guardar sucursal:", error.response?.data || error);
        this.$emit("error", "Error al guardar la sucursal");
      }
    },
    validarFormulario() {
      const errores = [];

      if (!this.sucursal.Nombre?.trim()) errores.push("El nombre es requerido");
      if (!this.sucursal.Direccion?.trim()) errores.push("La dirección es requerida");
      if (!this.sucursal.Telefono?.trim()) errores.push("El teléfono es requerido");
      if (!this.sucursal.Correo_Electronico?.trim())
        errores.push("El correo electrónico es requerido");
      if (!this.sucursal.Responsable_Id)
        errores.push("Debe seleccionar un gerente responsable");
      if (!this.sucursal.Capacidad_Maxima || this.sucursal.Capacidad_Maxima <= 0)
        errores.push("La capacidad máxima debe ser mayor a 0");

      if (errores.length > 0) {
        alert(errores.join("\n"));
        return false;
      }

      return true;
    },
    resetForm() {
      this.sucursal = {
        Nombre: "",
        Direccion: "",
        Telefono: "",
        Correo_Electronico: "",
        Responsable_Id: 0,
        Capacidad_Maxima: 0,
        Estatus: "Activa",
      };
      this.busquedaGerente = "";
      this.gerentesFiltrados = [];
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.close:hover {
  color: #333;
}

h2 {
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #2c3e50;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.search-results {
  list-style: none;
  padding: 0;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
}

.search-item {
  padding: 8px 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.search-item:hover {
  background-color: #f5f5f5;
}

.search-item:last-child {
  border-bottom: none;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.form-actions button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Botón Cancelar (rojo) */
.form-actions button:first-child {
  background-color: #e74c3c;
  color: white;
}

.form-actions button:first-child:hover {
  background-color: #c0392b;
}

/* Botón Registrar/Actualizar (azul marino) */
.form-actions button:last-child {
  background-color: #2c3e50;
  color: white;
}

.form-actions button:last-child:hover {
  background-color: #1a252f;
}

textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

/* Estilos para validación */
input:invalid {
  border-color: #e74c3c;
}

input:valid {
  border-color: #2ecc71;
}
</style>
