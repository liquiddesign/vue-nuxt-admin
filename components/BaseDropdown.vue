<template>
  <div class="dropdown d-inline-block">
    <!-- eslint-disable vue/no-v-html -->
    <template v-if="iconFilter">
      <button :disabled="loading || $attrs['disabled']" class="btn dropdown-toggle btn btn-sm me-1" v-bind="$attrs" type="button" aria-haspopup="true" data-bs-toggle="dropdown" data-bs-boundary="body" data-boundary="body">
        <Filter :size="16" />
      </button>
    </template>
    <button v-else :disabled="loading || $attrs['disabled']" class="btn dropdown-toggle btn btn-sm me-1" v-bind="$attrs" type="button" aria-haspopup="true" data-bs-toggle="dropdown" data-bs-boundary="body" data-boundary="body" v-html="htmlLabel" />
    <!--eslint-enable-->
    <div class="dropdown-menu  dropdown-menu dropdown-menu-end" tabindex="-1" role="menu" aria-hidden="true">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Filter } from 'lucide-vue-next';

const props = withDefaults(defineProps<{
  loading?: boolean,
  icon?: string,
  iconFilter?: boolean,
  label?: string,
}>(), {loading: false, icon: undefined, label: ''});

import {computed} from 'vue';

const htmlLabel = computed(function () {
  if (!props.icon) {
    return props.label;
  }

  return (props.loading ? ' <i class=\'fa fa-spinner fa-spin\'></i>' : '<i class=\'fa ' + props.icon + '\'></i>') + (props.label ? '&nbsp;' + props.label : '');
});

defineOptions({
  inheritAttrs: false,
});


</script>