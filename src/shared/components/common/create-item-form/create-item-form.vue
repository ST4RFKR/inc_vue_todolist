<script setup lang="ts">
import { computed, ref } from "vue";
import { Plus } from "@lucide/vue";
import Input from "../../ui/input/Input.vue";
import Button from "../../ui/button/Button.vue";
const { loading, title = "Create Item" } = defineProps<{
  title?: string;
  loading?: boolean;
}>();

const emits = defineEmits<{
  (e: "create-item", payload: string): void;
}>();

const inputValue = ref("");
const disabledButton = computed(() => !inputValue.value.trim() || loading);

const create = () => {
  const value = inputValue.value.trim();
  if (!value || loading) return;

  emits("create-item", value);
  inputValue.value = "";
};
</script>

<template>
  <div class="flex w-full min-w-0 flex-col gap-2">
    <h2 class="text-sm font-semibold">{{ title }}</h2>
    <div
      class="flex w-full min-w-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:flex-nowrap"
    >
      <Input
        placeholder="Write a title"
        v-model="inputValue"
        class="w-full min-w-0 sm:flex-1"
      />
      <Button
        :disabled="disabledButton"
        :loading="loading"
        class="w-full shrink-0 sm:w-auto"
        @click="create"
      >
        <Plus />
      </Button>
    </div>
  </div>
</template>
