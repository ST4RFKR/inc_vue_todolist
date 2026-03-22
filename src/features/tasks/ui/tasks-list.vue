<script setup lang="ts">
import type { TaskFilter } from "@/features/tasks/model";

import TaskItem from "./task-item.vue";
import { computed } from "vue";
import { TaskStatus } from "@/features/tasks/model";
import { useGetTasks } from "../model/use-get-tasks";

const { todolistId, filter } = defineProps<{
  todolistId: string;
  filter: TaskFilter;
}>();

const { data } = useGetTasks({ todolistId });
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
  <div class="flex flex-col gap-2" v-auto-animate>
    <TaskItem
      :todolist-id="todolistId"
      v-for="task in filteredTasks"
      :key="task.id"
      :task="task"
    />
  </div>
</template>
