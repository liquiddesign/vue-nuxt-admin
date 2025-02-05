<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'merchant'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <MerchantForm ref="form" url="eshop/merchant" :data="formData" @success="redirect" />
  </BaseCard>
</template>

<script setup lang="ts">
const defaultFormData = {
  uuid: '',
  code: '',
  fullname: '',
  email: '',
  customerGroup: '',
  // pricelists: '',
  // customers: '',
  customersPermission: false,
  ordersPermission: false,
  customerEmailNotification: false,
};
const formData:any = ref(Object.assign({}, defaultFormData));

function redirect(id) {
  formData.value = Object.assign({}, defaultFormData);
  id ? navigateTo({name: 'merchant-id', params: {id: id}}) :  navigateTo({name: 'merchant'});
}
</script>