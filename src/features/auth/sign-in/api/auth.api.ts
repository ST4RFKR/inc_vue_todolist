import { baseApi, toError, unwrapApiResult } from "@/shared/api";

export const authApi = {
  async login({
    email,
    password,
    rememberMe = false,
  }: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }) {
    try {
      const res = await baseApi.post("/auth/login", {
        email,
        password,
        rememberMe,
      });

      unwrapApiResult(res.data, "Unable to sign in. Please try again.");

      return res.data;
    } catch (error) {
      throw toError(error, "Unable to sign in. Please try again.");
    }
  },
};
