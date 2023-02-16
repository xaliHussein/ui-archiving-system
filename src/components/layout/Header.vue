<template>
  <v-app-bar color="header" dark class="header">
    <v-toolbar-title>AR files</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon @click="logout" v-bind="attrs" v-on="on">
          <font-awesome :icon="['fas', 'fa-right-from-bracket']" size="xl" />
        </v-btn>
      </template>

      <span>خروج</span>
    </v-tooltip>
  </v-app-bar>
</template>
<script>
  export default {
    data() {
      return {
        switch1: false,
      };
    },
    methods: {
      logout() {
        this.$store.dispatch("logout");
      },

      setTheme(val) {
        if (val == true) {
          this.$vuetify.theme.dark = true;
        } else {
          this.$vuetify.theme.dark = false;
        }
      },
    },
  };
</script>
<style scoped>
  .header {
    direction: ltr;
  }
</style>
