<template>
  <div class="login">
    <div class="background-overlay"></div>
    <div class="login-container animate-fade-in">
      <img src="../assets/logo.png" alt="Gym Bulls Logo" class="logo">
      <h1 class="inicio">Iniciar Sesión</h1>
      <h2>¡Bienvenido!</h2>
      <form @submit.prevent="login">

        <!-- Campo de usuario -->
        <div class="form-group">
          <label for="username">Nombre Usuario</label>
          <input type="text" id="username" v-model="nombre_usuario" required />
        </div>

        <!-- Campo de contraseña -->
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="contrasena" required />
        </div>

        <!-- Botón de ingresar -->
        <button type="submit">Ingresar</button>
      </form>
      <p>
        ¿No tienes una cuenta? <router-link to="/register">Regístrate</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import api from "../api/api.js"; // Asegúrate de importar correctamente api.js

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.loginUser(this.nombre_usuario, this.contrasena);

        if (response && response.access_token) {
          localStorage.setItem("authenticated", true);
          localStorage.setItem("token", response.access_token);
          localStorage.setItem("esGerente", response.esGerente);
          localStorage.setItem("usuarioLogueado", response.usuarioLogueado);

          if (response.esGerente) {
            this.$router.push("/home");
          } else {
            this.$router.push("/cliente");
          }
        } else {
          alert("Usuario o contraseña incorrectos");
        }
      } catch (error) {
        console.error("Error en login:", error);
        alert("Hubo un error al intentar iniciar sesión. Intenta nuevamente.");
      }
    },
    clearLocalStorage() {
      localStorage.removeItem("authenticated");
      localStorage.removeItem("token");
      localStorage.removeItem("esGerente");
      localStorage.removeItem("usuarioLogueado");
    },
  },
  created() {
    this.clearLocalStorage(); // Limpia el localStorage al cargar la vista
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: url('../assets/Fondo_login.jpeg') no-repeat center center/cover;
}

.background-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
}

.inicio {
  color: white;
  font-size: 22px;
}

.login-container {
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  width: 400px;
  text-align: center;
  backdrop-filter: blur(12px);
  max-height: 85vh;
  animation: fadeIn 1s ease-in-out;
}

/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  .login-container {
    width: 90%;
    padding: 20px;
  }

  .inicio {
    font-size: 18px;
  }

  h2 {
    font-size: 16px;
  }

  .form-group input {
    padding: 8px;
    font-size: 14px;
  }

  button {
    padding: 10px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .login-container {
    width: 95%;
    padding: 15px;
  }

  .logo {
    width: 90px;
    height: 90px;
  }

  .inicio {
    font-size: 16px;
  }

  h2 {
    font-size: 14px;
  }

  .form-group label {
    font-size: 14px;
  }

  .form-group input {
    padding: 8px;
    font-size: 14px;
  }

  button {
    padding: 10px;
    font-size: 14px;
  }

  p {
    font-size: 12px;
  }
}

.logo {
  width: 120px;
  height: 120px;
  animation: fadeIn 1s ease-in-out;
}

h2 {
  margin-bottom: 8px;
  color: #ffffff;
  font-size: 18px;
}

.form-group {
  margin-bottom: 12px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  color: #ddd;
}

.form-group input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.685);
  color: #000000;
  outline: none;
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

button {
  width: 100%;
  padding: 12px;
  background-color: #e60000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: 0.3s;
}

button:hover {
  border-radius: 8px;
  background-color: #b30000;
  transform: scale(1.02);
}

p {
  margin-top: 15px;
  color: #ddd;
}

router-link {
  color: #00c6ff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

router-link:hover {
  color: #ffffff;
  text-decoration: underline;
}

/* Animación para la entrada suave */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
