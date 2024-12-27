import { createStore } from 'vuex';

export default createStore({
    state: {
        games: [], // Lista dinámica de juegos
        loading: false, // Estado de carga
        error: null, // Manejo de errores
        reviews: {}, // Diccionario de opiniones por slug
    },
    mutations: {
        setGames(state, games) {
            state.games = games;
        },
        setLoading(state, status) {
            state.loading = status;
        },
        setError(state, error) {
            state.error = error;
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
});