<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { Input } from "@/shared/components/ui";
import { useFocus } from "@vueuse/core";

const props = defineProps<{ text: string }>();
const isEditing = ref(false);
const inputValue = ref(props.text);
const input = shallowRef();

useFocus(input, {
  initialValue: true,
});
</script>
<template>
  <span v-if="isEditing">
    <Input
      ref="input"
      @blur="isEditing = false"
      type="text"
      v-model="inputValue"
    />
  </span>
  <span
    class="cursor-pointer flex items-center justify-between gap-2"
    v-else
    @dblclick="isEditing = true"
    >{{ inputValue }}
  </span>
</template>
