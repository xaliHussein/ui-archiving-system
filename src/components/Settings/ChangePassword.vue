<template>
  <v-row>
    <v-col cols="12" sm="12" md="12" lg="12">
      <v-card width="750px" class="mx-auto card">
        <v-card-title class="d-flex justify-center"
          >تغير كلمة المرور</v-card-title
        >
        <v-divider style="background-color: #353437"></v-divider>
        <v-form ref="form">
          <v-card-text class="mt-1">
            <v-row class="pa-0 ma-0">
              <v-col cols="12" class="pt-0">
                <v-text-field
                  class="font-weight-black"
                  v-model="old_password"
                  color="textI"
                  type="text"
                  label="كلمة المرور القديمه"
                  prepend-icon="mdi-lock-open"
                  :rules="PasswordsRules" />
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  class="font-weight-black"
                  v-model="new_password"
                  color="textI"
                  :type="showPassword ? 'text' : 'password'"
                  label="كلمة المرور الجديده"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :rules="PasswordsRules" />
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  class="font-weight-black"
                  v-model="confirm_password"
                  color="textI"
                  :type="showPassword ? 'text' : 'password'"
                  label="تاكيد كلمة المرور"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :rules="confirmPasswordRules" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn
              block
              elevation="2"
              color="btnI"
              :loading="loading"
              @click="passwordChange">
              <h4 style="color: white; font-size: 17px">حفظ</h4>
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon color="white">mdi-cached</v-icon>
                </span>
              </template>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    data() {
      return {
        old_password: "",
        new_password: "",
        confirm_password: "",
        showPassword: false,
        PasswordsRules: [
          (value) => !!value || "هذا الحقل مطلوب",
          (v) => (v || "").length >= 6 || "الحد الادنى لعدد الاحرف هوه 6",
        ],
        confirmPasswordRules: [
          (value) => !!value || "هذا الحقل مطلوب",
          (v) => (v || "").length >= 6 || "الحد الادنى لعدد الاحرف هوه 6",
          (value) => value == this.new_password || "كلمة المرور غير متطابقه",
        ],
      };
    },
    computed: {
      loading() {
        return this.$store.state.settings.loading;
      },
    },
    methods: {
      passwordChange() {
        if (this.$refs.form.validate()) {
          let data = {};
          data["old_password"] = this.old_password;
          data["new_password"] = this.new_password;
          this.$store.dispatch("settings/password_change", data);
          this.$refs.form.reset();
        }
      },
    },
  };
</script>
<style scoped>
  .card {
    box-shadow: 0px 0px 0px 0px !important;
  }
</style>
