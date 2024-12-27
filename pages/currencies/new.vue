<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'currencies'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <template #body>
      <CurrenciesForm ref="form" :data="data" @success="redirect">
        <template #top><h5 class="card-title">Nová měna</h5></template>
      </CurrenciesForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">


const defaultFormData = { priority: 0};
const data:any = ref(Object.assign({}, defaultFormData));

function redirect(id) {
  data.value = Object.assign({}, defaultFormData);
  id ? navigateTo({name: 'currencies-id', params: {id: id}}) :  navigateTo({name: 'currencies'});
}


</script>