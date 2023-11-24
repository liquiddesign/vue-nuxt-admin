<template>
  <div class="dropdown d-inline-block">
    <slot />
    <a v-bind="$attrs" class="dropdown-toggle btn btn-sm btn-outline-secondary me-1" data-bs-toggle="dropdown" data-bs-boundary="body" data-boundary="body">  <BaseFlag :lang="lang" /></a>
    <div class="dropdown-menu dropdown-menu-right pt-2  ps-2" tabindex="-1" style="min-width: 76px;" role="menu" aria-hidden="true">
      <div class="d-flex align-items-center flex-wrap gap-1">
        <div v-for="key in langs" :key="key" class="flex-shrink-0">
          <a v-if="key !== lang" class="btn btn-xs btn-outline-dark me-1" @click="emit('select', key)">
            <BaseFlag :lang="key" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  lang: string,
  langs: string[],
}>(), {});

import {withDefaults} from 'vue';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits(['select']);


</script>