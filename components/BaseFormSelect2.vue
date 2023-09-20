<template>
  <VueMultiselect
    track-by="uuid"
    :model-value="optionsValues?.[input.parent] ?? null"
    :options-limit="200"
    label="displayName"
    :searchable="true"
    :options="options2"
    placeholder="Zvolte položku ..."
    select-label=""
    deselect-label="odstranit"
    selected-label="Zvolena"
    @update:model-value="(value) => input.parent = value?.uuid"
  >
    <template #option="{option}">{{ option?.displayName }}</template>
  </VueMultiselect>
</template>
<script setup lang="ts">
//const config = useRuntimeConfig();
const options2:Ref<string[]> = ref([]);
const optionsValues:Ref<object> = ref({});


/*
$fetch(config.public.baseURL + 'customer', {method: "POST", body: {'_op': 'optionsList'}}).then((response: any) => {

  options2.value = Object.values(response.result);
  optionsValues.value = response.result;

});*/

</script>