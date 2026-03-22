<script setup lang="ts">
import type { TaskDto } from "@/features/tasks/model";
import {
  TaskStatus,
  useDeleteTask,
  useUpdateTask,
} from "@/features/tasks/model";
import { EditableSpan } from "@/shared/components/common";
import { Button, Card, Checkbox } from "@/shared/components/ui";
import { X } from "@lucide/vue";
import { ref } from "vue";

const { task, todolistId } = defineProps<{
  todolistId: string;
  task: TaskDto;
}>();
const checked = ref(task.status === TaskStatus.Completed);
const { mutate: deleteTask } = useDeleteTask();
const { mutate: updateTask } = useUpdateTask({ todolistId: todolistId });

const handleCheckboxChange = () => {
  checked.value = !checked.value;
  updateTask({
    title: task.title,
    status: checked.value ? TaskStatus.Completed : TaskStatus.New,
    taskId: task.id,
    todolistId,
  });
};

const handleDeleteTask = () => {
  deleteTask({ taskId: task.id, todolistId });
};
const handleUpdateTask = (title: string, status?: number) => {
  let taskStatus = status;
  if (taskStatus === undefined) {
    taskStatus = task.status;
  }

  updateTask({
    title: title,
    status: taskStatus,
    taskId: task.id,
    todolistId,
  });
};
</script>

<template>
  <Card class="flex flex-row items-center justify-between p-2 gap-2">
    <div class="flex items-center gap-2">
      <Checkbox
        :model-value="checked"
        @update:model-value="handleCheckboxChange"
      />
      <EditableSpan @update-title="handleUpdateTask" :text="task.title" />
    </div>
    <Button
      @click="handleDeleteTask"
      type="button"
      aria-label="Delete task"
      variant="ghost"
      class="text-muted-foreground cursor-pointer"
    >
      <X class="size-4" />
    </Button>
  </Card>
</template>
