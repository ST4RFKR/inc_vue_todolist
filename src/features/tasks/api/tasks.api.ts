import { baseApi } from "@/shared/api/base-api";
import type { TaskDto } from "../model/types";

type GetTasksResponse = {
  items: TaskDto[];
  totalCount: number;
  error: string | null;
};

export const tasksApi = {
  async getTasks({ todolistId }: { todolistId: string }) {
    const { data } = await baseApi.get<GetTasksResponse>(
      `/todo-lists/${todolistId}/tasks`,
    );
    return data.items;
  },
};
