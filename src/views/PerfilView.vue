<template>
    <div>
      <!-- Menú de navegación -->
      <MainMenu />
  
      <!-- Contenido principal -->
      <div class="perfil-container">
        <UserProfile />
      </div>
    </div>
  </template>
  
  <script>
  import MainMenu from '@/components/MainMenu.vue'; // Ajusta la ruta según tu estructura
  import UserProfile from '@/components/UserProfile.vue'; // Ajusta la ruta según tu estructura
  
  export default {
    components: {
      MainMenu,
      UserProfile,
    },
  };
  </script>
  
  <style scoped>
  /* Contenedor principal */
  .perfil-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 80px); /* Resta la altura del menú */
    padding: 10px;
    box-sizing: border-box;
    margin-top: 350px;
  }
  </style>