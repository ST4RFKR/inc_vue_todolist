import { useMutation } from "@tanstack/vue-query";
import { authApi } from "../api/auth.api";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/shared/store/auth.store";

export function useLogin() {
  const router = useRouter();
  const store = useAuthStore();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return authApi.login({ email, password });
    },
    onSuccess: (res) => {
      toast.success("Login successful", {
        autoClose: 2000,
      });
      store.login(res.data.token);
      router.push({ name: "home" });
    },
    onError: (e) => {
      toast.error(e ?? "Login failed", {
        autoClose: 2000,
      });
    },
  });
  return {
    login,
    isPending,
  };
}
