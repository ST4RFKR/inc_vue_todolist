<script setup lang="ts">
import { ref, shallowRef, watch } from "vue";
import { Input } from "@/shared/components/ui";
import { useFocus } from "@vueuse/core";

const props = defineProps<{ text: string }>();
const isEditing = ref(false);
const inputValue = ref(props.text);
const input = shallowRef();

const emits = defineEmits<{
  (e: "update-title", payload: string): void;
}>();

watch(
  () => props.text,
  (nextText) => {
    if (!isEditing.value) {
      inputValue.value = nextText;
    }
  },
);

const startEditing = () => {
  inputValue.value = props.text;
  isEditing.value = true;
};

const finishEditing = () => {
  if (!isEditing.value) return;

  emits("update-title", inputValue.value);
  if (!inputValue.value) {
    inputValue.value = props.text;
  }
  isEditing.value = false;
};

const handleEnterKey = (event: KeyboardEvent) => {
  event.preventDefault();
  finishEditing();
};

const handleBlur = () => {
  finishEditing();
};

useFocus(input, {
  initialValue: true,
});
</script>
<template>
  <span v-if="isEditing">
    <Input
      @keydown.enter.prevent="handleEnterKey"
      ref="input"
      @blur="handleBlur"
      type="text"
      v-model="inputValue"
    />
  </span>
  <span
    class="cursor-pointer flex items-center justify-between gap-2"
    v-else
    @dblclick="startEditing"
    >{{ inputValue }}
  </span>
</template>
