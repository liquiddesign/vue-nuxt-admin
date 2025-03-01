<template>
  <LucideRocket />
  <LucideFolderGit2 color="red" />
  <LucideGithub :size="32" stroke-width="1" />

  <vue-tel-input v-model="modelValue" />
  {{ rawValue }}
</template>
<script setup lang="ts">
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

const rawValue  = ref('+213724150005');
const rawValue2  = ref('+420724150005');

const modelValue = computed({
  get: () => {
    if (0) {
      return rawValue.value;
    } else {
      return rawValue2.value;
    }
  },
  set: (newValue) => {
    if (0) {
      rawValue.value = newValue;
    } else {
      rawValue2.value = newValue;
    }
  },
});


</script>