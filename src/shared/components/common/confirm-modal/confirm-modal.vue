<script setup lang="ts">
import { computed, useSlots } from "vue";
import type { ButtonVariants } from "@/shared/components/ui/button";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui";

const props = withDefaults(
  defineProps<{
    open?: boolean;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: ButtonVariants["variant"];
    pending?: boolean;
  }>(),
  {
    open: false,
    description: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    confirmVariant: "default",
    pending: false,
  },
);

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

const slots = useSlots();
const hasTrigger = computed(() => Boolean(slots.trigger));

const handleOpenChange = (value: boolean) => {
  emit("update:open", value);
};

const closeModal = () => {
  emit("update:open", false);
};

const handleCancel = () => {
  emit("cancel");
  closeModal();
};

const handleConfirm = () => {
  if (props.pending) return;

  emit("confirm");
  closeModal();
};
</script>

<template>
  <Dialog modal :open="open" @update:open="handleOpenChange">
    <DialogTrigger v-if="hasTrigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription v-if="description">
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <slot />

      <DialogFooter>
        <Button variant="outline" @click="handleCancel">
          {{ cancelText }}
        </Button>
        <Button :variant="confirmVariant" :disabled="pending" @click="handleConfirm">
          {{ confirmText }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
