import { baseApi } from "@/shared/api/base-api";
import type { TaskDto } from "../model/types";
import { toError, unwrapApiResult } from "@/shared/api";
import type { ApiResponse } from "@/shared/api/unwrap-api-result";

type GetTasksResponse = {
  items: TaskDto[];
  totalCount: number;
  error: string;
};

type CreateTaskResponse = ApiResponse<{ items: TaskDto[] }>;
export const tasksApi = {
  async getTasks({ todolistId }: { todolistId: string }) {
    try {
      const { data } = await baseApi.get<GetTasksResponse>(
        `/todo-lists/${todolistId}/tasks`,
      );
      return data.items;
    } catch (error) {
      throw toError(error, "Failed to load todolists");
    }
  },
  async createTask({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) {
    try {
      const { data } = await baseApi.post<CreateTaskResponse>(
        `/todo-lists/${todolistId}/tasks`,
        {
          title,
        },
      );
      unwrapApiResult(data, "Task not created");
      return data;
    } catch (error) {
      throw toError(error, "Task not created");
    }
  },

  async updateTask({
    title,
    status,
    taskId,
    todolistId,
  }: {
    title: string;
    status: number;
    taskId: string;
    todolistId: string;
  }) {
    try {
      const { data } = await baseApi.put<CreateTaskResponse>(
        `/todo-lists/${todolistId}/tasks/${taskId}`,
        {
          title,
          status,
        },
      );
      unwrapApiResult(data, "Task not updated");
      return data;
    } catch (error) {
      throw toError(error, "Task not updated");
    }
  },
  async deleteTask({
    todolistId,
    taskId,
  }: {
    todolistId: string;
    taskId: string;
  }) {
    try {
      const { data } = await baseApi.delete<CreateTaskResponse>(
        `/todo-lists/${todolistId}/tasks/${taskId}`,
      );
      unwrapApiResult(data, "Task not deleted");
    } catch (error) {
      throw toError(error, "Task not deleted");
    }
  },
};
