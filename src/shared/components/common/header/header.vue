<script setup lang="ts">
import { BookText } from "@lucide/vue";
import Button from "../../ui/button/Button.vue";
import { navigationLinks } from "./navigations-links";
</script>

<template>
  <header class="flex justify-between items-center p-4">
    <div class="flex items-center gap-2 text-primary">
      <BookText />
      <div>TODO-VUE 💚</div>
    </div>
    <nav>
      <ul class="flex gap-4">
        <li v-for="link in navigationLinks" :key="link.href">
          <Button as-child variant="link">
            <RouterLink :to="link.href" class="inline-flex items-center gap-2">
              <component :is="link.icon" class="size-4" aria-hidden="true" />
              <span>{{ link.name }}</span>
            </RouterLink>
          </Button>
        </li>
      </ul>
    </nav>
  </header>
</template>
