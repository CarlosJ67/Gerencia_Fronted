<template>
    <div class="not-found">
      <h1>404 - Página no encontrada</h1>
      <p>La ruta "{{ $route.path }}" no existe.</p>
      <router-link to="/inicio">Volver al inicio</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  }
  </script>