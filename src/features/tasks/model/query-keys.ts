export const tasksQueryKeys = {
  all: ["tasks"] as const,
  byTodolist: (todolistId: string) => ["tasks", todolistId] as const,
};
