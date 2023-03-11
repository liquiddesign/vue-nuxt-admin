<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import {User} from "~/utils/User";
const layout:string = "default";

const user: User = reactive({identity: {}, isLoggedIn: null});

</script>
