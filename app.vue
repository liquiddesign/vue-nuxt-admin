<template>
  <NuxtLayout>
      <NuxtPage keepalive />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import {User} from "~/utils/User";
import nuxtStorage from "nuxt-storage";
//const layout:string = "default";
const route = useRoute();

const { $user } = useNuxtApp();



</script>

