export type TodolistDto = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type TaskStatus = "all" | "active" | "completed";

export type DomainTodolist = TodolistDto & {
  filter: TaskStatus;
  entityStatus: "idle" | "loading" | "error";
};
