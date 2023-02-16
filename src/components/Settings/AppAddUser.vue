<template>
  <v-dialog :value="value" persistent max-width="750px">
    <!-- from -->
    <v-form ref="form">
      <v-card width="750px" class="mx-auto card">
        <v-toolbar class="d-flex justify-center" color="header">
          <h2 style="color: white">انشاء مستخدمين</h2>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="12" lg="12">
                <Input
                  @update-value="name = $event"
                  :value="name"
                  icon="mdi-account"
                  color="textI"
                  type="text"
                  label="اسم العميل"
                  :rules="Rules" />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <Input
                  @update-value="userName = $event"
                  :value="userName"
                  icon="mdi-account-circle"
                  type="text"
                  color="textI"
                  label="اسم المستخدم"
                  :rules="userNameRules" />
              </v-col>

              <v-col cols="12" sm="6" md="6" lg="6">
                <Input
                  @update-value="phoneNumber = $event"
                  :value="phoneNumber"
                  color="textI"
                  :rules="Rules"
                  type="number"
                  label="رقم الهاتف"
                  icon="mdi-phone-dial" />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-text-field
                  v-model="password"
                  class="font-weight-black"
                  :type="showPassword ? 'text' : 'password'"
                  label="كلمة المرور"
                  color="textI"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :rules="PasswordsRules" />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-text-field
                  class="font-weight-black"
                  v-model="confirmPassword"
                  color="textI"
                  :type="showPassword ? 'text' : 'password'"
                  label=" تاكيد كلمة المرور"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  prepend-icon="mdi-lock-check"
                  :rules="confirmPasswordRules" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="create_user"
            :loading="loading_add"
            color="btn"
            elevation="4"
            class="px-10">
            <h4 style="color: white; font-size: 17px">اضافة</h4>
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon color="white">mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
          <v-btn color="btnC" class="px-10" v-on:click="$emit('popUser')">
            <h4 style="color: #000000; font-size: 17px">الغاء</h4>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    <!-- end -->
  </v-dialog>
</template>
<script>
  import Input from "../../components/layout/Input.vue";
  export default {
    components: { Input },
    props: {
      value: Boolean,
    },
    data() {
      return {
        name: "",
        userName: "",
        store: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
        userNameRules: [
          (v) => !!v || "هذا الحقل مطلوب",
          (v) => (v || "").length >= 3 || "الحد الادنى لعدد الاحرف هوه 3",
        ],
        PasswordsRules: [
          (v) => !!v || "هذا الحقل مطلوب",
          (v) => (v || "").length >= 6 || "الحد الادنى لعدد الاحرف هوه 6",
        ],
        confirmPasswordRules: [
          (v) => !!v || "هذا الحقل مطلوب",
          (v) => (v || "").length >= 6 || "الحد الادنى لعدد الاحرف هوه 6",
          (v) => v == this.password || "كلمة المرور غير متطابقه",
        ],
        Rules: [(v) => !!v || "هذا الحقل مطلوب"],
      };
    },
    computed: {
      loading_add() {
        return this.$store.state.loading_add;
      },
    },
    methods: {
      create_user() {
        if (this.$refs.form.validate()) {
          let data = {};
          data["name"] = this.name;
          data["user_name"] = this.userName;
          data["name_store"] = this.store;
          data["phone_number"] = this.phoneNumber;
          data["password"] = this.password;
          this.$store.dispatch("add_users", data).then(() => {
            this.$emit("popUser");
            this.$store.dispatch("get_users");
            this.$refs.form.reset();
          });
        }
      },
    },
  };
</script>
