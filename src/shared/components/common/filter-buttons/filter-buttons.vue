<script setup lang="ts">
import { cn } from "@/shared/lib/style";
import { Button } from "../../ui";
const props = defineProps<{ filter: "all" | "active" | "completed" }>();

const emit = defineEmits<{
  (e: "change-filter", filter: "all" | "active" | "completed"): void;
}>();
</script>

<template>
  <div class="w-full px-6 pb-4">
    <div class="mx-auto grid w-full max-w-sm grid-cols-3 gap-2">
      <Button
        size="sm"
        @click="() => emit('change-filter', 'all')"
        :class="
          cn('w-full min-w-0 px-2 text-[11px]', {
            'bg-primary/40 text-white/40': filter === 'all',
          })
        "
        >All</Button
      >
      <Button
        size="sm"
        @click="() => emit('change-filter', 'active')"
        :class="
          cn('w-full min-w-0 px-2 text-[11px]', {
            'bg-primary/40 text-white/40': filter === 'active',
          })
        "
        >Active</Button
      >
      <Button
        size="sm"
        @click="() => emit('change-filter', 'completed')"
        :class="
          cn('w-full min-w-0 px-2 text-[11px]', {
            'bg-primary/40 text-white/40': filter === 'completed',
          })
        "
        >Completed</Button
      >
    </div>
  </div>
</template>
