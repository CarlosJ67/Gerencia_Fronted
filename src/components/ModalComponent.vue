<template>
    <transition name="modal-fade">
      <div v-if="isVisible" class="modal-overlay">
        <div class="modal-content animate-pop">
          <div class="modal-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-alert" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
            </svg>
          </div>
          <h3>¿Estás seguro?</h3>
          <p>{{ message }}</p>
          <div class="modal-actions">
            <button @click="$emit('confirm')" class="confirm-btn">Sí, eliminar</button>
            <button @click="$emit('cancel')" class="cancel-btn">Cancelar</button>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean,
      message: {
        type: String,
        default: '¿Deseas continuar con esta acción?',
      },
    },
  };
  </script>
  
  <style scoped>
  /* Overlay del modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  /* Contenido del modal */
  .modal-content {
    background: white;
    padding: 30px 40px;
    border-radius: 16px;
    text-align: center;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    animation: popIn 0.3s ease-out;
  }
  
  /* Icono de advertencia */
  .modal-icon {
    margin-bottom: 16px;
  }
  
  .icon-alert {
    width: 50px;
    height: 50px;
    color: #e53935;
  }
  
  /* Botones */
  .modal-actions {
    display: flex;
    justify-content: space-around;
    margin-top: 24px;
  }
  
  .confirm-btn,
  .cancel-btn {
    padding: 10px 20px;
    border-radius: 25px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
  }
  
  .confirm-btn {
    background-color: #d32f2f;
    color: white;
  }
  
  .cancel-btn {
    background-color: #bdbdbd;
    color: black;
  }
  
  .confirm-btn:hover {
    background-color: #b71c1c;
  }
  
  .cancel-btn:hover {
    background-color: #9e9e9e;
  }
  
  /* Animaciones */
  @keyframes popIn {
    0% {
      transform: scale(0.7);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  /* Transición del modal */
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.3s;
  }
  .modal-fade-enter, 
  .modal-fade-leave-to {
    opacity: 0;
  }
  </style>
  