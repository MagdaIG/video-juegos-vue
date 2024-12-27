import { createStore } from 'vuex';
import persistStore from "./plugins/vuex-persist";

export default createStore({
    state: {
        games: [], // Lista dinámica de juegos
        loading: false, // Estado de carga
        error: null, // Manejo de errores
        reviews: {}, // Diccionario de opiniones por slug
        users: {},
        currentUser: "",
    },
    mutations: {
        removeCoinFromGame(state, { gameSlug, username }) {
            const user = state.users[username];
            if (!user) return;

            if (user.likes.includes(gameSlug) && user.coinsByGame[gameSlug] > 0) {
                user.coinsByGame[gameSlug] -= 1; // Reducir monedas asignadas al juego
                user.coins += 1; // Restaurar moneda al total disponible
            }
        },
        registerUser(state, username) {
            if (!state.users[username]) {
                state.users[username] = { likes: [], coins: 50, coinsByGame: [] }; // Inicializa al usuario con un array vacío de likes
            }
        },
        setCurrentUser(state, username) {
            state.currentUser = username;
        },
        logoutUser(state) {
            state.currentUser = "";
        },
        setGames(state, games) {
            state.games = games;
        },
        setLoading(state, status) {
            state.loading = status;
        },
        setError(state, error) {
            state.error = error;
        },
        addLike(state, { gameSlug, username }) {
            const user = state.users[username];
            if (!user) {
                state.users[username] = { likes: [], coins: 50, coinsByGame: {} };
            }

            const likes = state.users[username].likes;
            const likeIndex = likes.indexOf(gameSlug);

            if (likeIndex === -1) {
                // Agregar el juego a "likes"
                likes.push(gameSlug);
                user.coinsByGame[gameSlug] = 0; // Inicializar las monedas asignadas a 0
            } else {
                // Eliminar el juego de "likes"
                likes.splice(likeIndex, 1);
                const coinsToRestore = user.coinsByGame[gameSlug];
                user.coins += coinsToRestore; // Restaurar monedas al total
                delete user.coinsByGame[gameSlug]; // Eliminar el registro del juego
            }
        },
        addCoinToGame(state, { gameSlug, username }) {
            const user = state.users[username];
            if (!user) return;

            if (user.likes.includes(gameSlug) && user.coins > 0) {
                user.coins -= 1; // Restar una moneda del total
                user.coinsByGame[gameSlug] += 1; // Sumar una moneda al juego
            }
        },
        addOpinion(state, { gameSlug, opinion }) {
            if (!state.reviews[gameSlug]) {
                state.reviews[gameSlug] = [];
            }
            state.reviews[gameSlug].push(opinion);
        },
        updateOpinion(state, { gameSlug, id, updatedOpinion }) {
            const opinions = state.reviews[gameSlug];
            if (opinions) {
                const index = opinions.findIndex((op) => op.id === id);
                if (index !== -1) {
                    state.reviews[gameSlug][index] = {
                        ...state.reviews[gameSlug][index],
                        ...updatedOpinion,
                    };
                }
            }
        },
        deleteOpinion(state, { gameSlug, id }) {
            if (state.reviews[gameSlug]) {
                state.reviews[gameSlug] = state.reviews[gameSlug].filter((op) => op.id !== id);
            }
        },
    },
    actions: {
        removeCoinFromGame({ commit, state }, gameSlug) {
            const currentUser = state.currentUser;
            if (currentUser) {
                commit("removeCoinFromGame", { gameSlug, username: currentUser });
            } else {
                throw new Error("El usuario no está autenticado.");
            }
        },
        addCoinToGame({ commit, state }, gameSlug) {
            const currentUser = state.currentUser;
            if (currentUser) {
                commit("addCoinToGame", { gameSlug, username: currentUser });
            } else {
                throw new Error("El usuario no está autenticado.");
            }
        },
        toggleLike({ state, commit }, gameId) {
            const currentUser = state.currentUser;
            if (currentUser) {
                commit("addLike", { gameSlug: gameId, username: currentUser });
            } else {
                throw new Error("El usuario no está autenticado.");
            }
        },
        login({ commit }, username) {
            commit("setCurrentUser", username);
        },
        logout({ commit }) {
            commit("logoutUser");
        },
        registerUser({ state, commit }, username) {
            if (!state.users[username]) {
                commit("registerUser", username);
            }
            commit("setCurrentUser", username);
        },
        async fetchGames({ commit }) {
            commit("setLoading", true); // Inicia el estado de carga
            commit("setError", null); // Limpia errores anteriores

            try {
                const apiKey = process.env.VUE_APP_RAWG_API_KEY;
                const response = await fetch(
                    `https://api.rawg.io/api/games?key=${apiKey}`
                );
                if (!response.ok) {
                    throw new Error("Error al obtener juegos de la API");
                }
                const data = await response.json();
                commit("setGames", data.results); // Guarda los juegos en el estado
            } catch (error) {
                console.error("Error en fetchGames:", error.message);
                commit("setError", error.message); // Guarda el error en el estado
            } finally {
                commit("setLoading", false); // Finaliza el estado de carga
            }
        },

        // Nueva acción para buscar juegos por query
        async searchGames({ commit }, query) {
            commit("setLoading", true);
            commit("setError", null);

            try {
                const apiKey = process.env.VUE_APP_RAWG_API_KEY;
                const response = await fetch(
                    `https://api.rawg.io/api/games?search=${query}&key=${apiKey}`
                );
                if (!response.ok) {
                    throw new Error("Error al buscar juegos en la API");
                }
                const data = await response.json();
                commit("setGames", data.results); // Actualiza los juegos en el estado
            } catch (error) {
                console.error("Error en searchGames:", error.message);
                commit("setError", error.message);
            } finally {
                commit("setLoading", false);
            }
        },
        addLike({ commit, state }, payload) {
            if (state.currentUser) {
                commit("addLike", { ...payload, username: state.currentUser });
            }
        },
        addOpinion({ commit }, payload) {
            commit("addOpinion", payload);
        },
        updateOpinion({ commit }, payload) {
            commit("updateOpinion", payload);
        },
        deleteOpinion({ commit }, payload) {
            commit("deleteOpinion", payload);
        },
    },
    getters: {
        currentUserCoins(state) {
            const currentUser = state.currentUser;
            return currentUser && state.users[currentUser]
                ? state.users[currentUser].coins
                : 0;
        },
        coinsByGame(state) {
            const currentUser = state.currentUser;
            return currentUser && state.users[currentUser]
                ? state.users[currentUser].coinsByGame
                : {};
        },
        currentUserLikes(state) {
            const currentUser = state.currentUser;
            if (currentUser && state.users[currentUser]) {
                return state.users[currentUser].likes || [];
            }
            return [];
        },
        currentUser(state) {
            return state.currentUser;
        },
        isLoggedIn(state) {
            return !!state.currentUser;
        },
        getCurrentUserLikes: (state) => {
            if (state.currentUser && state.users[state.currentUser]) {
                return state.users[state.currentUser].likes || [];
            }
            return [];
        },
        allGames(state) {
            return state.games;
        },
        isLoading(state) {
            return state.loading;
        },
        fetchError(state) {
            return state.error;
        },
        getOpinionsById: (state) => (slug) => {
            if (state.reviews && state.reviews[slug]) {
                return state.reviews[slug];
            }
            return [];
        },
        getGameBySlug: (state) => (slug) => {
            return state.games.find((game) => game.slug === slug);
        },
    },
    plugins: [persistStore],
});