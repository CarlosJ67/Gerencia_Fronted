import { reactive } from 'vue';
import mitt from 'mitt';

const emitter = mitt();

export const websocketService = reactive({
  socket: null,
  connected: false,

  connect() {
    if (this.connected) return;

    this.socket = new WebSocket("ws://localhost:8000/ws/transacciones");

    this.socket.onopen = () => {
      console.log("✅ Conectado al WebSocket");
      this.connected = true;
    };

    this.socket.onmessage = async (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("📨 Mensaje recibido:", message);
    
        // Verificación de los datos recibidos
        if (Array.isArray(message)) {
          console.log("🟢 Datos recibidos: ", message);
          // Si es un array, puedes hacer algo con él (por ejemplo, actualizar la gráfica o la tabla)
        } else if (message?.action === "actualizar_transacciones") {
          console.log("🔄 Señal de actualizar transacciones recibida");
          emitter.emit('actualizar-transacciones');  // Solo señalamos que debe actualizarse
        } else {
          console.warn("⚠️ Tipo de mensaje no esperado:", message);
        }
    
      } catch (err) {
        console.error("🔴 Error al procesar mensaje WebSocket:", err);
      }
    };
    

    this.socket.onclose = () => {
      console.warn("🔌 WebSocket desconectado");
      this.connected = false;
    };
  },

  on(event, callback) {
    emitter.on(event, callback);
  },

  off(event, callback) {
    emitter.off(event, callback);
  },

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
});
