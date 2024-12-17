<template>
  <v-card class="pa-4" color="grey darken-3">
    <h2 class="text-h5 white--text">Resumen del Usuario</h2>
    <p class="white--text">Nombre: {{ user.name }}</p>
    <p class="white--text">Apellido: {{ user.surname }}</p>
    <v-btn color="pink" dark @click="editUser">Editar Usuario</v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'AdminSummary',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    editUser() {
      this.$emit('edit-user'); // Emite el evento para editar usuario
    },
  },
};
</script>

<style scoped>
.white--text {
  font-size: 16px;
}
</style>