import type { TaskFilter } from "@/features/tasks/model";

export type TodolistDto = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type DomainTodolist = TodolistDto & {
  filter: TaskFilter;
  entityStatus: "idle" | "loading" | "error";
};
