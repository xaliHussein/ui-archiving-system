<template>
  <v-container class="login" fluid>
    <v-row class="justify-center">
      <v-col cols="12" md="6" lg="6" class="margin-card">
        <v-form ref="form">
          <v-card width="90%" class="mx-auto pb-3" elevation="24">
            <v-card-title class="justify-center">
              <h2>تسجيل الدخول</h2>
            </v-card-title>
            <v-card-text>
              <v-text-field
                color="textI"
                class="font-weight-black"
                v-model="userName"
                :rules="userNameRules"
                label="اسم المستخدم"
                prepend-icon="mdi-account-circle" />

              <v-text-field
                color="textI"
                v-model="password"
                class="font-weight-black"
                :type="showPassword ? 'text' : 'password'"
                label="كلمة المرور"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :rules="PasswordsRules" />
            </v-card-text>
            <v-card-actions>
              <v-btn
                @click="login"
                :loading="loading_login"
                color="btnI"
                block
                elevation="4">
                <h4 style="color: var(--v-btnI); font-size: 17px">تسجيل</h4>
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon color="white">mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    data: () => ({
      userName: null,
      password: null,
      showPassword: false,
      userNameRules: [
        (value) => !!value || "هذا الحقل مطلوب",
        (value) => (value || "").length >= 3 || "الحد الادنى لعدد الاحرف هوه 3",
      ],
      PasswordsRules: [
        (value) => !!value || "هذا الحقل مطلوب",
        (value) => (value || "").length >= 6 || "الحد الادنى لعدد الاحرف هوه 6",
      ],
    }),
    computed: {
      loading_login() {
        return this.$store.state.loading_login;
      },
    },
    methods: {
      login() {
        if (this.$refs.form.validate()) {
          let data = {};
          (data["user_name"] = this.userName),
            (data["password"] = this.password),
            this.$store.dispatch("login", data).then(() => {
              this.$router.push({ name: "home" });
              location.reload();
            });
        }
      },
    },
  };
</script>
<style scoped>
  .margin-card {
    margin-top: 110px;
  }
  .login {
    background-image: url("../assets/images/background.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    height: 100%;
  }
</style>
