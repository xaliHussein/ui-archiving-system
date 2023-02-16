<template>
  <v-container fluid>
    <v-card class="mx-auto mt-5" width="95%">
      <v-row class="d-flex justify-center">
        <v-col cols="12" sm="12" md="3" lg="3">
          <v-card :width="width" :height="height" class="mx-auto card">
            <v-list dense>
              <v-list-item-group
                v-model="selectedcard"
                active-class="border"
                mandatory
                color="list">
                <template v-for="(item, i) in items">
                  <v-list-item
                    :key="i"
                    v-if="user_name == 'admin'"
                    class="py-3"
                    @click="selectedcard = i">
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title style="line-height: 20px">
                        <h3>{{ item.text }}</h3></v-list-item-title
                      >
                    </v-list-item-content>
                    <v-list-item-action v-if="i == 2">
                      <v-switch
                        v-model="mode"
                        color="blue"
                        @click="setTheme(mode)"
                        inset></v-switch>
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="8" lg="8">
          <v-card class="card" height="100%" v-if="selectedcard == 0"
            ><AppUserName
          /></v-card>
          <v-card class="card" height="100%" v-else-if="selectedcard == 1"
            ><ChangePassword
          /></v-card>
          <v-card class="card" height="100%" v-if="selectedcard == 2"
            ><AppUserName
          /></v-card>
          <v-card class="card" height="100%" v-if="selectedcard == 3"
            ><Users
          /></v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
  import AppUserName from "../components/Settings/UserName.vue";
  import ChangePassword from "../components/Settings/ChangePassword.vue";
  import Users from "../components/Settings/Users.vue";
  export default {
    components: { AppUserName, ChangePassword, Users },
    data() {
      return {
        selectedcard: 0,
        mo: true,
        items: [
          { text: "اسم المستخدم", icon: "mdi-account" },
          { text: "كلمة المرور", icon: "mdi-lock" },
          { text: "الوضع الليلي", icon: "mdi-weather-night" },
          { text: "ادارة الحسابات", icon: "mdi-account" },
        ],
      };
    },

    computed: {
      mode() {
        return this.$store.state.mode;
      },
      user_name() {
        return this.$store.state.user_name;
      },
      // eslint-disable-next-line vue/return-in-computed-property
      height() {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return "100%";
          case "sm":
            return "100%";
          case "md":
            return 480;
          case "lg":
            return 480;
          case "xl":
            return 480;
        }
      },
      // eslint-disable-next-line vue/return-in-computed-property
      width() {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return 900;
          case "sm":
            return 900;
          case "md":
            return 600;
          case "lg":
            return 600;
          case "xl":
            return 600;
        }
      },
    },
    methods: {
      setTheme(val) {
        console.log(val);
        if (val == false) {
          this.$store.state.mode = true;
          const mode = (this.$vuetify.theme.dark = true);
          localStorage.setItem("dark_theme", JSON.stringify(mode));
        } else {
          this.$store.state.mode = false;
          const mode = (this.$vuetify.theme.dark = false);
          localStorage.setItem("dark_theme", JSON.stringify(mode));
        }
      },
    },
  };
</script>
<style scoped>
  .mx-auto {
    box-shadow: 0px 0px 0px 0px !important;
    border-radius: 25px;
  }
  .card {
    box-shadow: 0px 0px 0px 0px !important;
    border: 2px solid #353437;
    border-radius: 25px;
  }

  .v-list-item--active::before {
    border-radius: 25px;
  }
  .v-list-item__action {
    margin: 0 0;
  }
  .v-application .list--text {
    color: var(--v-list) !important;
  }
</style>
