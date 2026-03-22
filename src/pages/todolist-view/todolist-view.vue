<script setup lang="ts">
import { TodolistItem } from "@/features/todolists";

import { useCreateTodolist, useGetTodolists } from "@/features/todolists/model";
import { CreateItemForm } from "@/shared/components/common";
import { computed } from "vue";

const { data, isPending, isError, error } = useGetTodolists();

const { create, isPending: isCreating } = useCreateTodolist();

const handleCreateTodolist = (title: string) => {
  const value = title.trim();
  if (!value) return;

  create({ title: value });
};

const errorMessage = computed(() => {
  if (error.value instanceof Error) return error.value.message;
  return "Failed to load todolists";
});
</script>

<template>
  <div>
    <CreateItemForm
      title="Create Todolist"
      @create-item="handleCreateTodolist"
      :loading="isCreating"
    />
    <div
      class="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      v-auto-animate
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
