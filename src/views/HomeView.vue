<template>
  <v-container>
    <!-- Contenedor negro para la sección -->
    <div class="black-container">
      <!-- Contenedor del título -->
      <div class="title-container">
        <h2 class="section-title">
          <span class="title-decorator-left"></span>
          Lista de Juegos Disponibles
          <span class="title-decorator-right"></span>
        </h2>
      </div>

      <!-- Contenedor de los GIFs -->
      <div class="gifs-container">
        <!-- GIF adicional a la izquierda -->
        <div class="gif-box">
          <div class="gif-content">
            <iframe
                src="https://gifer.com/embed/90aI"
                width="100%"
                height="100%"
                style="position:absolute;top:0;left:0;"
                frameBorder="0"
                allowFullScreen>
            </iframe>
          </div>
        </div>

        <!-- GIF original a la izquierda -->
        <div class="gif-box">
          <div class="gif-content">
            <iframe
                src="https://gifer.com/embed/Ezec"
                width="100%"
                height="100%"
                style="position:absolute;top:0;left:0;"
                frameBorder="0"
                allowFullScreen>
            </iframe>
          </div>
        </div>

        <!-- GIF original a la derecha -->
        <div class="gif-box">
          <div class="gif-content">
            <iframe
                src="https://gifer.com/embed/Ezec"
                width="100%"
                height="100%"
                style="position:absolute;top:0;left:0;"
                frameBorder="0"
                allowFullScreen>
            </iframe>
          </div>
        </div>

        <!-- GIF adicional a la derecha -->
        <div class="gif-box">
          <div class="gif-content">
            <iframe
                src="https://gifer.com/embed/FMDJ"
                width="100%"
                height="100%"
                style="position:absolute;top:0;left:0;"
                frameBorder="0"
                allowFullScreen>
            </iframe>
          </div>
        </div>
      </div>
    </div>

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
      likedGames: [],
    };
  },
  computed: {
    games() {
      return this.$store.getters.allGames;
    },
  },
  methods: {
    navigateToOpinions(gameName) {
      this.$router.push(`/opiniones/${gameName}`);
    },
    toggleLike(gameId) {
      if (this.likedGames.includes(gameId)) {
        this.likedGames = this.likedGames.filter((id) => id !== gameId);
      } else {
        this.likedGames.push(gameId);
      }
    },
  },
  created() {
    this.$store.dispatch('fetchGames');
  },
};
</script>

<style scoped>
/* Contenedor negro principal */
.black-container {
  background-color: #000000;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

/* Contenedor del título */
.title-container {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #1e1e2d;
  border-radius: 8px;
  text-align: center;
}

/* Contenedor general de los GIFs */
.gifs-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 15px;
  margin-top: 10px;
}

/* Caja para cada GIF */
.gif-box {
  flex: 1;
  max-width: 150px; /* Ajusta el ancho máximo para mejor proporción */
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background-color: #1e1e2d;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

/* Contenido del GIF */
.gif-content {
  padding-top: 100%; /* Proporción cuadrada */
  position: relative;
}

/* Título */
.section-title {
  font-family: 'Roboto', sans-serif;
  font-size: 32px;
  color: #ffffff;
  text-align: center;
  position: relative;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.title-decorator-left,
.title-decorator-right {
  display: inline-block;
  width: 50px;
  height: 4px;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  margin: 0 10px;
  border-radius: 2px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

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

.heart-button {
  font-size: 18px;
  padding: 6px 12px;
  transition: all 0.2s ease-in-out;
}

.heart-button i {
  transition: color 0.3s ease-in-out;
}

.fas.fa-heart {
  color: #e91e63;
}

.far.fa-heart {
  color: #aaa;
}
</style>