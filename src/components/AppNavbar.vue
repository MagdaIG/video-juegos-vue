<template>
  <b-navbar class="navbar-custom" variant="dark">
    <b-container>
      <b-navbar-brand href="/">Catálogo de juegos</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/" exact>Inicio</b-nav-item>
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: 'AppNavbar',
};
</script>

<style scoped>
/* Estilo personalizado del Navbar */
.navbar-custom {
  background: linear-gradient(45deg, #6a11cb, #2575fc) !important; /* Gradiente */
  font-family: 'Roboto', sans-serif;
  border: none;
}

.navbar-custom .navbar-brand {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff !important;
}

.navbar-custom .nav-item .nav-link {
  font-size: 16px;
  color: #ffffff !important;
  margin-left: 15px;
  transition: color 0.3s ease;
}

.navbar-custom .nav-item .nav-link:hover {
  color: #ff80ab !important; /* Rosa claro al pasar el cursor */
}
</style>