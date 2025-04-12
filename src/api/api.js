import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; 

export default {
  // Registro de usuario
  async registerUser(userData) {
    try {
      console.log(`Usuario: ${userData}`);
      const response = await axios.post(`${API_URL}/register`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(`---Usuario: ${userData}`);
      return response.data;
    } catch (error) {
      console.error("Error en el registro:", error.response?.data || error);
      throw error;
    }
  },

  // Registro de personas
  async registerPersonas(personData) {
    try {
      console.log(`Persona: ${personData}`); // Comillas invertidas añadidas
      const response = await axios.post(`${API_URL}/register-personas`, personData, { // Comillas invertidas añadidas
        headers: { "Content-Type": "application/json" },
      });
      console.log(`Persona registrada: ${personData}`); // Comillas invertidas añadidas
      return response.data;
    } catch (error) {
      console.error("Error en el registro de personas:", error.response?.data || error);
      throw error;
    }
  },

  // Login de usuario
  async loginUser(nombre_usuario, contrasena) {
    try {
      const response = await axios.post(`${API_URL}/login`, { nombre_usuario, contrasena }, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data; // Devuelve el token y tipo de token
    } catch (error) {
      console.log(console.error);
      
      console.error("Error en el login:", error.response?.data || error);
      throw error;
    }
  },

   // Obtener usuarios por tipo de transacción y rol
   async obtenerUsuariosPorTransaccion(tipoTransaccion, rol) {
    try {
      console.log("Entrando al obtener usuarios por trans");
      
      const token = localStorage.getItem("token"); // Obtener token
      const response = await axios.get(`${API_URL}/obtener-usuarios-por-transaccion`, {
        params: {
          tipo_transaccion: tipoTransaccion,
          rol: rol
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluir autenticación
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  },
  
  async registrarTransaccion(transaccionData) {
    try {
      const token = localStorage.getItem("token"); // Obtener token
      const response = await axios.post(`${API_URL}/register-tra/`, transaccionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluir autenticación
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al registrar transacción:", error);  // Imprimir todo el error
      if (error.response) {
        // Si hay una respuesta de error de la API, imprímela
        console.error("Respuesta de error de la API:", error.response.data);
      }
      throw error;
    }
  },  

  async obtenerTransacciones(skip = 0, filters = {}) {
    try {
      console.log("OBTENER TODOOOOO");
      
      const token = localStorage.getItem("token");
  
      const response = await axios.get(`${API_URL}/obtener-todo`, {
        params: {
          skip,
          ...filters // Puedes pasar filtros opcionales aquí
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Datos recibidos:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al obtener transacciones:", error.response?.data || error);
      throw error;
    }
  },

  
  
  // async obtenerGerentesActivos() {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(`${API_URL}/gerentes/activos`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error al obtener gerentes:", error.response?.data || error);
  //     throw error;
  //   }
  // },

  async registrarSucursal(sucursalData) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/sucursales/`, sucursalData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al registrar sucursal:", error.response?.data || error);
      throw error;
    }
  },

  
  async obtenerGerentes() {
    try {
      const token = localStorage.getItem("token"); // Si el endpoint requiere autenticación
      const response = await axios.get(`${API_URL}/gerentes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Solo si es necesario
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener gerentes:", error.response?.data || error);
      throw error;
    }
  },
  

  async actualizarSucursal(sucursalId, sucursalData) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/sucursales/${sucursalId}`, sucursalData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar sucursal:", error.response?.data || error);
      throw error;
    }
  },
  

    // Último método del archivo, justo antes de cerrar el export default
    async obtenerUsuarioConPersona() {
      try {
        const nombre_usuario = localStorage.getItem("usuarioLogueado");
  
        if (!nombre_usuario) {
          throw new Error("Usuario no encontrado en localStorage");
        }
  
        const response = await axios.get(`${API_URL}/usuario/${nombre_usuario}`, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        console.log("Usuario con datos de persona:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error al obtener usuario con datos de persona:", error.response?.data || error);
        throw error;
      }
    },
    
    async actualizarPersona(personaId, personaData) {
      try {
        const token = localStorage.getItem("token"); // Asumiendo que usas JWT
        const response = await axios.put(`${API_URL}/personas/${personaId}`, personaData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Si tu endpoint requiere autenticación
          },
        });
        console.log("Persona actualizada:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error al actualizar persona:", error.response?.data || error);
        throw error;
      }
    },
    async obtenerSucursales(skip = 0, limit = 10) {
      try {
        const token = localStorage.getItem("token"); // si el endpoint requiere autenticación
        const response = await axios.get(`${API_URL}/sucursales/`, {
          params: { skip, limit },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // solo si es necesario
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error al obtener sucursales:", error.response?.data || error);
        throw error;
      }
    },
    async eliminarSucursal(sucursalId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${API_URL}/sucursales/${sucursalId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Sucursal eliminada:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error al eliminar sucursal:", error.response?.data || error);
        throw error;
      }
    },
};