<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'groups'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <template #headerRight>
      <BaseLiveUsers class="me-2" />
    </template>
    <template #body>
      <GroupsForm ref="form" :data="data" @success="redirect">
        <template #top><h5 class="card-title">Nová skupina</h5></template>
      </GroupsForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">

const defaultFormData = { };
const data:any = ref(Object.assign({}, defaultFormData));

function redirect(id?: string) {
  data.value = Object.assign({}, defaultFormData);
  id ? navigateTo({name: 'groups-id', params: {id: id}}) :  navigateTo({name: 'groups'});
}


</script>