import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/Home.vue";
import LoginView from "../views/Login.vue";
import PDFView from "../views/CovertImagesToPdf.vue";
import AddArchivesView from "../views/archives/AddArchives.vue";
import GetArchivesView from "../views/archives/GetArchives.vue";
import Settings from "../views/Settings.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: loggedIn,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    beforeEnter: redirect,
  },
  {
    path: "/add_archives",
    name: "add_archives",
    component: AddArchivesView,
    beforeEnter: loggedIn,
  },
  {
    path: "/get_archives",
    name: "get_archives",
    component: GetArchivesView,
    beforeEnter: loggedIn,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
    beforeEnter: loggedIn,
  },
  {
    path: "/convert-images-to-pdf",
    name: "pdf",
    component: PDFView,
    beforeEnter: loggedIn,
  },
];
// function admin(to, from, next) {
//   const user_name = localStorage.getItem("user_name");
//   if (user_name !== 'admin') {
//     next("/");
//   } else {
//     next();
//   }
// }
function loggedIn(to, from, next) {
  const token = localStorage.getItem("token");
  if (!token) {
    next("/login");
  } else {
    next();
  }
}
function redirect(to, from, next) {
  const token = localStorage.getItem("token");
  if (token) {
    next("/");
  } else {
    next();
  }
}
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
