<template>
  <BaseWrapper :wrap="wrap">
    <button v-bind="$attrs" class="btn" :disabled="loading || $attrs['disabled']">
      <span v-if="loading" class="spinner-grow spinner-grow-xs me-1" role="status" aria-hidden="true" />
      <slot />
    </button>
  </BaseWrapper>
</template>

<script setup lang="ts">
import {withDefaults} from "vue/dist/vue";

withDefaults(defineProps<{
  wrap?: string
  loading?: boolean
}>(), { loading: false, wrap: undefined});

defineOptions({
  inheritAttrs: false,
});

</script>