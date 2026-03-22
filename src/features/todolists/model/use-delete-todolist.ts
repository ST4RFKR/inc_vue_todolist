import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { todolistApi } from "../api";
import { toast } from "vue3-toastify";

export function useDeleteTodolist() {
  const qc = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ todolistId }: { todolistId: string }) =>
      todolistApi.deleteTodolist({ todolistId }),
    onSuccess: (e) => {
      qc.invalidateQueries({ queryKey: ["todolists"] });
      toast.success(e ?? "Todolist deleted", {
        autoClose: 3000,
      });
    },
  });
  return {
    mutate,
    isPending,
  };
}
