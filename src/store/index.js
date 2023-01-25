import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import pdf from "./modules/pdf";
import archive from "./modules/archive";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    server: "http://127.0.0.1:8000",
    user_name: localStorage.getItem("user_name"),
    user_id: localStorage.getItem("user_id"),
    status: localStorage.getItem("status"),
    type: localStorage.getItem("type"),
    snack_message: {},
    userQuery: "",
    pageCount: 1,
    param: {
      sortBy: [],
      sortDesc: [],
      page: 1,
      itemsPerPage: 10,
    },
    snack_bar: false,
    loading_button_login: false,
    loading: false,
  },

  mutations: {
    LOGIN_USER(state, data) {
      state.user_name = data.result[0].user_name;
      state.activation = data.result[0].user_id;
      state.activation = data.result[0].status;
      state.activation = data.result[0].type;
    },
    CLEAR_USER() {
      localStorage.removeItem("token");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_id");
      localStorage.removeItem("status");
      localStorage.removeItem("type");
      location.reload();
    },
    SNACK_MESSAGE(state, snack_message) {
      state.snack_message = snack_message;
      state.snack_bar = true;
    },
    TIME_OUT(state) {
      state.snack_bar = false;
      state.snack_message = null;
    },
    GET_USERS(state, users) {
      state.users.splice(0, state.users.length);
      users.forEach((element) => {
        state.users.push(element);
      });
    },
    ADD_USERS(state, users) {
      state.users.push(users);
    },
  },
  actions: {
    login({ commit, state }, data) {
      return new Promise((resolve) => {
        state.loading_button_login = true;
        axios({
          url: `${state.server}` + "/api/login",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
        })
          .then((response) => {
            console.log(response.data.result);
            const token = response.data.token;
            const data = response.data;
            commit("LOGIN_USER", data);
            state.loading_button_login = false;
            Vue.prototype.$http.defaults.headers.common["Authorization"] =
              "Bearer " + token;
            localStorage.setItem("token", token);
            localStorage.setItem("user_name", data.result[0].user_name);
            localStorage.setItem("user_id", data.result[0].id);

            resolve(response);
          })
          .catch(() => {
            state.loading_button_login = false;
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "ادخلت اسم مستخدم او كلمة مرور غير صحيحه";
            commit("SNACK_MESSAGE", snack_message);
            setTimeout(() => {
              commit("TIME_OUT", snack_message);
            }, 4000);
          });
      });
    },
    add_users({ commit, state }, data) {
      return new Promise((resolve) => {
        state.loading_button = true;
        axios({
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
        })
          .then((response) => {
            commit("ADD_USERS", response.data.result[0]);
            state.loading_button = false;
            let snack_message = {};
            snack_message["color"] = "green darken-1";
            snack_message["icon"] = "checkbox-marked-circle";
            snack_message["text"] = "تم انشاء الحساب بنجاح";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
            resolve(response);
          })
          .catch(() => {
            state.loading_button = false;
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "حدث مشكلة في الاتصال بالخادم";
            commit("SNACK_MESSAGE", snack_message);
            setTimeout(() => {
              commit("TIME_OUT", snack_message);
            }, 4000);
          });
      });
    },
    get_users({ commit, state }) {
      let data = state.param;
      state.table_loading = true;
      return new Promise((resolve) => {
        let skip = (data.page - 1) * data.itemsPerPage;
        let limit = data.itemsPerPage;
        let query = "";
        if (
          state.userQuery != undefined &&
          state.userQuery != null &&
          state.userQuery.length > 0
        )
          query = `&query=${state.userQuery}`;
        // console.log(data)
        axios({
          url:
            `${state.server}` +
            "/api/get_users" +
            "?skip=" +
            skip +
            "&limit=" +
            limit +
            query,
          method: "get",
        })
          .then((response) => {
            state.pageCount = response.data.count;
            commit("GET_USERS", response.data.result);
            state.table_loading = false;
            resolve(response);
          })
          .catch(() => {
            state.table_loading = false;
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "حدث مشكلة في الاتصال بالخادم";
            commit("SNACK_MESSAGE", snack_message);
            setTimeout(() => {
              commit("TIME_OUT", snack_message);
            }, 4000);
          });
      });
    },
    logout({ commit }) {
      commit("CLEAR_USER");
    },
    user_status_change({ commit, state }, data) {
      return new Promise((resolve) => {
        state.table_loading = true;
        axios({
          url: `${state.server}` + "/api/User_status_change",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "put",
        })
          .then((response) => {
            commit("USER_STATUS_CHANGE", response.data.result[0]);
            state.table_loading = false;
            let snack_message = {};
            snack_message["color"] = "green darken-1";
            snack_message["icon"] = "checkbox-marked-circle";
            snack_message["text"] = "تم تغير حاله المستخدم بنجاح";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
            resolve(response);
          })
          .catch(() => {
            state.table_loading = false;
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "حدث مشكلة في الاتصال بالخادم";
            commit("SNACK_MESSAGE", snack_message);
            setTimeout(() => {
              commit("TIME_OUT", snack_message);
            }, 4000);
          });
      });
    },
  },
  getters: {
    snack_bar(state) {
      return !!state.snack_bar;
    },
  },
  modules: {
    pdf,
    archive,
  },
});
