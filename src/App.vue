<template>
  <v-app>
    <v-main>
      <Header v-if="loggedIn" />
      <SnackBar v-if="snackBar" :snack_message="snack_message" />
      <Lodding :loading="loading" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import SnackBar from "./components/SnackBar.vue";
  import Header from "./components/Header.vue";
  import Lodding from "./components/Lodding.vue";
  export default {
    name: "App",
    components: { SnackBar, Header, Lodding },
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
    },
  };
</script>
<style>
  #app {
    font-family: "Cairo", sans-serif;
    background-color: #012059;
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
