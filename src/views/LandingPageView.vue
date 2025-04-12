<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <router-link to="/home" class="navbar-link">
                <img src="../assets/logo3.png" alt="GYM Bulls Logo" class="logo" />
            </router-link>
            <span class="gym-name">GYM BULLS</span>
        </div>
        <button @click="goToLogin" class="login-button">Iniciar Sesión</button>
    </nav>
    <div class="landing">
        <!-- Primera sección con imagen de fondo -->
        <div class="first-section">
            <div class="container">
                <div class="content">
                    <h1>Transforma tu cuerpo con <span>GYM BULLS</span> </h1>
                    <p>
                        Únete a la comunidad de atletas y entusiastas del fitness que están llevando su entrenamiento al
                        siguiente nivel.
                        Ofrecemos planes y membresías diseñados para todos los niveles.
                    </p>
                    <div class="buttons">
                        <button class="btn primary">Todas las membresías</button>
                        <button class="btn secondary">Todos nuestros productos</button>
                    </div>
                </div>

                <!-- Sección derecha: cards -->
                <div class="cards">
                    <Card title="Básico" price="$200/mes" description="Acceso ilimitado a pesas y cardio." />
                    <Card title="Premium" price="$300/mes" description="Clases grupales y entrenadores." />
                    <Card title="Elite" price="$350/mes" description="Planes personalizados con nutrición." />
                    <Card title="VIP" price="$500/mes" description="Entrenamiento privado total." />
                </div>
            </div>
        </div>

        <!-- Sección adicional con imágenes y texto -->
        <div class="gym-section">
            <div class="gym-container">
                <!-- Primer gym-item: Nutricionista -->
                <div class="gym-item">
                    <img src="../assets/landing_salad.jpg" alt="Nutrición Balanceada" />
                    <div class="gym-content">
                        <h2>ASESORÍA NUTRICIONAL PERSONALIZADA</h2>
                        <p>
                            Nuestros nutricionistas expertos diseñan dietas balanceadas y deliciosas para maximizar tu
                            rendimiento y ayudarte a lograr tus objetivos de fitness.
                        </p>
                        <a href="#" class="link">➡️ Conoce más sobre nutrición</a>
                    </div>
                </div>

                <!-- Segundo gym-item: Entrenadores -->
                <div class="gym-item reverse">
                    <div class="gym-content">
                        <h2>ENTRENADORES ALTAMENTE CALIFICADOS</h2>
                        <p>
                            Entrena con nuestros profesionales certificados que te guiarán paso a paso, adaptando los
                            planes
                            de entrenamiento a tus necesidades y metas.
                        </p>
                        <a href="#" class="link">➡️ Descubre nuestros entrenadores</a>
                    </div>
                    <img src="../assets/landing_man.jpg" alt="Entrenadores Profesionales" />
                </div>
            </div>
        </div>


        <!-- Footer -->
        <Footer />
    </div>
</template>


<script>
import Card from "../components/CardComponent.vue";
import Footer from "../components/FooterComponent.vue";

export default {
    components: { Card, Footer },
    methods: {
        goToLogin() {
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
/* Estilo principal para la landing */
.landing {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    color: white;
    overflow: hidden;
}

/* Primera sección con imagen de fondo */
.first-section {
    position: relative;
    width: 100%;
    height: 800px;
    background-image: url('@/assets/parallax.jpg');
    background-size: cover;
    margin-top: 1260px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.first-section::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.705);
}

/* Contenedor principal */
.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1300px;
    width: 100%;
    gap: 60px;
    padding: 100px 40px;
    z-index: 2;
}

/* Contenido a la izquierda */
.content {
    max-width: 500px;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeIn 0.8s forwards;
}

h1 {
    font-size: 3.5rem;
    line-height: 1.2;
    color: white;
}

h1 span {
    color: #ff2222;
    /* Texto destacado */
    font-weight: bold;
}

p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin: 20px 0;
    color: white;
}

.buttons {
    display: flex;
    gap: 20px;
}

.btn {
    padding: 12px 30px;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 25px;
    transition: 0.3s;
}

.primary {
    background: #ff2222;
    color: white;
}

.primary:hover {
    background: #b30000;
}

.secondary {
    background: white;
    color: #ff2222;
    border: 2px solid #ff2222;
}

.secondary:hover {
    background: rgb(224, 223, 223);
    color: #b30000;
    border: 2px solid #b30000;
}

/* Cards */
.cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

/* Animación para las cards */
.cards>* {
    opacity: 0;
    transform: translateY(30px);
    animation: fadeIn 0.8s forwards;
}

.cards>*:nth-child(1) {
    animation-delay: 0.1s;
}

.cards>*:nth-child(2) {
    animation-delay: 0.2s;
}

.cards>*:nth-child(3) {
    animation-delay: 0.3s;
}

.cards>*:nth-child(4) {
    animation-delay: 0.4s;
}

/* Sección adicional */
.section {
    background: white;
    color: #333;
    text-align: center;
    padding: 100px 20px;
    z-index: 3;
}

.section h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
}

.section p {
    font-size: 1.2rem;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
}

/* Animación para la aparición suave */
@keyframes fadeIn {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Sección adicional de servicios */
.gym-section {
    background: rgb(221, 219, 219);
    width: 100%;
    padding: 60px 20px;
    display: flex;
    justify-content: center;
}

.gym-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 30px;
    max-width: 1200px;
    width: 100%;
}

/* Estilo general para cada item */
.gym-item {
    display: flex;
    background: #f8f8f8;
    border-radius: 12px;
    overflow: hidden;
    -webkit-box-shadow: 10px 10px 53px 8px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 53px 8px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 53px 8px rgba(0, 0, 0, 0.75);
    height: 320px;
    /* Altura reducida */
    width: 80%;
    margin: 0 auto;
    transition: transform 0.3s ease-in-out;
}

.gym-item:hover {
    transform: translateY(-5px);
}

/* Imagen con tamaño ajustado */
.gym-item img {
    width: 50%;
    object-fit: cover;
    height: 100%;
}

/* Contenido a la derecha o izquierda */
.gym-content {
    padding: 20px;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* Estilo de texto para h2 y p */
.gym-content h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 10px;
}

.gym-content p {
    font-size: 0.95rem;
    color: #555;
    line-height: 1.5;
}

/* Estilizar enlaces */
.link {
    margin-top: 10px;
    color: #ff2222;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;
}

.link:hover {
    color: #b30000;
}

/* RESPONSIVE DESIGN: Adaptar para móviles y tabletas */
@media (max-width: 768px) {
    .gym-item {
        flex-direction: column;
        height: auto;
        /* Altura automática para adaptarse */
    }

    .gym-item img {
        width: 100%;
        height: 200px;
        /* Altura fija para la imagen en móviles */
    }

    .gym-content {
        width: 100%;
        padding: 15px;
    }

    .gym-content h2 {
        font-size: 1.4rem;
    }

    .gym-content p {
        font-size: 0.9rem;
    }
}

/* Ajustes adicionales para pantallas muy pequeñas */
@media (max-width: 480px) {
    .gym-section {
        padding: 40px 15px;
    }

    .gym-container {
        gap: 20px;
    }

    .gym-content h2 {
        font-size: 1.2rem;
    }

    .gym-content p {
        font-size: 0.85rem;
    }
}

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background: linear-gradient(135deg, #1c1c1c, #0c0000);
    color: white;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
}

/* Contenedor del logo y nombre */
.navbar-brand {
    display: flex;
    align-items: center;
}

.logo {
    height: 45px;
    margin-right: 15px;
}

.gym-name {
    font-size: 1.5rem;
    font-weight: 700;
    font-family: 'Poppins', sans-serif;
    color: #ff2222;
    text-transform: uppercase;
}

/* Botón de iniciar sesión */
.login-button {
    background-color: white;
    color: #ff2222;
    padding: 0.6rem 1.5rem;
    border-radius: 8px;
    border: none;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
}

.login-button:hover {
    background-color: #ff2222;
    color: white;
    transform: scale(1.05);
}

/* Estilos responsivos */
@media (max-width: 768px) {
    .navbar {
        padding: 1rem;
    }

    .gym-name {
        font-size: 1.2rem;
    }

    .login-button {
        padding: 0.5rem 1.2rem;
        font-size: 0.9rem;
    }
    .first-section {
        height: auto;
        padding: 60px 20px;
        text-align: center;
        margin-top: 2840px;
    }

    .container {
        flex-direction: column;
        gap: 40px;
        padding: 50px 20px;
    }

    h1 {
        font-size: 2rem;
    }

    p {
        font-size: 1rem;
        margin: 15px 0;
    }

    .buttons {
        flex-direction: column;
        width: 100%;
        gap: 15px;
    }

    .btn {
        width: 100%;
    }

    .cards {
        grid-template-columns: 1fr;
    }
}
.logo {
height: 64px;
width: 64px; /* Logo más grande también para mobile */
}

.login-button {
padding: 0.5rem 1.2rem;
font-size: 0.9rem;
}
</style>