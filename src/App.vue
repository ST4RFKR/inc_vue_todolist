<script setup lang="ts">
import { Header } from "./shared/components/common";
import { useMe } from "./features/auth/sign-in/model/use-me";

useMe();
</script>

<template>
  <div class="w-285 mx-auto">
    <Header />
    <router-view></router-view>
  </div>
</template>
