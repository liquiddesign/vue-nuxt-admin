<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'customer-group'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <CustomerGroupForm ref="form" url="eshop/customer-group" :data="formData" @success="redirect" />
  </BaseCard>
</template>

<script setup lang="ts">
const defaultFormData = {
  uuid: '',
  name : '',
  defaultCatalogPermission : '',
  defaultPricesWithVat : false,
  defaultPricesWithoutVat : false,
  defaultPriorityPrice : '',
  defaultDiscountLevelPct : 0,
  defaultMaxDiscountProductPct : 100,
  defaultBuyAllowed : false,
  defaultViewAllOrders : false,
  defaultAfterRegistration : false,
  autoActiveCustomers : false,
  pricelist: [],
  visibilityList: [],
};

const formData:any = ref(Object.assign({}, defaultFormData));

function redirect(id) {
  formData.value = Object.assign({}, defaultFormData);
  id ? navigateTo({name: 'customer-group-id', params: {id: id}}) :  navigateTo({name: 'customer-group'});
}
</script>