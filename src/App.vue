<template>
  <v-app class="font">
    <v-main>
      <Header v-if="loggedIn" />
      <SnackBar v-if="snackBar" :snack_message="snack_message" />
      <Lodding :loading="loading" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import SnackBar from "./components/layout/SnackBar.vue";
  import Header from "./components/layout/Header.vue";
  import Lodding from "./components/layout/Lodding.vue";
  export default {
    name: "App",
    components: { SnackBar, Header, Lodding },
    mounted() {
      const theme = localStorage.getItem("dark_theme");
      if (theme) {
        if (theme === "true") {
          this.$vuetify.theme.dark = true;
        } else {
          this.$vuetify.theme.dark = false;
        }
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        this.$vuetify.theme.dark = true;
        localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
      }
    },
    computed: {
      snack_message() {
        return this.$store.state.snack_message;
      },
      snackBar() {
        return this.$store.getters.snack_bar;
      },
      loggedIn() {
        return this.$store.state.user_name;
      },
      loading() {
        return this.$store.state.loading;
      },
      theme() {
        return this.$vuetify.theme.dark ? "dark" : "light";
      },
    },
  };
</script>
<style>
  #app {
    font-family: "Cairo", sans-serif;
  }

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
