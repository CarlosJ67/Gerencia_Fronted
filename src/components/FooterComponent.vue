<template>
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h2 class="footer-title">GYM BULLS</h2>
          <p class="footer-text">Tu gimnasio de confianza para alcanzar tus metas</p>
          
          <!-- Redes sociales debajo del texto -->
          <div class="footer-social">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-tiktok"></i></a>
          </div>
        </div>
  
        <div class="footer-section">
          <h3 class="footer-subtitle">Servicios</h3>
          <ul>
            <li><a href="#">Entrenamiento Personalizado</a></li>
            <li><a href="#">Clases Grupales</a></li>
            <li><a href="#">Nutrición Deportiva</a></li>
            <li><a href="#">Asesoría Online</a></li>
          </ul>
        </div>
  
        <div class="footer-section">
          <h3 class="footer-subtitle">Extras</h3>
          <ul>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Eventos Especiales</a></li>
          </ul>
        </div>
      </div>
  
      <div class="footer-bottom">
        &copy; 2025 GYM BULLS | Desarrollado con ❤️ por CALIROLEX en Xicotepec
      </div>
    </footer>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  /* Estilos Generales */
  .footer {
    background-color: #000;
    color: #ccc;
    text-align: center;
    width: 100vw;
    left: 0;
    right: 0;
    position: relative;
    bottom: 0;
    margin-top: auto;
  }
  
  /* Contenedor principal */
  .footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 20px;
    width: 100%;
  }
  
  /* Secciones */
  .footer-section {
    max-width: 300px;
  }
  
  /* Títulos */
  .footer-title {
    color: #ff0000;
    font-size: 20px;
    font-weight: bold;
  }
  
  .footer-subtitle {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  /* Lista de enlaces */
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin-bottom: 6px;
  }
  
  .footer-section ul li a {
    color: #ccc;
    text-decoration: none;
    font-size: 14px;
  }
  
  .footer-section ul li a:hover {
    color: #ff0000;
  }
  
  /* Redes Sociales */
  .footer-social {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 15px;
  }
  
  .footer-social a {
    color: #ccc;
    font-size: 24px;
    text-decoration: none;
    transition: color 0.3s ease-in-out;
  }
  
  .footer-social a:hover {
    color: #ff0000;
  }
  
  /* Parte inferior del footer */
  .footer-bottom {
    margin-top: 15px;
    font-size: 12px;
    color: #888;
  }
  
  /* Ajuste responsivo */
  @media (max-width: 768px) {
    .footer-container {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
  </style>
  