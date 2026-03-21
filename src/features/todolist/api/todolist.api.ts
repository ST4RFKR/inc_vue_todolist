import { baseApi } from "@/shared/api/base-api";
import type { TodolistDto } from "../model/types";

export const todolistApi = {
  async getTodolists() {
    const { data } = await baseApi.get<TodolistDto[]>("/todo-lists");
    return data;
  },
};
