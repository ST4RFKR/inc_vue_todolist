import { useMutation } from "@tanstack/vue-query";
import { authApi } from "../api/auth.api";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/shared/store/auth.store";

export function useLogout() {
  const router = useRouter();
  const store = useAuthStore();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => {
      return authApi.logout();
    },
    onSuccess: () => {
      toast.success("Logout successful", {
        autoClose: 2000,
      });
      store.logout();
      router.push({ name: "login" });
    },
    onError: (e) => {
      toast.error(e ?? "Logout failed", {
        autoClose: 2000,
      });
    },
  });
  return {
    logout,
    isPending,
  };
}
