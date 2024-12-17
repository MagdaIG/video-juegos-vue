<template>
  <v-app>
    <v-main>
      <v-container>
        <h1>Hello World con Vuetify</h1>
        <v-btn color="primary" @click="sayHello">¡Haz clic aquí!</v-btn>
      </v-container>
      <v-container>
        <div class="container mt-5">
          <b-card show variant="info">¡BootstrapVue3 está funcionando!</b-card>
          <b-button variant="primary" @click="sayHello">¡Haz clic aquí!</b-button>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  methods: {
    sayHello() {
      alert('¡Hola Mundo!');
    },
  },
};
</script>

<style>
/* Puedes agregar estilos personalizados aquí si lo deseas */
</style>