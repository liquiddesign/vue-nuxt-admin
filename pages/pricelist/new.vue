<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'pricelist'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <PricelistForm ref="form" url="eshop/pricelist" :data="formData" @success="redirect" />
  </BaseCard>
</template>

<script setup lang="ts">
const defaultFormData = {
  uuid: '',
};

const formData:any = ref(Object.assign({}, defaultFormData));

function redirect(id) {
  formData.value = Object.assign({}, defaultFormData);
  id ? navigateTo({name: 'pricelist-id', params: {id: id}}) :  navigateTo({name: 'pricelist'});
}
</script>