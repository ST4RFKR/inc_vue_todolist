import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { toast } from "vue3-toastify";
import { tasksApi } from "../api";
import { tasksQueryKeys } from "./query-keys";

export function useDeleteTask() {
  const qc = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      todolistId,
      taskId,
    }: {
      todolistId: string;
      taskId: string;
    }) => tasksApi.deleteTask({ todolistId, taskId }),
    onSuccess: (e, variables) => {
      qc.invalidateQueries({
        queryKey: tasksQueryKeys.byTodolist(variables.todolistId),
        exact: true,
      });
      toast.success(e ?? "Task deleted", {
        autoClose: 3000,
      });
    },
  });
  return {
    mutate,
    isPending,
  };
}
