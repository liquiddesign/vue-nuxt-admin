<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'internal-ribbon'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <InternalRibbonForm ref="form" :data="formData" @success="redirect" />
  </BaseCard>
</template>

<script setup lang="ts">

const formData:any = ref({ code: '', name: {cs: '', en: ''}, priority: 0});

function redirect(id) {
  formData.value = { code: '', name: {cs: '', en: ''}, priority: 0};
  id ? navigateTo({name: 'internal-ribbon-id', params: {id: id}}) :  navigateTo({name: 'internal-ribbon'});
}
</script>