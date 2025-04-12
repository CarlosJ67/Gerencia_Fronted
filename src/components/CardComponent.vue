<template>
    <div class="card">
      <div class="card-content">
        <h2>{{ title }}</h2>
        <p class="price">{{ price }}</p>
        <p class="description">{{ description }}</p>
        <button class="btn">Más información</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      price: String,
      description: String,
    },
  };
  </script>
  
  <style scoped>
  .card {
    width: 280px;
    height: 320px;
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    color: #333;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s, border 0.3s;
    cursor: pointer;
    position: relative;
    border: 2px solid transparent;
  }
  
  /* Animación al pasar el mouse */
  .card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    border: 2px solid transparent;
    background: linear-gradient(135deg, #111111, #666666, #f8f8f8);
    color: white;
  }
  
  /* Efecto de borde animado */
  .card::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(135deg, #1f1e1e, #706f6f);
    transition: opacity 0.5s;
    opacity: 0;
  }
  
  .card:hover::before {
    opacity: 1;
  }
  
  /* Contenido de la tarjeta */
  .card-content {
    padding: 20px;
    text-align: center;
  }
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
  
  .price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ff2222;
  }
  .card:hover .price {
  color: #f74d4d;
}
  
  .description {
    font-size: 1rem;
    margin: 15px 0;
    line-height: 1.5;
  }
  
  /* Botón de la tarjeta */
  .btn {
    background: #5f5f5f;
    color: white;
    border: none;
    padding: 10px 25px;
    font-size: 1rem;
    border-radius: 25px;
    transition: background 0.3s, transform 0.3s;
    cursor: pointer;
  }
  
  .card:hover .btn {
    background: white;
    color: #ff2222;
    transform: scale(1.1);
  }
  
  .btn:hover {
    background: #ff4b2b;
    color: white;
  }
  </style>
  