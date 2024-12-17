<template>
  <v-container>
    <v-row class="text-center py-10">
      <v-col>
        <h1 class="text-h4 white--text">404 - Página no encontrada</h1>
        <p class="white--text">La página que buscas no existe.</p>
        <v-btn color="pink" to="/">Volver al Inicio</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NotFoundView',
};
</script>