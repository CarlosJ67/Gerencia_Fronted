<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Nueva Transacción</h2>
      <div class="form-container">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="tipoTransaccion">Tipo de Transacción</label>
            <select
              id="tipoTransaccion"
              v-model="form.tipoTransaccion"
              @change="handleTransactionTypeChange"
              required
            >
              <option value="Ingreso">Ingreso</option>
              <option value="Egreso">Egreso</option>
            </select>
          </div>

          <div class="form-group">
            <label for="rol">Rol</label>
            <select id="rol" v-model="form.rol" @change="fetchUsuarios" required>
              <option v-if="form.tipoTransaccion === 'Ingreso'" value="Cliente">
                Cliente
              </option>
              <option v-if="form.tipoTransaccion === 'Ingreso'" value="Visitante">
                Visitante
              </option>
              <option v-if="form.tipoTransaccion === 'Egreso'" value="Colaborador">
                Colaborador
              </option>
            </select>
          </div>

          <div class="form-group" v-if="form.rol !== 'Visitante'">
            <label for="nombreUsuario">Buscar Usuario</label>
            <input
              list="usuariosList"
              type="text"
              id="nombreUsuario"
              v-model="searchQuery"
              @input="filterUsuarios"
              placeholder="Escribe para buscar un usuario"
              autocomplete="off"
              required
            />
            <datalist id="usuariosList">
              <option
                v-for="usuario in filteredUsuarios"
                :key="usuario.usuario_id"
                :value="usuario.nombre_usuario"
              >
                {{ usuario.nombre_usuario }} ({{ usuario.rol }})
              </option>
            </datalist>
          </div>

          <div class="form-group">
            <label for="metodoPago">Método de Pago</label>
            <select id="metodoPago" v-model="form.metodoPago" required>
              <option value="TarjetaDebito">Tarjeta de Débito</option>
              <option value="TarjetaCredito">Tarjeta de Crédito</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>

          <div class="form-group">
            <label for="monto">Monto</label>
            <input type="number" id="monto" v-model="form.monto" min="0" required />
          </div>

          <div class="form-group">
            <label for="detalles">Detalles</label>
            <input type="text" id="detalles" v-model="form.detalles" required />
          </div>

          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      form: {
        rol: "",
        nombreUsuario: "", // Aquí se guardará el user_id
        metodoPago: "",
        monto: "",
        detalles: "",
        estatus: "Procesando",
        tipoTransaccion: "Ingreso",
      },
      usuarios: [], // Lista completa de usuarios
      filteredUsuarios: [],
      searchQuery: "",
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async fetchUsuarios() {
      if (this.form.rol && this.form.rol !== "Visitante") {
        try {
          const response = await api.obtenerUsuariosPorTransaccion(
            this.form.tipoTransaccion,
            this.form.rol
          );
          if (response.length === 0) {
            alert("No se encontraron usuarios para este rol y tipo de transacción.");
          }
          console.log("Usuarios obtenidos:", response);
          this.usuarios = response;
        } catch (error) {
          console.error("Error al cargar usuarios:", error);
          this.usuarios = [];
          alert("Error al obtener los usuarios.");
        }
      } else {
        this.usuarios = [];
      }
    },
    filterUsuarios() {
      const query = this.searchQuery.toLowerCase();
      this.filteredUsuarios = this.usuarios.filter((usuario) =>
        usuario.nombre_usuario.toLowerCase().includes(query)
      );
    },
    async submitForm() {
      try {
        const usuario = this.usuarios.find((u) => u.nombre_usuario === this.searchQuery);
        if (!usuario && this.form.rol !== "Visitante") {
          alert("Por favor selecciona un usuario válido.");
          return;
        }

        const monto = parseFloat(this.form.monto);
        if (isNaN(monto) || monto <= 0) {
          alert("Por favor ingresa un monto válido.");
          return;
        }

        const transaccionData = {
          tipo_transaccion: this.form.tipoTransaccion,
          usuario_id: usuario ? usuario.usuario_id : null,
          metodo_pago: this.form.metodoPago,
          monto: monto,
          detalles: this.form.detalles,
          estatus: this.form.estatus,
        };

        console.log("Datos a enviar:", transaccionData);

        const response = await api.registrarTransaccion(transaccionData);
        console.log("Transacción registrada:", response);

        this.$emit("submit", transaccionData);
        this.closeModal();
      } catch (error) {
        console.error("Error al registrar transacción:", error);
        alert("Hubo un error al registrar la transacción.");
      }
    },
    handleTransactionTypeChange() {
      this.form.rol = "";
      this.usuarios = [];
      this.filteredUsuarios = [];
      this.searchQuery = "";
      this.fetchUsuarios(); // Asegurarnos de cargar usuarios al cambiar tipo de transacción
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
  max-height: 90%;
  overflow-y: auto;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.form-container {
  max-height: 70vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 15px;
  position: relative; /* Añadido para posicionar correctamente la lista de autocompletado */
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd; /* Añadido para mejor visibilidad */
  border-radius: 4px; /* Añadido para consistencia */
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%; /* Hacer que el botón ocupe todo el ancho */
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}

.autocomplete-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ddd;
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
  position: absolute;
  width: calc(100% - 2px); /* Ajuste para considerar el borde */
  z-index: 1000;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  top: 100%; /* Posiciona la lista justo debajo del input */
  left: 0;
}

.autocomplete-item {
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.autocomplete-item:last-child {
  border-bottom: none;
}

.autocomplete-item:hover {
  background-color: #f4f4f4;
}

/* Estilos adicionales para mejor visualización */
#nombreUsuario {
  width: calc(100% - 18px); /* Ajuste para padding y bordes */
}

/* Media query para pantallas pequeñas */
@media (max-width: 480px) {
  .modal-content {
    width: 95%;
    padding: 15px;
  }

  .form-group input,
  .form-group select {
    padding: 10px;
  }
}
</style>
