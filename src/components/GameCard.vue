<template>
  <v-card class="mx-auto" max-width="400" color="grey darken-3">
    <v-img :src="game.background_image" height="200px"></v-img>
    <v-card-title class="white--text">{{ game.name }}</v-card-title>
    <v-card-subtitle class="text-pink">
      {{ game.platforms[0]?.platform.name || 'Unknown' }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn color="pink" dark @click="$emit('opinar', game.name)">
        Opinar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.text-pink {
  font-size: 14px;
}
</style>