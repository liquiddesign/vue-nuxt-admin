<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'currency'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <template #body>
      <CurrencyForm ref="form" :data="data" @success="redirect">
        <template #top><h5 class="card-title">Nová měna</h5></template>
      </CurrencyForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">


const defaultFormData = { priority: 0};
const data:any = ref(Object.assign({}, defaultFormData));

function redirect(id) {
  data.value = Object.assign({}, defaultFormData);
  id ? navigateTo({name: 'currency-id', params: {id: id}}) :  navigateTo({name: 'currency'});
}


</script>