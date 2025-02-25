<template>
  <th class="minimal">
    <button type="button" class="btn btn-xs btn-outline-secondary me-1" @click="grid.refresh()">
      <BaseIcon icon-name="RefreshCw" />
    </button>
  </th>
</template>

<script setup lang="ts">
import {inject} from 'vue';

withDefaults(defineProps<{
  formRef?: object|null,
}>(), {formRef: null});


const grid: any = inject('grid') as any;

</script>