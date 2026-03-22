import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { todolistApi } from "@/features/todolists/api";
import { toast } from "vue3-toastify";

export function useCreateTodolist() {
  const qc = useQueryClient();
  const { mutate: create, isPending } = useMutation({
    mutationFn: ({ title }: { title: string }) =>
      todolistApi.createTodolist({ title }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["todolists"] });
      toast.success("Todolist created", {
        autoClose: 2000,
      });
    },
    onError: (e) => {
      toast.error(e ?? "Todolist not created", {
        autoClose: 2000,
      });
    },
  });
  return {
    create,
    isPending,
  };
}
