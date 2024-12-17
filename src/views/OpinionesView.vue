<template>
  <b-container>
    <!-- Verificar si los datos del juego están disponibles -->
    <div v-if="gameData && Object.keys(gameData).length > 0">
      <!-- Encabezado con imagen de fondo -->
      <div
          class="game-header text-center text-white py-5"
          :style="{ backgroundImage: `url(${gameData.background_image})` }"
      >
        <div class="overlay">
          <h1 class="display-4">{{ gameData.name }}</h1>
          <p class="lead">Lanzamiento: {{ gameData.released }}</p>
          <p class="lead">Rating: {{ gameData.rating }} / 5 ({{ gameData.ratings_count }} votos)</p>
        </div>
      </div>

      <!-- Información adicional -->
      <b-row class="mt-4">
        <!-- Opiniones -->
        <b-col cols="12" md="8">
          <div class="opinion-container">
            <h3 class="opinion-title">Opiniones</h3>
          </div>
          <!-- Lista de opiniones -->
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
                  <!-- Estrellas en las opiniones --> <!-- Formulario de Opiniones -->
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

                  <!-- Mostrar estrellas en opiniones -->
                  <div class="stars">
                    <i
                        v-for="n in 5"
                        :key="n"
                        :class="['fa-star', 'fa', n <= opinion.rating ? 'fas' : 'far']"
                    ></i>
                  </div>

                  <div>
                    <b-button type="submit" class="boton-editar" @click="editOpinion(opinion)">
                      Editar
                    </b-button>
                    <b-button type="submit" class="boton-eliminar" @click="deleteOpinion(opinion.id)">
                      Eliminar
                    </b-button>
                  </div>
                </div>
              </b-card-header>
              <b-card-body>{{ opinion.text }}</b-card-body>
            </b-card>
          </b-accordion>

          <!-- Formulario de Opiniones -->
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

              <!-- Calificación por estrellas -->
              <b-form-group label="Calificación">
                <div class="stars-input">
                  <i v-for="n in 5"
                     :key="n"
                     :class="['star', n <= opinionToEdit.rating ? 'filled' : '']"
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

        <!-- Detalles del Juego -->
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

          <!-- Capturas de Pantalla -->
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

    <!-- Mensaje de carga -->
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
        rating: 0, // Nueva propiedad para calificación
      },
      isEditing: false, // Estado para editar o agregar
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
    // Guardar o actualizar una opinión
    saveOpinion() {
      if (!this.opinionToEdit.author || !this.opinionToEdit.text || this.opinionToEdit.rating === 0) {
        alert("Todos los campos son obligatorios, incluida la calificación.");
        return;
      }

      if (this.isEditing) {
        // Actualizar opinión existente
        this.$store.dispatch("updateOpinion", {
          gameSlug: this.gameSlug,
          id: this.opinionToEdit.id,
          updatedOpinion: this.opinionToEdit,
        });
      } else {
        // Agregar nueva opinión
        this.$store.dispatch("addOpinion", {
          gameSlug: this.gameSlug,
          opinion: { ...this.opinionToEdit, id: Date.now() },
        });
      }

      this.resetForm();
    },
    // Establecer calificación con estrellas
    setRating(rating) {
      this.opinionToEdit.rating = rating;
    },
    // Editar una opinión existente
    editOpinion(opinion) {
      this.opinionToEdit = { ...opinion };
      this.isEditing = true;
    },
    // Eliminar una opinión
    deleteOpinion(id) {
      this.$store.dispatch("deleteOpinion", { gameSlug: this.gameSlug, id });
    },
    // Restablecer formulario
    resetForm() {
      this.opinionToEdit = { id: null, author: "", text: "", rating: 0 };
      this.isEditing = false;
    },
  },
};
</script>
<style scoped>
.game-header {
  background-size: cover;
  background-position: center;
  position: relative;
  margin-top: 20px;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 30px;
  border-radius: 10px;
}

.opinion-form {
  max-width: 500px;
  margin: 0 auto;
}

.opinion-container {
  background-color: darkorange;
  padding: 10px 20px;
  border-radius: 5px;
  text-align: center;
  display: inline-block;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: default;
  margin-bottom: 10px;
}

.opinion-title {
  color: white;
  margin: 0;
  font-weight: bold;
}
.game-details-container {
  background-color: #6a11cb;
  color:white;
  padding: 15px 25px;
  border-radius: 10px;
  text-align: center;
  display: inline-block;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: default;
  font-family: 'Arial', sans-serif;
 margin-bottom: 20px;
}

.game-details-title {
  color: white;
  margin: 0;
  font-weight: bold;
  font-size: 1.5rem;
}


.boton-opinar{
  background-color: #6a11cb;
  color: white;
}

.boton-opinar:hover {
  background-color: darkorange;
  color: black;
}

  .boton-editar{
    background-color: darkorange;
    color: black;
  }
.boton-editar:hover {
  background-color: #000000;
  color: #ffffff;
}

.boton-eliminar{
  background-color: red;
  color: black;
}
.boton-eliminar:hover {
  background-color: #000000;
  color: #ffffff;
}

.custom-capturas-container {
  background-color: darkorange;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.stars-input .star,
.stars .star {
  font-size: 1.5rem;
  color: #ccc; /* Color por defecto */
  cursor: pointer; /* Mostrar el puntero al pasar el mouse */
  margin-right: 5px; /* Espacio entre estrellas */
}

.stars-input .star:hover,
.stars-input .star:active {
  color: orange;
}

.stars-input .star.filled,
.stars .star.filled {
  color: gold;
}
</style>