<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'administrators'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <template #body>
      <AdministratorsForm ref="form" :data="data" @success="redirect">
        <template #top><h5 class="card-title">Nový administrátor</h5></template>
      </AdministratorsForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">

const defaultFormData = { priority: 0};
const data:any = ref(Object.assign({}, defaultFormData));

function redirect(id?: string) {
  data.value = Object.assign({}, defaultFormData);
  id ? navigateTo({name: 'administrators-id', params: {id: id}}) :  navigateTo({name: 'administrators'});
}


</script>