import axios from "axios";
const archive = {
  namespaced: true,
  state: {
    archive: [],
    loadingButton: false,
  },
  mutations: {
    ADD_ARCHIVE(state, archive) {
      state.archive.unshift(archive);
    },
  },
  actions: {
    add_archive({ commit, state, rootState }, data) {
      return new Promise((resolve) => {
        state.loadingButton = true;
        axios({
          url: `${rootState.server}` + "/api/add_archive",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
        })
          .then((response) => {
            commit("ADD_ARCHIVE", response.data.result[0]);
            let snack_message = {};
            snack_message["color"] = "green darken-1";
            snack_message["icon"] = "checkbox-marked-circle";
            snack_message["text"] = "نم اضافة ارشيف بنجاح";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
            state.loadingButton = false;
            resolve(response);
          })
          .catch(() => {
            state.loadingButton = false;
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "حدث مشكلة في الاتصال بالخادم";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
          });
      });
    },
    random_number({ commit, state, rootState }) {
      return new Promise((resolve) => {
        state.loadingRandom = true;
        axios({
          url: `${rootState.server}` + "/api/generate_random_number",
          headers: {
            "Content-Type": "application/json",
          },
          method: "get",
        })
          .then((response) => {
            state.loadingRandom = false;
            resolve(response);
          })
          .catch(() => {
            state.loadingRandom = false;
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "حدث مشكلة في الاتصال بالخادم";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
          });
      });
    },
  },
  getters: {},
};
export default archive;
