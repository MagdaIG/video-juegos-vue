import { createApp } from 'vue'; // API de composición para Vue 3
import App from './App.vue';
import router from './router';
import store from '@/store';
// Importar Bootstrap CSS y Bootstrap Icons
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Importar BootstrapVue3
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'; // Estilos de BootstrapVue3
import '@fortawesome/fontawesome-free/css/all.min.css';


// Importar Vuetify y estilos
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Estilos de Vuetify
import '@mdi/font/css/materialdesignicons.css';

// Crear instancia de Vuetify
const vuetify = createVuetify({
    theme: {
        defaultTheme: 'light', // Puedes usar 'dark' o configurar temas personalizados
    },
});

// Crear la aplicación y registrar Vuetify, router y store
const app = createApp(App);
app.use(store);
app.use(router);
app.use(vuetify); // Registrar Vuetify
app.use(BootstrapVue3); // Registrar BootstrapVue3

// Montar la aplicación
app.mount('#app');