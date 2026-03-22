import { useQuery } from "@tanstack/vue-query";
import type { TaskDto } from "./types";
import { tasksApi } from "../api";
import { tasksQueryKeys } from "./query-keys";

export function useGetTasks({ todolistId }: { todolistId: string }) {
  const { data, isPending, isError, error } = useQuery<TaskDto[]>({
    queryKey: tasksQueryKeys.byTodolist(todolistId),
    queryFn: () => tasksApi.getTasks({ todolistId }),
  });
  return { data, isPending, isError, error };
}
