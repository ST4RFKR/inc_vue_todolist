<script setup lang="ts">
import { TodolistItem } from "@/features/todolist";
import { todolistApi } from "@/features/todolist/api/todolist.api";
import type { DomainTodolist, TodolistDto } from "@/features/todolist/model/types";
import { CreateItemForm } from "@/shared/components/common";
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";

const { data, isPending, isError, error } = useQuery<
  TodolistDto[],
  Error,
  DomainTodolist[]
>({
  queryKey: ["todolists"],
  queryFn: todolistApi.getTodolists,
  select: (data): DomainTodolist[] =>
    data.map((todolist) => {
      return {
        ...todolist,
        filter: "all" as const,
        entityStatus: "idle",
      };
    }),
});

const errorMessage = computed(() => {
  if (error.value instanceof Error) return error.value.message;
  return "Failed to load todolists";
});
</script>

<template>
  <div>
    <CreateItemForm
      title="Create Todolist"
      @create-item="console.log('create item')"
      :loading="false"
    />
    <div
      class="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <p v-if="isPending">Loading todolists...</p>
      <p v-else-if="isError">{{ errorMessage }}</p>

      <TodolistItem
        v-for="todolist in data"
        :key="todolist.id"
        :todolist="todolist"
      />
    </div>
  </div>
</template>
