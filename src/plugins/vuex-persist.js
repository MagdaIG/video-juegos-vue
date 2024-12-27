// plugins/vuex-persist.js
export default function persistStore(store) {
    // Cargar el estado desde localStorage al iniciar
    const savedState = JSON.parse(localStorage.getItem("vuexState"));
    if (savedState) {
        store.replaceState(Object.assign(store.state, savedState));
    }

    // Escuchar cambios en el estado y guardarlos en localStorage
    store.subscribe((mutation, state) => {
        localStorage.setItem("vuexState", JSON.stringify(state));
    });
}