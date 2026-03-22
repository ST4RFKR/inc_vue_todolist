import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { tasksApi } from "../api";
import { toast } from "vue3-toastify";
import { TaskStatus } from "./enums";
import type { TaskDto } from "./types";
import { tasksQueryKeys } from "./query-keys";

type UpdateTaskVariables = {
  title: string;
  status: number;
  todolistId: string;
  taskId: string;
};

type UpdateTaskContext = {
  previousTasks?: TaskDto[];
};

const toApiTaskStatus = (status: number) =>
  status === TaskStatus.Completed ? TaskStatus.Completed : TaskStatus.New;

export function useUpdateTask({ todolistId }: { todolistId: string }) {
  const qc = useQueryClient();
  const { mutate, isPending } = useMutation<
    unknown,
    unknown,
    UpdateTaskVariables,
    UpdateTaskContext
  >({
    mutationFn: ({ title, status, todolistId, taskId }: UpdateTaskVariables) => {
      const statusTask = toApiTaskStatus(status);
      return tasksApi.updateTask({
        title,
        status: statusTask,
        todolistId,
        taskId,
      });
    },
    onMutate: async ({ title, status, todolistId, taskId }: UpdateTaskVariables) => {
      const queryKey = tasksQueryKeys.byTodolist(todolistId);
      const statusTask = toApiTaskStatus(status);

      await qc.cancelQueries({ queryKey, exact: true });

      const previousTasks = qc.getQueryData<TaskDto[]>(queryKey);

      qc.setQueryData<TaskDto[]>(queryKey, (currentTasks) => {
        if (!currentTasks) {
          return currentTasks;
        }

        return currentTasks.map((task) =>
          task.id === taskId ? { ...task, title, status: statusTask } : task,
        );
      });

      return { previousTasks };
    },
    onSuccess: () => {
      toast.success("Task updated", {
        autoClose: 2000,
      });
    },
    onError: (e, _variables, context) => {
      if (context?.previousTasks) {
        qc.setQueryData<TaskDto[]>(
          tasksQueryKeys.byTodolist(todolistId),
          context.previousTasks,
        );
      }

      toast.error(e ?? "Task not updated", {
        autoClose: 2000,
      });
    },
    onSettled: () => {
      qc.invalidateQueries({
        queryKey: tasksQueryKeys.byTodolist(todolistId),
        exact: true,
      });
    },
  });
  return {
    mutate,
    isPending,
  };
}
