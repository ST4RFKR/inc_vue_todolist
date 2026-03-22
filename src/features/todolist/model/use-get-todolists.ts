import { useQuery } from "@tanstack/vue-query";
import { todolistApi } from "../api";
import type { DomainTodolist, TodolistDto } from "./types";

export function useGetTodolists() {
  const { data, isPending, isError, error } = useQuery<
    TodolistDto[],
    Error,
    DomainTodolist[]
  >({
    queryKey: ["todolists"],
    queryFn: todolistApi.getTodolists,
    select: (data): DomainTodolist[] =>
      data.map((todolist) => {
        return {
          ...todolist,
          filter: "all" as const,
          entityStatus: "idle",
        };
      }),
  });
  return { data, isPending, isError, error };
}
