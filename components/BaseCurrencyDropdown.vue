<template>
  <div class="dropdown d-inline-block py-2">
    <slot />
    <a v-bind="$attrs" class="dropdown-toggle btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown" data-bs-boundary="body" data-boundary="body">{{ currency }}</a>
    <div class="dropdown-menu dropdown-menu-right pt-1 ps-2" tabindex="-1" style="min-width: 106px;" role="menu" aria-hidden="true">
      <div class="d-flex align-items-center flex-wrap gap-0">
        <div v-for="key in currencies" :key="key" class="flex-shrink-0">
          <a v-if="key !== currency" class="btn btn-xs btn-outline-dark me-1" @click="emit('select', key)">
            {{ key }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  currency: string,
  currencies: string[],
}>(), {});

import {withDefaults} from 'vue';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits(['select']);


</script>