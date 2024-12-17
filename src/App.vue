<template>
  <div id="app">
    <!-- Navbar -->
    <AppNavbar />

    <!-- Contenido dinámico -->
    <b-container fluid class="main-content">
      <router-view />
    </b-container>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter,
  },
  created() {
    if (!this.$store.state.games.length) {
      this.$store.dispatch('fetchGames');
    }
  },
};
</script>

<style>
/* Contenedor principal */
.main-content {
  min-height: calc(100vh - 120px); /* Ajuste para espacio entre Navbar y Footer */
  background-color: #1e1e2d;
  color: rgba(144, 95, 181, 0.99);
  padding: 20px 0;
}
</style>