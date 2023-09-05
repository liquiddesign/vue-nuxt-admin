<template>
  <BaseWrapper :wrap="wrap">
    <button type="button" v-bind="$attrs" class="btn btn-sm btn-outline-dark me-2">
      <i class="fa fa-times"></i>
    </button>
  </BaseWrapper>
</template>

<script setup lang="ts">
const props = defineProps<{
  wrap?: string
}>();

defineOptions({
  inheritAttrs: false
})

</script>