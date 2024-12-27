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
        <div class="gif-box">
          <iframe
              src="https://gifer.com/embed/90aI"
              width="100%"
              height="100%"
              frameborder="0"
              allowfullscreen
          ></iframe>
        </div>
        <div class="gif-box">
          <iframe
              src="https://gifer.com/embed/Ezec"
              width="100%"
              height="100%"
              frameborder="0"
              allowfullscreen
          ></iframe>
        </div>
        <div class="gif-box">
          <iframe
              src="https://gifer.com/embed/Ezec"
              width="100%"
              height="100%"
              frameborder="0"
              allowfullscreen
          ></iframe>
        </div>
        <div class="gif-box">
          <iframe
              src="https://gifer.com/embed/FMDJ"
              width="100%"
              height="100%"
              frameborder="0"
              allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>

    <!-- Tarjetas dinámicas de juegos -->
    <div class="games-container">
      <b-row>
        <b-col
            v-for="(game, index) in games"
            :key="index"
            cols="12"
            md="4"
            lg="3"
            class="mb-4"
        >
          <div class="game-card">
            <img
                :src="game.background_image || placeholderImage"
                alt="Game Image"
                class="game-card-img"
            />
            <div class="game-card-body">
              <h3 class="game-card-title">{{ game.name }}</h3>
              <p class="game-card-text">
                Lanzamiento: <strong>{{ game.released || "N/A" }}</strong>
              </p>
              <div class="game-card-actions">
                <button class="btn-primary" @click="navigateToOpinions(game.slug)">
                  Opinar
                </button>
                <button
                    class="btn-heart"
                    @click="toggleLike(game.id)"
                    :class="{ liked: userLikes.includes(game.id) }"
                >
                  <i :class="userLikes.includes(game.id) ? 'fas fa-heart' : 'far fa-heart'"></i>
                </button>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>

    <b-alert v-if="games.length === 0" variant="info" show>
      No hay juegos disponibles en este momento.
    </b-alert>

    <!-- Modal de Confirmación -->
    <div v-if="showHeartModal" class="custom-modal-overlay">
      <div class="custom-modal">
        <h2>Verificar Datos</h2>
        <p>Para ver la información ingresa tus datos</p>
        <button class="btn-primary" @click="openLoginForm">Ingresar Datos</button>
        <button class="btn-secondary" @click="closeHeartModal">Cerrar</button>
      </div>
    </div>

    <!-- Modal de Login -->
    <div v-if="showLoginForm" class="custom-modal-overlay">
      <div class="custom-modal">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="nameInput">Nombre</label>
            <input
                v-model="loginForm.name"
                id="nameInput"
                type="text"
                class="form-input"
                required
                placeholder="Ingresa tu nombre"
            />
          </div>
          <div class="form-group">
            <label for="surnameInput">Apellido</label>
            <input
                v-model="loginForm.surname"
                id="surnameInput"
                type="text"
                class="form-input"
                required
                placeholder="Ingresa tu apellido"
            />
          </div>
          <div class="modal-actions">
            <button type="submit" class="btn-primary">Ingresar</button>
            <button type="button" class="btn-secondary" @click="closeLoginForm">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      placeholderImage: "https://via.placeholder.com/300x300?text=No+Image",
      likedGames: [],
      loginForm: {
        name: "",
        surname: "",
      },
      showHeartModal: false,
      showLoginForm: false,
    };
  },
  computed: {
    games() {
      return this.$store.getters.allGames;
    },
    userLikes() {
      return this.$store.getters.currentUserLikes;
    },
  },
  methods: {
    navigateToOpinions(gameName) {
      this.$router.push(`/opiniones/${gameName}`);
    },
    toggleLike(gameId) {
      if (!this.$store.getters.isLoggedIn) {
        this.showHeartModal = true; // Abre el modal si el usuario no está autenticado
      } else {
        try {
          this.$store.dispatch("toggleLike", gameId); // Envia la acción para alternar el like
        } catch (error) {
          alert(error.message); // Maneja errores (usuario no autenticado, etc.)
        }
      }
    },
    openLoginForm() {
      this.showHeartModal = false;
      this.showLoginForm = true; // Abre el formulario
    },
    closeHeartModal() {
      this.showHeartModal = false;
    },
    closeLoginForm() {
      this.showLoginForm = false;
    },
    handleLogin() {
      if (this.loginForm.name && this.loginForm.surname) {
        const username = `${this.loginForm.name} ${this.loginForm.surname}`;
        this.$store.dispatch("registerUser", username);
        alert(`Bienvenido, ${username}`);
        console.log(this.$store)
        this.closeLoginForm();
      } else {
        alert("Por favor, completa todos los campos.");
      }
    },
  },
  created() {
    this.$store.dispatch("fetchGames");
  },
};
</script>

<style scoped>
/* Estilos generales ya existentes */
.black-container {
  background-color: #000000;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}
.title-container {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #1e1e2d;
  border-radius: 8px;
  text-align: center;
}
.gifs-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 15px;
  margin-top: 10px;
}
.gif-box {
  flex: 1;
  max-width: 150px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background-color: #1e1e2d;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}
.game-card {
  background-color: #1e1e2d;
  color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(255, 128, 171, 0.3);
}
.game-card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
/* Botón del corazón */
/* Botón del corazón */
.btn-heart {
  background-color: transparent;
  border: 2px solid #aaa; /* Borde del cuadradito */
  font-size: 18px;
  color: #aaa;
  width: 35px; /* Tamaño del cuadradito */
  height: 35px; /* Tamaño del cuadradito */
  border-radius: 8px; /* Esquinas redondeadas del cuadradito */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px; /* Espacio entre el botón de opinar y el corazón */
  cursor: pointer;
  transition: all 0.3s ease; /* Suaviza las transiciones */
}

.btn-heart.liked {
  background-color: #ff0000; /* Fondo rojo para liked */
  border-color: #ff0000; /* Borde rojo */
  color: white; /* Icono blanco */
}

.btn-heart:hover {
  background-color: #ff6666; /* Un tono más claro de rojo al hacer hover */
  border-color: #ff6666;
}

/* Ajustes del contenedor de acciones */
.game-card-actions {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px; /* Espaciado entre el botón de opinar y el corazón */
}
/* Ajustes del contenedor de acciones */
.game-card-actions {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Asegura que los botones estén alineados a la izquierda */
  gap: 10px; /* Espaciado entre los botones */
}
/* Modal general */
.custom-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.custom-modal {
  background: #1e1e2d;
  color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  width: 400px;
  max-width: 90%;
  text-align: center;
}

.custom-modal h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

/* Estilo de los campos del formulario */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-size: 14px;
  color: #aaa;
  margin-bottom: 5px;
  display: block;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 6px;
  background-color: #2a2a3c;
  color: white;
  font-size: 14px;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: #aaa;
  font-size: 12px;
}

/* Acciones del modal */
.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.btn-primary {
  background-color: #6a11cb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary:hover {
  background-color: #4c10a3;
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-secondary:hover {
  background-color: #6a11cb;
  border-color: #6a11cb;
  color: white;
}
</style>