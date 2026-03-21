<script setup lang="ts">
import { cn } from "@/shared/lib/style";
import { Button, CardAction } from "../../ui";
const props = defineProps<{ filter: "all" | "active" | "completed" }>();

const emit = defineEmits<{
  (e: "change-filter", filter: "all" | "active" | "completed"): void;
}>();
</script>

<template>
  <CardAction class="flex justify-center gap-3">
    <Button
      @click="() => emit('change-filter', 'all')"
      :class="cn({ 'bg-primary/40 text-white/40': filter === 'all' })"
      >All</Button
    >
    <Button
      @click="() => emit('change-filter', 'active')"
      :class="cn({ 'bg-primary/40 text-white/40': filter === 'active' })"
      >Active</Button
    >
    <Button
      @click="() => emit('change-filter', 'completed')"
      :class="cn({ 'bg-primary/40 text-white/40': filter === 'completed' })"
      >Completed</Button
    >
  </CardAction>
</template>
