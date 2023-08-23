<template>
  <BaseWrapper :wrap="wrap">
    <button v-bind="$attrs" class="btn btn-success btn-sm"><i class="fa fa-plus" /> <slot /></button>
  </BaseWrapper>
</template>

<script setup lang="ts">
const props = defineProps<{
  wrap?: string
}>();

</script>