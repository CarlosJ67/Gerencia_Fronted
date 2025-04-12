<template>
  <div class="register">
    <ToastMessage 
      ref="toast" 
      @close-and-redirect="handleRedirect"
    />
    <div class="register-container">
      <img src="../assets/logo.png" alt="Gym Bulls Logo" class="logo">
      <h2>Registrar Persona</h2>
      <form @submit.prevent="register" class="form-scroll">
        <!-- Título de Cortesía -->
        <div class="form-group">
          <label for="titulo_cortesia">Título de Cortesía</label>
          <select id="titulo_cortesia" v-model="user.titulo_cortesia" >
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="Sra.">Sra.</option>
            <option value="Srita.">Srita.</option>
            <option value="Dra.">Dra.</option>
            <option value="Mtra.">Mtra.</option>
            <option value="Profra.">Profra.</option>
            <option value="C.">C.</option>
            <option value="C.P.">C.P.</option>
            <option value="Med.">Med.</option>
            <option value="LAE">LAE</option>
            <option value="Sr.">Sr.</option>
            <option value="Joven.">Joven.</option>
            <option value="Dr.">Dr.</option>
            <option value="Mtr.">Mtr.</option>
            <option value="Lic.">Lic.</option>
            <option value="Profr.">Profr.</option>
          </select>
        </div>

        <!-- Nombre Completo -->
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" v-model="user.nombre" required />
        </div>

        <!-- Primer Apellido -->
        <div class="form-group">
          <label for="primer_apellido">Primer Apellido</label>
          <input type="text" id="primer_apellido" v-model="user.primer_apellido" required />
        </div>

        <!-- Segundo Apellido -->
        <div class="form-group">
          <label for="segundo_apellido">Segundo Apellido</label>
          <input type="text" id="segundo_apellido" v-model="user.segundo_apellido" required />
        </div>

        <!-- Correo Electrónico -->
        <div class="form-group">
          <label for="correo_electronico">Correo Electrónico</label>
          <input type="email" id="correo_electronico" v-model="user.correo_electronico" required />
        </div>

        <!-- Contraseña -->
        <div class="form-group">
          <label for="contraseña">Contraseña</label>
          <input type="password" id="contrasena" v-model="user.contrasena" required />
        </div>

        <!-- Número Telefónico -->
        <div class="form-group">
          <label for="numero_telefonico">Número Telefónico</label>
          <input type="text" id="numero_telefonico" v-model="user.numero_telefonico" required />
        </div>

        <!-- Tipo de Sangre -->
        <div class="form-group">
          <label for="tipo_sangre">Tipo de Sangre</label>
          <select id="tipo_sangre" v-model="user.tipo_sangre" required>
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="A_POSITIVO">A+</option>
            <option value="A_NEGATIVO">A-</option>
            <option value="B_POSITIVO">B+</option>
            <option value="B_NEGATIVO">B-</option>
            <option value="AB_POSITIVO">AB+</option>
            <option value="AB_NEGATIVO">AB-</option>
            <option value="O_POSITIVO">O+</option>
            <option value="O_NEGATIVO">O-</option>
          </select>
        </div>

        <!-- Género -->
        <div class="form-group">
          <label for="genero">Género</label>
          <select id="genero" v-model="user.genero" required>
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="H">Hombre</option>
            <option value="M">Mujer</option>
            <option value="NB">No Binario</option>
          </select>
        </div>

        <!-- Fecha de Nacimiento -->
        <div class="form-group">
          <label for="fecha_nacimiento">Fecha de Nacimiento</label>
          <input type="date" id="fecha_nacimiento" v-model="user.fecha_nacimiento" required />
        </div>

        <!-- Fotografía -->
        <div class="form-group">
          <label for="fotografia">Fotografía</label>
          <input type="file" id="fotografia" @change="handleFileUpload" accept="image/*" />
        </div>

        <!-- Botón de Registrar -->
        <button type="submit">Registrar</button>
      </form>
      <p>¿Ya tienes una cuenta? <router-link to="/login">Inicia sesión</router-link></p>
    </div>
  </div>
</template>

<script>
import api from "../api/api.js";
import ToastMessage from "../components/ToastMessage.vue";

export default {
  components: {
    ToastMessage
  },
  data() {
    return {
      user: {
        nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        correo_electronico: "",
        contrasena: "",
        numero_telefonico: "",
        tipo_sangre: "",
        genero: "",
        fecha_nacimiento: "",
        titulo_cortesia: "",
      },
      fotografia: null,
    };
  },
  methods: {
    handleFileUpload(event) {
    this.fotografia = event.target.files[0];
  },
  handleRedirect(path) {
    this.$router.push(path);
  },
    async register() {
  try {
    const personData = { ...this.user, estatus: "Activo" };

    if (this.fotografia) {
      const formData = new FormData();
      Object.keys(personData).forEach((key) => {
        formData.append(key, personData[key]);
      });
      formData.append("fotografia", this.fotografia);

      const response = await api.registerPersonas(formData);
      this.$refs.toast.showToast(
        `✅ Registro exitoso: ${response.nombre_usuario}`,
        'success',
        {
          redirectOnClose: true,
          redirectTo: '/login'
        }
      );
    } else {
      const response = await api.registerPersonas(personData);
      this.$refs.toast.showToast(
        `✅ Registro exitoso, tu usuario es: ${response.nombre_usuario}`,
        'success',
        {
          redirectOnClose: true,
          redirectTo: '/login'
        }
      );
    }
  } catch (error) {
    console.error("Error en el registro:", error);
    this.$refs.toast.showToast(
      `❌ Error: ${error.response?.data?.detail || "Por favor verifica tus datos"}`,
      'error'
    );
  }
},
  },
};
</script>

<style scoped>
/* Contenedor principal con imagen de fondo difuminada y sombreada */
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: url('../assets/Fondo_login.jpeg') no-repeat center center/cover;
}

/* Capa de difuminado adicional para mejor visibilidad */
.register::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Oscurece un poco */
  backdrop-filter: blur(1px);
  box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.3); /* Sombra en los bordes */
}

/* Caja del formulario */
.register-container {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.1);
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  width: 400px;
  max-height: 90vh; /* Altura máxima del contenedor */
  text-align: center;
  backdrop-filter: blur(12px);
  animation: fadeIn 1s ease-in-out;
  color: white;
  overflow: hidden; /* Oculta el desbordamiento */
}

.logo {
  width: 95px; /* Ajusta el tamaño si es necesario */
  height: 95px; /* Ajusta el tamaño si es necesario */
  animation: fadeIn 1s ease-in-out;
}

/* Contenedor del formulario con scroll */
.form-scroll {
  max-height: 60vh; /* Altura máxima del formulario */
  overflow-y: auto; /* Scroll vertical */
  padding-right: 8px; /* Espacio para el scroll */
}

/* Animación de entrada */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Título */
h2 {
  margin-bottom: 12px;
  font-size:20px;
}

/* Inputs */
.form-group {
  margin-bottom: 12px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input, .form-group select, .form-group input[type="file"] {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.685);
  color: #000000; /* Texto en negro para mejor visibilidad */
  outline: none;
}

/* Estilo específico para los select */
.form-group select {
  color: #000; /* Texto en negro */
  background: rgba(255, 255, 255, 0.8); /* Fondo más claro para mejor contraste */
}

/* Estilo para el input de tipo file */
.form-group input[type="file"] {
  background: rgba(255, 255, 255, 0.8); /* Fondo más claro */
  color: #000; /* Texto en negro */
}

/* Botón */
button {
  width: 100%;
  padding: 12px;
  background-color: #e60000; /* Rojo sólido */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: 0.3s;
}

button:hover {
  border-radius: 8px;
  background-color: #b30000; /* Rojo más oscuro al hacer hover */
  transform: scale(1.02);
}

/* Enlace */
p {
  margin-top: 15px;
}
</style>