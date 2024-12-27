<template>
  <b-container>
    <div v-if="gameData && Object.keys(gameData).length > 0">
      <!-- Contenedor principal con flexbox -->
      <div class="game-header-container">
        <!-- Imagen del juego -->
        <div class="game-image-container">
          <img
              :src="gameData.background_image"
              alt="Imagen del juego"
              class="game-image"
          />
        </div>
        <!-- Información del juego -->
        <div class="game-info-container">
          <div class="game-info-overlay">
            <h1 class="game-title">{{ gameData.name }}</h1>
            <p class="lead">Lanzamiento: {{ gameData.released }}</p>
            <p class="lead">Rating: {{ gameData.rating }} / 5 ({{ gameData.ratings_count }} votos)</p>
          </div>
        </div>
      </div>

      <!-- Opiniones y detalles -->
      <b-row class="mt-4">
        <b-col cols="12" md="8">
          <div class="opinion-container">
            <h3 class="opinion-title">Opiniones</h3>
          </div>

          <b-alert v-if="opinions.length === 0" variant="info" show>
            No hay opiniones disponibles para este juego.
          </b-alert>

          <b-accordion v-else>
            <b-card
                v-for="opinion in opinions"
                :key="opinion.id"
                class="mb-3"
                no-body
            >
              <b-card-header>
                <div class="d-flex justify-content-between">
                  <span><strong>{{ opinion.author }}</strong></span>
                  <div class="stars">
                    <i
                        v-for="n in 5"
                        :key="n"
                        :class="['fa-star', 'fa', n <= opinion.rating ? 'fas' : 'far']"
                    ></i>
                  </div>
                  <div>
                    <b-button
                        type="submit"
                        class="boton-editar"
                        @click="editOpinion(opinion)"
                    >
                      Editar
                    </b-button>
                    <b-button
                        type="submit"
                        class="boton-eliminar"
                        @click="deleteOpinion(opinion.id)"
                    >
                      Eliminar
                    </b-button>
                  </div>
                </div>
              </b-card-header>
              <b-card-body>{{ opinion.text }}</b-card-body>
            </b-card>
          </b-accordion>

          <div class="mt-4 p-4 bg-light rounded shadow-sm">
            <h4>{{ isEditing ? "Editar Opinión" : "Agregar Opinión" }}</h4>
            <b-form @submit.prevent="saveOpinion">
              <b-form-group label="Autor" label-for="authorInput">
                <b-form-input
                    id="authorInput"
                    v-model="opinionToEdit.author"
                    required
                    placeholder="Escribe tu nombre"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Opinión" label-for="opinionInput">
                <b-form-textarea
                    id="opinionInput"
                    v-model="opinionToEdit.text"
                    required
                    rows="3"
                    placeholder="Escribe tu opinión aquí"
                ></b-form-textarea>
              </b-form-group>

              <b-form-group label="Calificación">
                <div class="stars-input">
                  <i
                      v-for="n in 5"
                      :key="n"
                      :class="['fa-star', 'fa', n <= opinionToEdit.rating ? 'fas' : 'far']"
                      @click="setRating(n)"
                  ></i>
                </div>
              </b-form-group>

              <b-button type="submit" class="boton-opinar" block>
                {{ isEditing ? "Actualizar" : "Agregar Opinión" }}
              </b-button>
            </b-form>
          </div>
        </b-col>

        <b-col cols="12" md="4">
          <div class="game-details-container">
            <h3 class="game-details-title">Detalles del Juego</h3>
          </div>
          <ul class="list-group mb-4">
            <li class="list-group-item d-flex justify-content-between">
              <span>Metacritic:</span>
              <strong>{{ gameData.metacritic || "N/A" }}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Géneros:</span>
              <strong>{{ gameData.genres.map((genre) => genre.name).join(", ") }}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Plataformas:</span>
              <strong>{{ gameData.platforms.map((p) => p.platform.name).join(", ") }}</strong>
            </li>
          </ul>

          <b-container fluid class="p-4 custom-capturas-container">
            <h3 class="text-white mb-4">Capturas de Pantalla</h3>
            <b-row>
              <b-col
                  v-for="(screenshot, index) in gameData.short_screenshots"
                  :key="index"
                  cols="6"
                  md="4"
                  lg="3"
                  class="mb-3"
              >
                <a :href="screenshot.image" target="_blank" rel="noopener noreferrer">
                  <b-img
                      thumbnail
                      fluid
                      :src="screenshot.image"
                      :alt="'Captura ' + (index + 1)"
                      class="screenshot-img"
                  ></b-img>
                </a>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </div>

    <div v-else>
      <b-spinner label="Cargando..." class="d-block mx-auto my-4"></b-spinner>
      <p class="text-center text-muted">Cargando datos del juego...</p>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "OpinionesView",
  data() {
    return {
      opinionToEdit: {
        id: null,
        author: "",
        text: "",
        rating: 0, // Inicialización para las estrellas
      },
      isEditing: false, // Determina si estás editando
    };
  },
  computed: {
    gameSlug() {
      return this.$route.params.gameSlug;
    },
    gameData() {
      return this.$store.getters.getGameBySlug(this.gameSlug);
    },
    opinions() {
      return this.$store.state.reviews[this.gameSlug] || [];
    },
  },
  methods: {
    saveOpinion() {
      if (!this.opinionToEdit.author || !this.opinionToEdit.text || this.opinionToEdit.rating === 0) {
        alert("Todos los campos son obligatorios, incluida la calificación.");
        return;
      }
      if (this.isEditing) {
        this.$store.dispatch("updateOpinion", {
          gameSlug: this.gameSlug,
          id: this.opinionToEdit.id,
          updatedOpinion: this.opinionToEdit,
        });
      } else {
        this.$store.dispatch("addOpinion", {
          gameSlug: this.gameSlug,
          opinion: { ...this.opinionToEdit, id: Date.now() },
        });
      }
      this.resetForm();
    },
    setRating(rating) {
      this.opinionToEdit.rating = rating;
    },
    editOpinion(opinion) {
      this.opinionToEdit = { ...opinion };
      this.isEditing = true;
    },
    deleteOpinion(id) {
      this.$store.dispatch("deleteOpinion", { gameSlug: this.gameSlug, id });
    },
    resetForm() {
      this.opinionToEdit = { id: null, author: "", text: "", rating: 0 };
      this.isEditing = false;
    },
  },
};
</script>

<style scoped>
.game-header-container {
  display: flex;
  align-items: stretch;
  gap: 20px;
  margin-top: 20px;
  background: linear-gradient(45deg, rgba(113, 64, 159, 0.99), #182848);
}

.game-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.game-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.game-info-container {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: rgba(18, 18, 18, 0.34);
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgb(0, 0, 0);
}

.game-info-overlay {
  background-color: rgba(0, 0, 0, 0.21);
  padding: 20px;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.98);
}

.game-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.lead {
  font-size: 1.2rem;
  font-weight: 400;
}

/* Contenedor de opiniones */
.opinion-container {
  background-color: darkorange;
  padding: 10px 20px;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 20px;
  display: inline-block;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

.opinion-title {
  color: white;
  margin: 0;
  font-weight: bold;
  font-size: 1.5rem;
}

/* Estilo de las estrellas */
.stars-input .fa-star,
.stars .fa-star {
  font-size: 1.5rem;
  color: #ccc;
  cursor: pointer;
  margin-right: 5px;
}

.stars-input .fa-star:hover,
.stars .fa-star:hover {
  color: orange;
}

.fas.fa-star {
  color: gold;
}

.far.fa-star {
  color: #ccc;
}

/* Detalles del juego */
.game-details-container {
  background-color: #6a11cb;
  color: white;
  padding: 15px 25px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.game-details-title {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Capturas de pantalla */
.custom-capturas-container {
  background-color: darkorange;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.screenshot-img {
  border-radius: 5px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.screenshot-img:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

/* Botones */
.boton-opinar {
  background-color: #6a11cb;
  color: white;
  font-weight: bold;
}

.boton-opinar:hover {
  background-color: darkorange;
  color: black;
}

.boton-editar {
  background-color: darkorange;
  color: black;
  font-weight: bold;
}

.boton-editar:hover {
  background-color: #000000;
  color: #ffffff;
}

.boton-eliminar {
  background-color: red;
  color: white;
  font-weight: bold;
}

.boton-eliminar:hover {
  background-color: #000000;
  color: #ffffff;
}
</style>