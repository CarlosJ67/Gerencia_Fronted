import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import Home from '@/views/HomeView.vue';
import Sucursales from '@/views/SucursalesView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import Perfil from '@/views/PerfilView.vue';
import LandingPage from '@/views/LandingPageView.vue';
import GameError from '@/components/GameError.vue';
import NotFound from '@/components/NotFound.vue';// Asegúrate de crear este componente
import ClientLanding from '@/views/ClientLandingView.vue'; 

const routes = [
  {
    path: '/',
    redirect: '/inicio'
  },
  {
    path: '/error',
    name: 'Error',
    component: GameError,
  },
  {
    path: '/inicio',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/cliente',
    name: 'ClientLanding',
    component: ClientLanding,
    meta: { requiresAuth: true } 
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true } 
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: { requiresAuth: true } 
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/sucursales',
    name: 'Sucursales',
    component: Sucursales,
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/Inicio',
    name: 'Inicio',
    component: LandingPage,
  },
  // 👇 ÚNICO CAMBIO: Ruta para manejar 404 (debe ir SIEMPRE al final)
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound // Usará tu componente NotFound.vue
  }
];

// El resto del código permanece EXACTAMENTE igual
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authenticated');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;