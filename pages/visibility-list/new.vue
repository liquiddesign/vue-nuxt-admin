<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'visibility-list'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <VisibilityListForm ref="form" url="eshop/visibility-list" :data="formData" @success="redirect" />
  </BaseCard>
</template>

<script setup lang="ts">
const defaultFormData = {
  uuid: '',
  code: '',
  name: '',
  priority: 0,
  hidden: false,
};
const formData:any = ref(Object.assign({}, defaultFormData));

function redirect(id) {
  formData.value = Object.assign({}, defaultFormData);
  id ? navigateTo({name: 'visibility-list-id', params: {id: id}}) :  navigateTo({name: 'visibility-list'});
}
</script>