import { baseApi } from "@/shared/api/base-api";

export type TaskDto = {
  id: string;
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

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
