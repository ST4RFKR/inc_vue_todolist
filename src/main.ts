import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./shared/config";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(VueQueryPlugin);
app.use(autoAnimatePlugin);
app.use(router);
app.mount("#app");
