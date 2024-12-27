<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">Vista de Administración</h1>

    <!-- Información del usuario -->
    <div class="card mb-5">
      <div class="card-body">
        <h5 class="card-title">Información del Usuario</h5>
        <p class="card-text">
          <strong>Nombre:</strong> {{ user.name }}
        </p>
        <p class="card-text">
          <strong>Apellido:</strong> {{ user.surname }}
        </p>
        <p class="card-text">
          <strong>Monedas Restantes:</strong> {{ remainingCoins }}
        </p>
      </div>
    </div>

    <!-- Juegos marcados como "like" -->
    <h2 class="text-center mb-4">Juegos Favoritos</h2>
    <div class="row g-4">
      <div
          class="col-12 col-sm-6 col-md-4"
          v-for="game in likedGames"
          :key="game.id"
      >
        <div class="card h-100">
          <img
              :src="game.background_image || placeholderImage"
              class="card-img-top"
              alt="Imagen del juego"
          />
          <div class="card-body">
            <h5 class="card-title">{{ game.name }}</h5>
            <p class="card-text">
              <strong>Lanzamiento:</strong> {{ game.released || "N/A" }}
            </p>
            <p class="card-text">
              <strong>Coins Asignadas:</strong> {{ coinsByGame[game.id] || 0 }}
            </p>
            <!-- Barra de progreso -->
            <div class="progress mb-2">
              <div
                  class="progress-bar"
                  role="progressbar"
                  :class="progressBarClass(game.id)"
                  :style="{ width: progressBarWidth(game.id) + '%' }"
                  :aria-valuenow="coinsByGame[game.id] || 0"
                  aria-valuemin="0"
                  aria-valuemax="100"
              >
                {{ progressBarWidth(game.id) }}%
              </div>
            </div>
            <!-- Mensaje de máximo alcanzado -->
            <p v-if="coinsByGame[game.id] === 50" class="text-danger">
              ¡Has alcanzado el máximo de coins para este juego!
            </p>
            <!-- Botones para asignar y remover coins -->
            <div class="d-flex justify-content-between">
              <button
                  class="btn btn-outline-success"
                  :disabled="remainingCoins === 0"
                  @click="addCoin(game.id)"
              >
                +1 Coin
              </button>
              <button
                  class="btn btn-outline-danger"
                  :disabled="(coinsByGame[game.id] || 0) === 0"
                  @click="removeCoin(game.id)"
              >
                -1 Coin
              </button>
            </div>
            <!-- Botón para quitar like -->
            <button
                class="btn btn-outline-danger w-100 mt-3"
                @click="toggleLike(game.id)"
            >
              <i :class="likedGames.some((g) => g.id === game.id) ? 'fas fa-heart' : 'far fa-heart'"></i>
              {{ likedGames.some((g) => g.id === game.id) ? "Ya no me gusta" : "Dar Like" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AdminView",
  computed: {
    ...mapGetters([
      "currentUser",
      "getCurrentUserLikes",
      "allGames",
      "currentUserCoins",
      "coinsByGame",
    ]),
    user() {
      if (this.currentUser) {
        const [name, ...surnameParts] = this.currentUser.split(" ");
        return {
          name,
          surname: surnameParts.join(" "),
        };
      }
      return { name: "", surname: "" };
    },
    likedGames() {
      const likedGameIds = this.getCurrentUserLikes;
      return this.allGames.filter((game) => likedGameIds.includes(game.id));
    },
    remainingCoins() {
      return this.currentUserCoins; // Monedas restantes del usuario
    },
  },
  methods: {
    toggleLike(gameId) {
      if (!this.currentUser) {
        alert("Debes iniciar sesión para realizar esta acción.");
        return;
      }
      try {
        this.$store.dispatch("toggleLike", gameId); // Alternar el estado de "like"
      } catch (error) {
        console.error("Error al alternar el like:", error.message);
      }
    },
    addCoin(gameId) {
      try {
        this.$store.dispatch("addCoinToGame", gameId); // Agregar una moneda al juego
      } catch (error) {
        console.error("Error al asignar moneda:", error.message);
      }
    },
    removeCoin(gameId) {
      try {
        this.$store.dispatch("removeCoinFromGame", gameId); // Remover una moneda del juego
      } catch (error) {
        console.error("Error al remover moneda:", error.message);
      }
    },
    progressBarWidth(gameId) {
      const coinsAssigned = this.coinsByGame[gameId] || 0;
      return Math.floor((coinsAssigned / 50) * 100); // Calcula el progreso en porcentaje y redondea hacia abajo
    },
    progressBarClass(gameId) {
      const progress = this.progressBarWidth(gameId);

      if (progress < 25) {
        return "bg-success"; // Verde
      } else if (progress < 90) {
        return "bg-warning"; // Amarillo
      } else {
        return "bg-danger"; // Rojo
      }
    },
  },
  data() {
    return {
      placeholderImage: "https://via.placeholder.com/300x200?text=No+Image",
    };
  },
};
</script>