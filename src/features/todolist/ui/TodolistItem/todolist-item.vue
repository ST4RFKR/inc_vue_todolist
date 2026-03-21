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
import TasksList from "./Tasks/tasks-list.vue";
import { Info, X } from "lucide-vue-next";
import { ref } from "vue";
import type { DomainTodolist } from "../../model/types";

const { todolist } = defineProps<{
  todolist: DomainTodolist;
}>();

const filter = ref(todolist.filter);

const handleChangeFilter = (filterValue: "all" | "active" | "completed") => {
  filter.value = filterValue;
};
</script>

<template>
  <Card class="flex flex-col gap-3">
    <CardHeader>
      <CardTitle>
        <div class="flex items-center justify-between gap-2">
          <EditableSpan :text="todolist.title" />
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
            <Button variant="ghost">
              <X class="size-4" />
            </Button>
          </div>
        </div>
      </CardTitle>
      <CreateItemForm title="Add task" />
    </CardHeader>
    <CardContent>
      <TasksList :filter="filter" :todolistId="todolist.id" />
    </CardContent>
    <FilterButtons :filter="filter" @change-filter="handleChangeFilter" />
  </Card>
</template>
