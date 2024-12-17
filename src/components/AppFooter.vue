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
/* Footer personalizado */
.footer-custom {
  background-color: #6a11cb;
  color: #ffffff;
  padding: 20px 0;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
}

.footer-custom p {
  margin: 0;
}
</style>