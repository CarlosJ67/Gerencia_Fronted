<template>
  <div v-if="show" :class="['toast-message', type, { show: show }]">
    <div class="toast-content">
      {{ message }}
      <span class="close-btn" @click="handleClose">×</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToastMessage',
  data() {
    return {
      show: false,
      message: '',
      type: 'success',
      options: {
        redirectOnClose: false,
        redirectTo: '/'
      }
    }
  },
  methods: {
    showToast(message, type = 'success', options = {}) {
      this.message = message
      this.type = type
      // Actualizamos las opciones correctamente
      this.options = {
        ...this.options,
        ...options
      }
      this.show = true
    },
    handleClose() {
      this.show = false
      if (this.options.redirectOnClose) {
        this.$emit('close-and-redirect', this.options.redirectTo)
      }
    }
  }
}
</script>

<style scoped>
.toast-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) scale(0.8);
  padding: 15px 40px 15px 25px;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 10000;
  max-width: 80%;
  text-align: center;
  font-size: 1em;
  font-weight: 500;
  backdrop-filter: blur(5px);
}

.toast-message.show {
  transform: translateX(-50%) scale(1);
  opacity: 1;
}

.toast-message.success {
  background-color: rgba(46, 125, 50, 0.9);
  border-left: 4px solid #2E7D32;
}

.toast-message.error {
  background-color: rgba(198, 40, 40, 0.9);
  border-left: 4px solid #C62828;
}

.toast-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn {
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5em;
  cursor: pointer;
  padding: 0 8px;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s;
}

.close-btn:hover {
  color: white;
}
</style>