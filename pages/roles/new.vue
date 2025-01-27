<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'roles'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <template #headerRight>
      <BaseLiveUsers class="me-2" />
    </template>
    <template #body>
      <RolesForm ref="form" :data="data" @success="redirect">
        <template #top><h5 class="card-title">Nová role</h5></template>
      </RolesForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">

const defaultFormData = { permissions: {}};
const data:any = ref(Object.assign({}, defaultFormData));

function redirect(id?: string) {
  data.value = Object.assign({}, defaultFormData);
  id ? navigateTo({name: 'roles-id', params: {id: id}}) :  navigateTo({name: 'roles'});
}


</script>