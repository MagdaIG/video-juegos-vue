<template>
  <v-container>
    <!-- Título de la sección -->
    <h2 class="section-title">Lista de Juegos Disponibles</h2>

    <!-- Tarjetas dinámicas de juegos -->
    <b-card-group deck>
      <b-row>
        <b-col
            v-for="(game, index) in games"
            :key="index"
            cols="12"
            md="4"
            lg="3"
            class="mb-4"
        >
          <b-card
              :title="game.name"
              :img-src="game.background_image || placeholderImage"
              img-alt="Game Image"
              img-top
              class="game-card"
          >
            <b-card-text>
              Lanzamiento: <strong>{{ game.released || 'N/A' }}</strong>
            </b-card-text>
            <div class="d-flex justify-content-between align-items-center">
              <b-button variant="primary" @click="navigateToOpinions(game.slug)">
                Opinar
              </b-button>
              <b-button
                  class="heart-button"
                  @click="toggleLike(game.id)"
                  :variant="likedGames.includes(game.id) ? 'danger' : 'outline-danger'"
              >
                <i
                    :class="likedGames.includes(game.id) ? 'fas fa-heart' : 'far fa-heart'"
                ></i>
              </b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-card-group>

    <!-- Mensaje si no hay juegos disponibles -->
    <b-alert v-if="games.length === 0" variant="info" show>
      No hay juegos disponibles en este momento.
    </b-alert>
  </v-container>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      placeholderImage: 'https://via.placeholder.com/300x300?text=No+Image',
      likedGames: [], // Estado local para controlar los corazones likeados
    };
  },
  computed: {
    games() {
      return this.$store.getters.allGames; // Obtiene la lista de juegos desde el store
    },
  },
  methods: {
    navigateToOpinions(gameName) {
      this.$router.push(`/opiniones/${gameName}`);
    },
    toggleLike(gameId) {
      if (this.likedGames.includes(gameId)) {
        // Elimina el "like"
        this.likedGames = this.likedGames.filter((id) => id !== gameId);
      } else {
        // Agrega el "like"
        this.likedGames.push(gameId);
      }
    },
  },
  created() {
    this.$store.dispatch('fetchGames'); // Obtiene los juegos al cargar la vista
  },
};
</script>

<style scoped>
/* Título de sección */
.section-title {
  font-family: 'Cinzel', serif;
  font-size: 32px;
  text-align: center;
  color: #ff80ab; /* Rosa claro */
  margin-bottom: 20px;
}

/* Tarjetas de juegos */
.game-card {
  background-color: #1e1e2d;
  color: white;
  border: none;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.game-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(255, 128, 171, 0.3);
}

/* Botón del corazón */
.heart-button {
  font-size: 18px;
  padding: 6px 12px;
  transition: all 0.2s ease-in-out;
}

.heart-button i {
  transition: color 0.3s ease-in-out;
}

/* Icono del corazón */
.fas.fa-heart {
  color: #e91e63; /* Rojo cuando está likeado */
}

.far.fa-heart {
  color: #aaa; /* Gris cuando no está likeado */
}
</style>