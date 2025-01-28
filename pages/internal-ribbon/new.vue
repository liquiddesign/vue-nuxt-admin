<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'internal-ribbon'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <InternalRibbonForm ref="form" url="eshop/internal-ribbon" :data="formData" @success="redirect" />
  </BaseCard>
</template>

<script setup lang="ts">

const defaultFormData = {
  uuid: '',
  name: '',
  type: '',
  color: '',
  backgroundColor: '',
};
const formData:any = ref(Object.assign({}, defaultFormData));

function redirect(id) {
  formData.value = Object.assign({}, defaultFormData);
  id ? navigateTo({name: 'internal-ribbon-id', params: {id: id}}) :  navigateTo({name: 'internal-ribbon'});
}
</script>