import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import VueApexCharts from 'vue3-apexcharts';

const app = createApp(App);

// Registrar VueApexCharts con un nombre multi-palabra
app.component('ApexChart', VueApexCharts);

app.use(router);
app.mount('#app');