<script setup lang="ts">
import { tasksApi } from "@/features/todolist/api";
import type { TaskDto } from "@/features/todolist/api/tasks.api";
import { useQuery } from "@tanstack/vue-query";
import TaskItem from "./task-item.vue";
import { computed } from "vue";
import { TaskStatus } from "@/features/todolist/model/enums";

const { todolistId, filter } = defineProps<{
  todolistId: string;
  filter: "all" | "active" | "completed";
}>();

const { data } = useQuery<TaskDto[]>({
  queryKey: ["tasks", todolistId],
  queryFn: () => tasksApi.getTasks({ todolistId }),
});

let fiteredTasks = computed(() => {
  if (filter === "active") {
    return data.value?.filter((task) => task.status === TaskStatus.New);
  }
  if (filter === "completed") {
    return data.value?.filter((task) => task.status === TaskStatus.Completed);
  }
  return data.value;
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <TaskItem v-for="task in fiteredTasks" :key="task.id" :task="task" />
  </div>
</template>
