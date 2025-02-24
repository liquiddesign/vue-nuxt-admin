<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label">
      {{ label }}
    </label>
    <input ref="el" class="form-control form-control-sm" @change="onChange()">
  </BaseWrapper>
</template>

<script setup lang="ts">
import { useIMask } from 'vue-imask';
import { numberToString } from '~/utils/helpers';

const props = defineProps({
  wrap: {type: String, default: ''},
  data: {type: Object, default: null},
  name: {type: String, default: ''},
  label: {type: String, default: null},
});

const { el, unmasked } = useIMask({
  mask: Number,
  thousandsSeparator: ' ',
  radix: ',',
  scale: 2,
  padFractionalZeros: true,
}, {
  defaultValue: numberToString(props.data[props.name]),
});

function onChange() {
  props.data[props.name] = Number(unmasked.value);
}
</script>