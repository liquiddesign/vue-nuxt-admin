<template>
  <BaseWrapper :wrap="wrap">
    <BaseWrapper :wrap="{'form-group': true, 'input-required': _get(form.validation.value, name)?.required}">
      <label v-if="label !== null" :for="form.name + '-' + name"><!-- flag -->{{ label }}</label>
      <input :id="form.name + '-' + name" class="form-control-sm form-control" v-bind="$attrs" :type="type === 'float' ? 'number' : type" :disabled="form.disabled.value" :value="_get(form.input, name)" @input="form.updateInput(name, $event.target.value, type, nullable)">
      <template v-if="_get(form.validation.value, name)?.$errors">
        <div v-for="(error, index) in _get(form.validation.value, name)?.$errors" :key="index" class="text-danger">
          {{ error.$message }}
        </div>
      </template>
    </BaseWrapper>
  </BaseWrapper>
</template>

<script setup lang="ts">
import {computed, inject, withDefaults} from "vue";
import BaseWrapper from "~/components/BaseWrapper.vue";

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<{
  name: string,
  type?: string,
  lang?: string,
  wrap?: string,
  value?: string,
  label?: string|null,
  nullable?: boolean
}>(), { type: 'text', label: null, nullable: false,lang: undefined, wrap: undefined, value: undefined });

const form: any = inject('form') as any;

computed( function () {
  return {
    'is-invalid' : _get(form.validation.value, props.name)?.$errors?.length > 0,
    'is-empty' : !_get(form.input, props.name),
  };
});

</script>