<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'customer'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <template #body>
      <CustomerForm ref="form" url="eshop/customer" :data="formData" @success="redirect" />
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
const defaultFormData = {
  uuid: '',
  fullname: '',
  company: '',
  ic: '',
  dic: '',
  phone: '',
  email: '',
  ccEmails: '',
  group: '',
  preferredCurrency: '',
  preferredDeliveryType: '',
  preferredPaymentType: '',
  discountLevelPct: '',
  maxDiscountProductPct: '',
  productRoundingPct: '',
  allowExport: false,
  ediCompany: '',
  ediBranch: '',

};
const formData:any = ref(Object.assign({}, defaultFormData));

function redirect(id) {
  formData.value = Object.assign({}, defaultFormData);
  id ? navigateTo({name: 'customer-id', params: {id: id}}) :  navigateTo({name: 'customer'});
}
</script>