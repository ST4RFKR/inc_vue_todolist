import { useQuery } from "@tanstack/vue-query";
import { watch } from "vue";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "@/shared/store/auth.store";
import { useRouter } from "vue-router";
import { routerPaths } from "@/shared/config/routes";

export function useMe() {
  const store = useAuthStore();
  const router = useRouter();

  const { data, isPending, isError, isSuccess, error, refetch } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authApi.me,
    enabled: store.isLoggedIn,
    staleTime: 0,
    retry: false,
  });

  watch(isSuccess, (value) => {
    if (value) {
      store.setLoggedIn(true);
    }
  });

  watch(isError, (value) => {
    if (value) {
      store.logout();
      router.push({ path: routerPaths.login });
    }
  });

  return {
    me: refetch,
    data,
    isPending,
    isError,
    error,
  };
}
