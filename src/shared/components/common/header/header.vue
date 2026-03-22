<script setup lang="ts">
import { BookText, LogIn, LogOut } from "@lucide/vue";
import { useRouter } from "vue-router";
import { Button } from "@/shared/components/ui";
import { navigationLinks } from "./navigations-links";
import ModeToggle from "../mode-toggle/mode-toggle.vue";
import { useAuthStore } from "@/shared/store/auth.store";
import { storeToRefs } from "pinia";
import { routerPaths } from "@/shared/config/routes";

const store = useAuthStore();
const router = useRouter();
const { isLoggedIn } = storeToRefs(store);

const handleLogout = () => {
  store.logout();
  router.push({ path: routerPaths.login });
};
</script>

<template>
  <header class="flex justify-between items-center p-4">
    <div class="flex items-center gap-2 text-primary">
      <BookText />
      <div>TODO-VUE 💚</div>
    </div>
    <div class="flex items-center gap-2">
      <nav>
        <ul class="flex gap-4">
          <li v-for="link in navigationLinks" :key="link.href">
            <Button as-child variant="link">
              <RouterLink
                :to="link.href"
                class="inline-flex items-center gap-2"
              >
                <component :is="link.icon" class="size-4" aria-hidden="true" />
                <span>{{ link.name }}</span>
              </RouterLink>
            </Button>
          </li>
          <li v-if="!isLoggedIn">
            <Button as-child variant="link">
              <RouterLink
                :to="routerPaths.login"
                class="inline-flex items-center gap-2"
              >
                <LogIn class="size-4" aria-hidden="true" />
                <span>Login</span>
              </RouterLink>
            </Button>
          </li>
          <li v-else>
            <Button
              variant="link"
              class="inline-flex items-center gap-2"
              @click="handleLogout"
            >
              <LogOut class="size-4" aria-hidden="true" />
              <span>Logout</span>
            </Button>
          </li>
        </ul>
      </nav>

      <ModeToggle />
    </div>
  </header>
</template>
