<template>
  <div class="footer-custom">
    <b-container>
      <b-row>
        <b-col class="text-center">
          <p>© 2024 Magdalena Inalaf - Todos los derechos reservados</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>

.footer-custom {
  background: linear-gradient(45deg, rgba(113, 64, 159, 0.99), #182848) !important;
  font-family: 'Roboto', sans-serif;
  color: #ffffff;
  padding: 20px 0;
  font-size: 14px;
}

.footer-custom p {
  margin: 0;
}
</style>