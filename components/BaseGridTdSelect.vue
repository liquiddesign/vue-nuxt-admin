<template>
  <th class="minimal">
    <input v-model="$parent.selected[id]" type="checkbox" class="form-check-input">
  </th>
</template>

<script setup lang="ts">

defineProps<{
  id: string
}>();

</script>