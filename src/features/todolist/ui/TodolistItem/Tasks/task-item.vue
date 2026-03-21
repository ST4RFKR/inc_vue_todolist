<script setup lang="ts">
import type { TaskDto } from "@/features/todolist/api/tasks.api";
import { TaskStatus } from "@/features/todolist/model/enums";
import { EditableSpan } from "@/shared/components/common";
import { Button, Card, Checkbox } from "@/shared/components/ui";
import { X } from "@lucide/vue";
import { ref } from "vue";

const { task } = defineProps<{ task: TaskDto }>();
const checked = ref(task.status === TaskStatus.Completed);
</script>

<template>
  <Card class="flex flex-row items-center justify-between p-2 gap-2">
    <div class="flex items-center gap-2">
      <Checkbox :model-value="checked" />
      <EditableSpan :text="task.title" />
    </div>
    <Button
      type="button"
      aria-label="Delete task"
      variant="ghost"
      class="text-muted-foreground cursor-pointer"
    >
      <X class="size-4" />
    </Button>
  </Card>
</template>
