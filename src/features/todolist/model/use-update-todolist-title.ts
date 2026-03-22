import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { todolistApi } from "../api";
import { toast } from "vue3-toastify";

export function useUpdateTodolistTitle() {
  const qc = useQueryClient();
  const { mutate: update, isPending } = useMutation({
    mutationFn: ({
      title,
      todolistId,
    }: {
      title: string;
      todolistId: string;
    }) => todolistApi.updateTodolist({ title, todolistId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["todolists"] });
      toast.success("Todolist updated", {
        autoClose: 2000,
      });
    },
    onError: (e) => {
      toast.error(e ?? "Todolist not updated", {
        autoClose: 2000,
      });
    },
  });
  return {
    update,
    isPending,
  };
}
