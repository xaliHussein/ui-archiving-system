<template>
  <v-row class="justify-center">
    <v-col
      v-for="(opation, index) in opations"
      :key="index"
      cols="12"
      sm="6"
      md="6"
      lg="6"
      :class="
        opation.class && width >= 600
          ? 'd-flex justify-end px-7'
          : 'd-flex justify-start px-7'
      "
      :style="width < 600 ? 'justify-content: center !important;' : ''"
      class="mt-8">
      <v-card width="300" class="card" :to="{ name: opation.link }">
        <v-card-title :style="opation.color" class="d-flex justify-center"
          ><font-awesome :icon="['fas', opation.icon]" size="4x"
        /></v-card-title>
        <v-card-title class="d-flex justify-center">
          <h2 class="grey--text">{{ opation.title }}</h2>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    props: {
      opations: {
        type: Array,
        require: true,
      },
    },
    computed: {
      // eslint-disable-next-line vue/return-in-computed-property
      width() {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return 599;
          case "sm":
            return 400;
          case "md":
            return 500;
          case "lg":
            return 600;
        }
      },
    },
  };
</script>
<style scoped>
  .card {
    cursor: pointer;
    box-shadow: 0 5px 15px rgb(0 0 0 / 7%) !important;
    border-radius: 20px;
    transition: all ease 0.2s;
  }
  .card:hover {
    transition: all ease 0.2s;
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgb(0 0 0 / 20%) !important;
  }
  .cards {
    border-radius: 25px;
  }
</style>
