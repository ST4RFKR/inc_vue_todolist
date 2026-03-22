import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue3-toastify";
import { tasksApi } from "../api";
import { tasksQueryKeys } from "./query-keys";

export function useCreateTask() {
  const qc = useQueryClient();
  const { mutate: create, isPending } = useMutation({
    mutationFn: ({
      title,
      todolistId,
    }: {
      title: string;
      todolistId: string;
    }) => tasksApi.createTask({ title, todolistId }),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({
        queryKey: tasksQueryKeys.byTodolist(variables.todolistId),
        exact: true,
      });
      toast.success("Task created", {
        autoClose: 2000,
      });
    },
    onError: (e) => {
      toast.error(e ?? "Task not created", {
        autoClose: 2000,
      });
    },
  });
  return {
    create,
    isPending,
  };
}
