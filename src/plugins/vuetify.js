import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
  rtl: true,
  icons: {
    iconfont: "mdi",
  },
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        background: "#E5E6E4",
        header: "#9a9a9a",
        btn: "#9a9a9a",
        btnI: "#4F4E52",
        btnC: "#ffffff",
        btnP: "#9a9a9a",
        Table: "#E91E63",
        textI: "#000000",
        borderCard: "#16213e",
        list: "#16213e",
        btnU: "#000000",
        primary: "#353437",
      },
      dark: {
        background: "#353437",
        header: "#1A1A1B",
        btn: "#69686D",
        btnI: "#4F4E52",
        btnC: "#ffffff",
        btnP: "#9a9a9a",
        Table: "#B20205",
        textI: "#ffffff",
        borderCard: "#353437",
        list: "#353437",
        btnU: "#ffffff",
        primary: "#ffffff",
      },
    },
  },
});
