import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/opiniones/:gameSlug',
    name: 'Opiniones',
    component: () => import('../views/OpinionesView.vue'), // Lazy Loading
  },
  {
    path: '/administracion', // Cambié el nombre de la ruta para que sea más descriptivo
    name: 'Administracion',
    component: () => import('../views/AdminView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;