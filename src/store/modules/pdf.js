/* eslint-disable no-unused-vars */
import axios from "axios";
const pdf = {
  namespaced: true,
  state: {
    loadingButton: false,
  },
  mutations: {},
  actions: {
    upload_image({ commit, state, rootState }, data) {
      return new Promise((resolve) => {
        state.loadingButton = true;
        axios({
          url: `${rootState.server}` + "/api/convert_image_pdf",
          data: data,
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
        })
          .then((response) => {
            state.loadingButton = false;
            if (response.status == 200) {
              var fileURL = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" })
              );
              var fileLink = document.createElement("a");
              fileLink.href = fileURL;
              fileLink.setAttribute(
                "download",
                "file" + response.data.size + ".pdf"
              );
              document.body.appendChild(fileLink);
              fileLink.click();
            }
            resolve(response);
          })
          .catch((error) => {
            console.log(error.response);
            state.loadingButton = false;
          });
      });
    },
  },
  getters: {},
};
export default pdf;
