<template>
  <BaseWrapper :wrap="wrap">
    <BaseWrapper :wrap="{'form-group': true, 'input-required': _get(form.validation.value, name)?.required}">
      <label v-if="label !== null" :for="form.name + '-' + name" class="form-check-label"><!-- flag -->
        <BaseCheckbox :id="form.name + '-' + name" :class="classes" v-bind="$attrs" :checked="_get(form.input, name)" @input="form.updateInput(name, $event.target.checked)" />
        {{ label }}
      </label>
      <div v-if="_get(form.validation.value, name)?.$errors" class="text-danger" v-for="(error, index) in _get(form.validation.value, name)?.$errors" :key="index">
        {{ error.$message }}
      </div>
    </BaseWrapper>
  </BaseWrapper>
</template>

<script setup lang="ts">
import {computed, inject, withDefaults} from "vue";
import BaseWrapper from "~/components/BaseWrapper.vue";

const props = withDefaults(defineProps<{
  name: string,
  lang?: string,
  wrap?: string,
  label?: string|null,
}>(), { type: 'text', label: null });

defineOptions({
  inheritAttrs: false
})

const form: any = inject('form') as any;

const classes = computed( function () {
  return {
    'is-invalid' : _get(form.validation.value, props.name)?.$errors?.length > 0,
    'is-empty' : !_get(form.input, props.name),
  };
});

</script>