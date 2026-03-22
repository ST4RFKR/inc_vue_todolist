import { ref } from "vue";
import { defineStore } from "pinia";
import { AUTH_TOKEN } from "@/shared/constants/constants";

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref(Boolean(localStorage.getItem(AUTH_TOKEN)));

  const login = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token);
    isLoggedIn.value = true;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    isLoggedIn.value = false;
  };

  return { isLoggedIn, login, logout };
});
