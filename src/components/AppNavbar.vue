<template>
  <b-navbar toggleable="lg" class="navbar-custom" variant="dark">
    <b-container class="navbar-container">
      <!-- Contenedor del título -->
      <div class="brand-container">
        <div class="brand-box">
          <b-navbar-brand href="/">
            <i class="fas fa-gamepad"></i> Catálogo de Juegos
          </b-navbar-brand>
        </div>
      </div>
      >
      <div class="search-container">
        <b-form inline @submit.prevent="handleSearch" class="search-form">
          <b-form-input
              v-model="searchQuery"
              placeholder="Buscar juegos..."
              class="search-input"
          ></b-form-input>
          <b-button type="submit" variant="light" class="search-button">
            <i class="fas fa-search"></i>
          </b-button>
        </b-form>
      </div>
    </b-container>
  </b-navbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AppNavbar",
  data() {
    return {
      searchQuery: "",
    };
  },
  computed: {
    ...mapGetters(["allGames"]),
  },
  methods: {
    ...mapActions(["searchGames"]), // Acción para buscar juegos en la API
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.searchGames(this.searchQuery); // Llama a la API para buscar
      }
    },
  },
};
</script>

<style scoped>
.navbar-custom {
  background: linear-gradient(45deg, rgba(113, 64, 159, 0.99), #182848) !important;
  font-family: 'Roboto', sans-serif;
  padding: 10px 20px;
}

/* Alineación general del navbar */
.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Contenedor del título */
.brand-container {
  display: flex;
  align-items: center;
}

.brand-box {
  background: #ffffff;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.brand-box .navbar-brand {
  font-size: 18px;
  font-weight: bold;
  color: #182848 !important;
  display: flex;
  align-items: center;
  text-transform: uppercase;
}

.brand-box .navbar-brand i {
  font-size: 24px;
  margin-right: 8px;
}

/* Contenedor del buscador */
.search-container {
  display: flex;
  align-items: center;
}

.search-form {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px; /* Ajusta el tamaño máximo */
}

.search-input {
  flex: 1;
  border-radius: 20px;
  padding: 10px 15px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  font-size: 16px;
}

.search-button {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #ffa726 !important;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 20px;
}

.search-button:hover {
  background-color: #fb8c00 !important;
}
</style>