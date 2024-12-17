<template>
  <v-container>
    <h1 class="text-h4 white--text">Vista de Administración</h1>
    <AdminSummary
        :user="user"
        @edit-user="editUser"
    />
  </v-container>
</template>

<script>
import AdminSummary from '@/components/AdminSummary.vue';

export default {
  name: 'AdminView',
  components: {
    AdminSummary,
  },
  data() {
    return {
      user: {
        name: 'Juan',
        surname: 'Pérez',
      },
    };
  },
  methods: {
    editUser() {
      console.log('Editar usuario:', this.user);
    },
  },
};
</script>