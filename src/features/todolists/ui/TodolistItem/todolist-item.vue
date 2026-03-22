<script setup lang="ts">
import {
  CreateItemForm,
  FilterButtons,
  EditableSpan,
} from "@/shared/components/common";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/shared/components/ui";
import { TasksList } from "@/features/tasks/ui";
import { Info, X } from "lucide-vue-next";
import { ref } from "vue";
import type { DomainTodolist } from "../../model/types";
import type { TaskFilter } from "@/features/tasks/model";
import {
  useDeleteTodolist,
  useUpdateTodolistTitle,
} from "@/features/todolists/model";

const { todolist } = defineProps<{
  todolist: DomainTodolist;
}>();

const filter = ref<TaskFilter>(todolist.filter);

const handleChangeFilter = (filterValue: TaskFilter) => {
  filter.value = filterValue;
};

const { mutate: deleteTodolist } = useDeleteTodolist();
const { update } = useUpdateTodolistTitle();

const handleDeleteTodolist = () => {
  deleteTodolist({ todolistId: todolist.id });
};
const handleUpdateTodolistTitle = (title: string) => {
  if (title === todolist.title) return;

  update({ todolistId: todolist.id, title: title });
};
</script>

<template>
  <Card class="flex h-full flex-col gap-3 justify-between">
    <CardHeader>
      <CardTitle>
        <div
          class="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center"
        >
          <EditableSpan
            @update-title="handleUpdateTodolistTitle"
            :text="todolist.title"
          />
          <div class="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info class="size-4" />
                </TooltipTrigger>
                <TooltipContent class="bg-primary text-white"
                  >Double-click on the title to change the
                  content.</TooltipContent
                >
              </Tooltip>
            </TooltipProvider>
            <Button @click="handleDeleteTodolist" variant="ghost">
              <X class="size-4" />
            </Button>
          </div>
        </div>
      </CardTitle>
      <div class="w-full min-w-0">
        <CreateItemForm title="Add task" />
      </div>
    </CardHeader>
    <CardContent>
      <TasksList :filter="filter" :todolistId="todolist.id" />
    </CardContent>
    <FilterButtons :filter="filter" @change-filter="handleChangeFilter" />
  </Card>
</template>
