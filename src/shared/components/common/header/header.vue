<script setup lang="ts">
import { BookText, LogIn, LogOut } from "@lucide/vue";
import { ref } from "vue";
import { Button } from "@/shared/components/ui";
import { ConfirmModal } from "@/shared/components/common/confirm-modal";
import { navigationLinks } from "./navigations-links";
import ModeToggle from "../mode-toggle/mode-toggle.vue";
import { useAuthStore } from "@/shared/store/auth.store";
import { storeToRefs } from "pinia";
import { routerPaths } from "@/shared/config/routes";
import { useLogout } from "@/features/auth/sign-in/model/use-logout";

const store = useAuthStore();
const { isLoggedIn } = storeToRefs(store);
const isLogoutModalOpen = ref(false);
const { logout } = useLogout();

const handleLogout = () => {
  logout();
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
            <ConfirmModal
              v-model:open="isLogoutModalOpen"
              title="Are you sure you want to log out?"
              description="You will need to log in again to continue."
              confirm-text="Logout"
              confirm-variant="destructive"
              @confirm="handleLogout"
            >
              <template #trigger>
                <Button variant="link" class="inline-flex items-center gap-2">
                  <LogOut class="size-4" aria-hidden="true" />
                  <span>Logout</span>
                </Button>
              </template>
            </ConfirmModal>
          </li>
        </ul>
      </nav>

      <ModeToggle />
    </div>
  </header>
</template>
