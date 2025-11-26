import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import FiturView from "../views/FiturView.vue";
import TempatView from "../views/TempatView.vue";
import TentangView from "../views/TentangView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import DesignSystemView from "../views/DesignSystemView.vue";
import ProfileView from "../views/ProfileView.vue";
import DetailView from "../views/DetailView.vue";
import WishlistView from "../views/WishlistView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/fitur", name: "fitur", component: FiturView },
    { path: "/tempat", name: "tempat", component: TempatView },
    { path: "/tentang", name: "tentang", component: TentangView },
    { path: "/login", name: "login", component: LoginView },
    { path: "/register", name: "register", component: RegisterView },
    {
      path: "/design-system",
      name: "design-system",
      component: DesignSystemView,
    },
    {
      path: "/threads",
      name: "threads",
      component: () => import("../views/ThreadsView.vue"),
    },
    {
      path: "/threads/:id",
      name: "thread-detail",
      component: () => import("../views/ThreadDetailView.vue"),
    },
    {
      path: "/place/detail/:id",
      name: "detail",
      component: DetailView,
      props: true,
    },
    {
      path: "/wishlist",
      name: "wishlist",
      component: WishlistView,
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
      meta: { requiresAuth: true },
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("token");
  if (to.meta.requiresAuth && !loggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
