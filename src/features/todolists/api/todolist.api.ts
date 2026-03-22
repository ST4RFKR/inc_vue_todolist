import { baseApi } from "@/shared/api/base-api";
import type { TodolistDto } from "../model/types";
import {
  type ApiResponse,
  toError,
  unwrapApiResult,
} from "@/shared/api/unwrap-api-result";

type CreateTodolistResponse = ApiResponse<{
  item: TodolistDto;
}>;

type DeleteTodolistResponse = ApiResponse<Record<string, never>>;

export const todolistApi = {
  async getTodolists() {
    try {
      const { data } = await baseApi.get<TodolistDto[]>("/todo-lists");
      return data;
    } catch (error) {
      throw toError(error, "Failed to load todolists");
    }
  },

  async createTodolist({ title }: { title: string }) {
    try {
      const { data } = await baseApi.post<CreateTodolistResponse>(
        "/todo-lists",
        {
          title,
        },
      );
      unwrapApiResult(data, "Todolist not created");
      return data.data.item;
    } catch (error) {
      throw toError(error, "Todolist not created");
    }
  },

  async updateTodolist({
    title,
    todolistId,
  }: {
    title: string;
    todolistId: string;
  }) {
    try {
      const { data } = await baseApi.put("/todo-lists/" + todolistId, {
        title,
      });
      unwrapApiResult(data, "Todolist not created");
      return data;
    } catch (error) {
      throw toError(error, "Todolist not created");
    }
  },

  async deleteTodolist({ todolistId }: { todolistId: string }) {
    try {
      const { data } = await baseApi.delete<DeleteTodolistResponse>(
        `/todo-lists/${todolistId}`,
      );
      unwrapApiResult(data, "Todolist not deleted");
    } catch (error) {
      throw toError(error, "Todolist not deleted");
    }
  },
};
