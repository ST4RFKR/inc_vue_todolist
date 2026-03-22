import { ref } from "vue";
import { defineStore } from "pinia";
import { AUTH_TOKEN } from "@/shared/constants/constants";

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref(Boolean(localStorage.getItem(AUTH_TOKEN)));

  const setLoggedIn = (value: boolean) => {
    isLoggedIn.value = value;
  };

  const login = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    setLoggedIn(false);
  };

  return { isLoggedIn, setLoggedIn, login, logout };
});
