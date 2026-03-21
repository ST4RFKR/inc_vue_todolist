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
  (e: "create-item"): void;
}>();

const inputValue = ref("");
const disabledButton = computed(() => !inputValue.value || loading);
</script>

<template>
  <div class="flex w-full flex-col gap-2">
    <h2 class="text-sm font-semibold">{{ title }}</h2>
    <div
      class="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center"
    >
      <Input placeholder="Write a title" v-model="inputValue" class="flex-1" />
      <Button
        :disabled="disabledButton"
        :loading="loading"
        class="w-full sm:w-auto"
        @click="emits('create-item')"
      >
        <Plus />
      </Button>
    </div>
  </div>
</template>
