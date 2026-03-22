<script setup lang="ts">
import { tasksApi } from "@/features/tasks/api";
import type { TaskDto, TaskFilter } from "@/features/tasks/model";
import { useQuery } from "@tanstack/vue-query";
import TaskItem from "./task-item.vue";
import { computed } from "vue";
import { TaskStatus } from "@/features/tasks/model";

const { todolistId, filter } = defineProps<{
  todolistId: string;
  filter: TaskFilter;
}>();

const { data } = useQuery<TaskDto[]>({
  queryKey: ["tasks", todolistId],
  queryFn: () => tasksApi.getTasks({ todolistId }),
});

const filteredTasks = computed(() => {
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
    <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task" />
  </div>
</template>
