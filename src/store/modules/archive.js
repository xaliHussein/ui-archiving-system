import axios from "axios";
const archive = {
  namespaced: true,
  state: {
    archive: [],
    last_archive: [],
    loading_archive: false,
    loading_last_archive: false,
    loading_add: false,
    loading_random_num: false,
    loading_download: false,
    pageCount: 1,
    pageCount2: 1,
    archive_query: "",
    date_from: null,
    date_to: null,
    param: {
      sortBy: [],
      sortDesc: [],
      page: 1,
      itemsPerPage: 10,
    },
    archive_param: {
      sortBy: [],
      sortDesc: [],
      page: 1,
      itemsPerPage: 10,
    },
  },
  mutations: {
    ADD_ARCHIVE(state, archive) {
      state.last_archive.unshift(archive);
    },
    GET_LAST_ARCHIVE(state, archive) {
      state.last_archive.splice(0, state.last_archive.length);
      archive.forEach((element) => {
        state.last_archive.push(element);
      });
    },
    GET_ARCHIVE(state, archive) {
      state.archive.splice(0, state.archive.length);
      archive.forEach((element) => {
        state.archive.push(element);
      });
    },
  },
  actions: {
    add_archive({ commit, state, rootState }, data) {
      return new Promise((resolve) => {
        state.loading_add = true;
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
            snack_message["text"] = "تم اضافة ارشيف بنجاح";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
            state.loading_add = false;
            resolve(response);
          })
          .catch(() => {
            state.loading_add = false;
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
    get_last_archive({ commit, state, rootState }) {
      let data = state.param;
      state.loading_last_archive = true;
      return new Promise((resolve) => {
        let skip = (data.page - 1) * data.itemsPerPage;
        let limit = data.itemsPerPage;
        axios({
          url:
            `${rootState.server}` +
            "/api/get_archive" +
            "?skip=" +
            skip +
            "&limit=" +
            limit,
          method: "get",
        })
          .then((response) => {
            state.pageCount = response.data.count;
            commit("GET_LAST_ARCHIVE", response.data.result);
            state.loading_last_archive = false;
            resolve(response);
          })
          .catch(() => {
            state.loading_last_archive = false;
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
    get_archive({ commit, state, rootState }) {
      let data = state.archive_param;
      state.loading_archive = true;
      return new Promise((resolve) => {
        let skip = (data.page - 1) * data.itemsPerPage;
        let limit = data.itemsPerPage;
        let query = [];
        var filter = "";
        if (
          state.archive_query != undefined &&
          state.date_from != null &&
          state.archive_query.length > 0
        )
          query = `&query=${state.archive_query}`;
        if (state.date_from != null || state.date_to != null) {
          if (state.date_to == null || state.date_to == undefined) {
            state.date_to = new Date(
              Date.now() - new Date().getTimezoneOffset() * 60000
            )
              .toISOString()
              .substr(0, 10);
          }
          let date = [state.date_from, state.date_to];
          filter = "&filter=" + JSON.stringify(date);
        }
        axios({
          url:
            `${rootState.server}` +
            "/api/get_archive" +
            "?skip=" +
            skip +
            "&limit=" +
            limit +
            query +
            filter,
          method: "get",
        })
          .then((response) => {
            state.pageCount2 = response.data.count;
            commit("GET_ARCHIVE", response.data.result);
            state.loading_archive = false;
            resolve(response);
          })
          .catch(() => {
            state.loading_archive = false;
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
        state.loading_random_num = true;
        axios({
          url: `${rootState.server}` + "/api/generate_random_number",
          headers: {
            "Content-Type": "application/json",
          },
          method: "get",
        })
          .then((response) => {
            state.loading_random_num = false;
            resolve(response);
          })
          .catch(() => {
            state.loading_random_num = false;
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
    download_files({ state, rootState }, data) {
      state.loading_download = true;
      return new Promise((resolve) => {
        axios({
          url: `${rootState.server}` + "/api/download_files",
          data: data,
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
        })
          .then((response) => {
            // تحميل ملفات من صور و بي دي اف عن طريق blob
            if (response.status == 200) {
              var fileURL = window.URL.createObjectURL(
                new Blob([response.data], { type: response.data["type"] })
              );
              var fileLink = document.createElement("a");
              fileLink.href = fileURL;
              if (response.data["type"].slice(-4) == "jpeg") {
                fileLink.setAttribute(
                  "download",
                  "file" + response.data.size + ".jpeg"
                );
              } else {
                fileLink.setAttribute(
                  "download",
                  "file" +
                    response.data.size +
                    "." +
                    response.data["type"].slice(-3)
                );
              }
              document.body.appendChild(fileLink);
              fileLink.click();
            }
            state.loading_download = false;

            resolve(response);
          })
          .catch(() => {
            state.loading_download = false;
          });
      });
    },
  },
  getters: {},
};
export default archive;
