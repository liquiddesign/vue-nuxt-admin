<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label" :for="form.name + '-' + name">{{ label }}</label>
    <div style="height: 29.5px;">
      <VueMultiselect
        :id="form.name + '-' + name"
        v-bind="$attrs"
        :options="options"
        :options-limit="20"
        :loading="isLoading"
        :custom-label="customLabel"
        placeholder="Zvolte položku ..."
        select-label=""
        value="pse"
        deselect-label="odstranit"
        selected-label="Zvolena"
        :model-value="_get(form.input, name)"
        @update:model-value="updateValue"
        @search-change="asyncSearch"
      >
        <template #option="{option}">
          <slot name="option" :option="option" :object="objects[option]" />
          <template v-if="!$slots.option && objectLabel">
            {{ objects?.[option]?.[objectLabel] ?? option }}
          </template>
        </template>
      </VueMultiselect>
    </div>
  </BaseWrapper>
</template>
<script setup lang="ts">
import VueMultiselect from "vue-multiselect";
import BaseWrapper from "~/components/BaseWrapper.vue";

const config = useRuntimeConfig();

const props = withDefaults(defineProps<{
  name: string,
  lang?: string,
  wrap?: string,
  fetchUrl?: string,
  objectLabel?: string,
  label?: string|null,
  options?: string[],
  async?: boolean,
}>(), { label: null, async: false, objectLabel: 'displayName', options: () => [], lang: undefined, wrap: undefined, fetchUrl: undefined });

defineOptions({
  inheritAttrs: false
})

const isLoading:Ref<boolean> = ref(false);

//const data = reactive({keys :[], objects: ref({})  })

const options:Ref<string[]> = ref(props.options ?? []);
const objects:Ref<object> = ref({});
//const selectedObject:Ref<object> = ref({});

if (!props.async &&  props.fetchUrl) {
  isLoading.value = true;

  $fetch(config.public.baseURL + props.fetchUrl, {method: "POST", body: {'_op': 'optionsList'}}).then((response: any) => {
    options.value = Object.keys(response.result);
    objects.value = response.result;

  }).finally(() => {
    isLoading.value = false;
  });
}

/*if (props.prefetchId !== undefined) {
  watch(props.prefetchId, (value) => {
    if (value) {
      // fetch by id
    }
  });
}*/

const form: any = inject('form') as any;

function asyncSearch(query: string) {
  if (props.async &&  props.fetchUrl) {
      if (query.length > 1) {
        isLoading.value = true;

        $fetch(config.public.baseURL + props.fetchUrl, {method: "POST",  body: {'_op': 'optionsList'}, query: {'q': query}}).then((response: any) => {
          options.value = Object.keys(response.result);
          objects.value = response.result;

          isLoading.value = false;
        }).finally(() => {
          isLoading.value = false;
        });
      }
  }
}

function updateValue(value: string[]) {
  form.updateInput(props.name, value);
}

function customLabel(name: string)
{
  return objects.value?.[name]?.[props.objectLabel] ?? '';
}



</script>