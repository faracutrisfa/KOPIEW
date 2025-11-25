import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import FiturView from "../views/FiturView.vue";
import TempatView from "../views/TempatView.vue";
import TentangView from "../views/TentangView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import DesignSystemView from "../views/DesignSystemView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/fitur", name: "fitur", component: FiturView },
    { path: "/tempat", name: "tempat", component: TempatView },
    { path: "/tentang", name: "tentang", component: TentangView },
    { path: "/login", name: "login", component: LoginView },
    { path: "/register", name: "register", component: RegisterView },
    { path: "/design-system", name: "design-system", component: DesignSystemView },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
