import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./shared/config";
import { routerPaths } from "./shared/config/routes";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { createPinia } from "pinia";
import { useAuthStore } from "./shared/store/auth.store";

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();
const authStore = useAuthStore(pinia);

router.beforeEach((to) => {
  const isProtectedRoute = to.matched.some(
    (routeRecord) => routeRecord.meta.requiresAuth,
  );

  if (isProtectedRoute && !authStore.isLoggedIn) {
    return {
      path: routerPaths.login,
    };
  }

  return true;
});

const app = createApp(App);
app.use(VueQueryPlugin);
app.use(autoAnimatePlugin);
app.use(pinia);
app.use(router);
app.mount("#app");
