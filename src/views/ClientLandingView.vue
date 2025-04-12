<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <router-link to="/cliente" class="navbar-link">
                <img src="../assets/logo3.png" alt="GYM Bulls Logo" class="logo" />
            </router-link>
            <span class="gym-name">GYM BULLS</span>
        </div>
        <!-- Menú de usuario -->
        <div class="user-menu">
            <div class="user-icon" @click="toggleMenu">
                <img src="../assets/perfil-del-usuario.png" alt="Usuario" />
            </div>
            <div v-if="menuVisible" class="menu-dropdown">
                <button @click="logout" class="logout-button">Cerrar Sesión</button>
            </div>
        </div>
    </nav>
    <div class="landing">
        <!-- Sección de servicios para clientes -->
        <div class="gym-section">
            <div class="gym-container">
                <!-- Card de Asesoría Nutricional -->
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

                <!-- Card de Fisioterapia -->
                <div class="gym-item reverse">
                    <div class="gym-content">
                        <h2>FISIOTERAPIA DEPORTIVA</h2>
                        <p>
                            Recupera tu movilidad y previene lesiones con nuestros especialistas en fisioterapia deportiva.
                            Tratamientos personalizados para mantenerte en tu mejor forma.
                        </p>
                        <a href="#" class="link">➡️ Agenda tu evaluación</a>
                    </div>
                    <img src="../assets/landing_physio.jpg" alt="Fisioterapia Deportiva" />
                </div>

                <!-- Card de Membresías -->
                <div class="gym-item">
                    <img src="../assets/landing_membership.jpg" alt="Planes de Membresía" />
                    <div class="gym-content">
                        <h2>MEMBRESÍAS A TU MEDIDA</h2>
                        <p>
                            Desde acceso básico hasta entrenamiento VIP. Encuentra el plan perfecto que se adapte a tus
                            necesidades y presupuesto. ¡Sin contratos largos!
                        </p>
                        <a href="#" class="link">➡️ Comparar planes</a>
                    </div>
                </div>

                <!-- Card de Yoga -->
                <div class="gym-item reverse">
                    <div class="gym-content">
                        <h2>CLASES DE YOGA PREMIUM</h2>
                        <p>
                            Mejora tu flexibilidad, fuerza y paz mental con nuestras clases de yoga dirigidas por
                            instructores certificados. Todos los niveles son bienvenidos.
                        </p>
                        <a href="#" class="link">➡️ Ver horarios</a>
                    </div>
                    <img src="../assets/landing_yoga.jpg" alt="Clases de Yoga" />
                </div>
            </div>
        </div>

        <!-- Footer -->
        <Footer />
    </div>
</template>

<script>
import Footer from "../components/FooterComponent.vue";

export default {
    components: { Footer },
    data() {
        return {
            menuVisible: false, // Controla la visibilidad del menú de usuario
        };
    },
    methods: {
        toggleMenu() {
            this.menuVisible = !this.menuVisible; // Alterna la visibilidad del menú
        },
        logout() {
            // Elimina el token y redirige a la página de inicio
            localStorage.removeItem("authenticated");
            localStorage.removeItem("token");
            localStorage.removeItem("esGerente");
            localStorage.removeItem("usuarioLogueado");
            this.$router.push('/inicio');
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
    padding-top: 80px; /* Para compensar la navbar fija */
}

/* Sección de servicios */
.gym-section {
    background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
    width: 100%;
    padding: 80px 20px;
    display: flex;
    justify-content: center;
}

.gym-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 50px;
    max-width: 1200px;
    margin-top: 400px;
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
    height: 350px;
    width: 90%;
    margin: 0 auto;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
}

.gym-item:hover {
    transform: translateY(-10px);
    box-shadow: 15px 15px 60px 10px rgba(0, 0, 0, 0.85);
}

/* Imagen con tamaño ajustado */
.gym-item img {
    width: 50%;
    object-fit: cover;
    height: 100%;
}

/* Contenido a la derecha o izquierda */
.gym-content {
    padding: 30px;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* Estilo de texto para h2 y p */
.gym-content h2 {
    font-size: 1.8rem;
    color: #ff2222;
    margin-bottom: 15px;
    font-weight: 700;
}

.gym-content p {
    font-size: 1.1rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 20px;
}

/* Estilizar enlaces */
.link {
    margin-top: 15px;
    color: #ff2222;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1rem;
    transition: color 0.3s;
    display: inline-block;
}

.link:hover {
    color: #b30000;
    text-decoration: underline;
}

/* Estilo para items en orden inverso */
.reverse {
    flex-direction: row-reverse;
}

/* Navbar styles (same as original) */
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

.user-menu {
    position: relative;
    display: flex;
    align-items: center;
}

.user-icon {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
}

.user-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.menu-dropdown {
    position: absolute;
    top: 50px;
    right: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    padding: 10px;
}

.logout-button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.logout-button:hover {
    background-color: #c0392b;
}

/* RESPONSIVE DESIGN */
@media (max-width: 768px) {
    .gym-item {
        flex-direction: column;
        height: auto;
        width: 100%;
    }

    .gym-item img {
        width: 100%;
        height: 200px;
    }

    .gym-content {
        width: 100%;
        padding: 20px;
    }

    .gym-content h2 {
        font-size: 1.5rem;
    }

    .gym-content p {
        font-size: 1rem;
    }

    .reverse {
        flex-direction: column;
    }

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
}

@media (max-width: 480px) {
    .gym-section {
        padding: 40px 15px;
    }

    .gym-content h2 {
        font-size: 1.3rem;
    }

    .gym-content p {
        font-size: 0.95rem;
    }

    .link {
        font-size: 1rem;
    }
}
</style>