import { NotFound, TodolistView, FaqView, LoginView } from "../../../pages";

export const routerPaths = {
  home: "/",
  login: "/login",
  faq: "/faq",
  notFound: "/:pathMatch(.*)*",
};

export const routes = [
  { path: routerPaths.home, name: "home", component: TodolistView },
  { path: routerPaths.login, name: "login", component: LoginView },
  { path: routerPaths.faq, name: "faq", component: FaqView },
  { path: routerPaths.notFound, name: "not-found", component: NotFound },
];
