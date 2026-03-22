export type TaskFilter = "all" | "active" | "completed";

export type TaskDto = {
  id: string;
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
