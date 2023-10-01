<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label" :for="$attrs['id']">{{ label }}</label>
    <div style="height: 29.5px;">
      <VueMultiselect
        v-bind="$attrs"
        :options="optionArray"
        :options-limit="20"
        :loading="isLoading"
        :custom-label="customLabel"
        placeholder="Zvolte položku ..."
        select-label=""
        deselect-label="odstranit"
        selected-label="Zvolena"
        :model-value="form && name ? _get(form.input, name) : modelValue"
        @update:model-value="updateValue"
        @search-change="asyncSearch"
      >
        <template #option="{option}">
          <slot name="option" :option="option" />
          <template v-if="!$slots.option">
            {{ options?.[option] ?? option }}
          </template>
        </template>
        <template #noResult>
          <slot name="noResult" />
          <template v-if="!$slots.noResult">
            Źádná shoda ...
          </template>
        </template>
        <template #noOptions>
          <slot name="noOptions" />
          <template v-if="!$slots.noOptions">
            Źádné položky ...
          </template>
        </template>
      </VueMultiselect>
    </div>
  </BaseWrapper>
</template>
<script setup lang="ts">
import VueMultiselect from "vue-multiselect";
import BaseWrapper from "~/components/BaseWrapper.vue";
import {computed} from "vue";

const config = useRuntimeConfig();

const props = withDefaults(defineProps<{
  name?: string,
  wrap?: string,
  fetchUrl?: string,
  label?: string|null,
  options?: any,
  async?: boolean,
  asyncStartLength?: number,
  modelValue?: string|string[]|null,
  optionsUrl?: string,
  optionsUrlParams?: any,
  optionsUrlQueryName?: any,
}>(), { label: null, name: undefined, async: false, asyncStartLength: 1, optionsUrl: undefined, optionsUrlParams: {}, optionsUrlQueryName: 'q', options: {}, wrap: undefined, modelValue: undefined });

defineOptions({
  inheritAttrs: false
})

const isLoading:Ref<boolean> = ref(false);
const options:Ref<any> = ref(props.options ?? {});

if (!props.async &&  props.optionsUrl) {
  isLoading.value = true;

  $fetch(config.public.baseURL + props.optionsUrl, props.optionsUrlParams).then((response: any) => {
    options.value = response.result;
  }).finally(() => {
    isLoading.value = false;
  });
}

const optionArray = computed(function () {
  return Object.keys(options.value);
});

const form: any = inject('form', null) as any;

function asyncSearch(query: string) {
  if (props.async &&  props.optionsUrl) {
    if (query.length > props.asyncStartLength) {
      isLoading.value = true;

      const params = props.optionsUrlParams;
      params['query'] = {[props.optionsUrlQueryName]: query};

      $fetch(config.public.baseURL + props.optionsUrl, params).then((response: any) => {
        options.value = response.result;
      }).finally(() => {
        isLoading.value = false;
      });
    }
  }
}

const $emit = defineEmits(['update:modelValue'])

function updateValue(value: string[]) {
  if (form) {
    form.updateInput(props.name, value);
  }

  $emit('update:modelValue', value);
}

function customLabel(key: string)
{
    return options.value[key] ?? (!props.optionsUrl ? key : null);
}

</script>