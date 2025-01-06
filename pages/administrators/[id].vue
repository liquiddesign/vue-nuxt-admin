<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="router.back();" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <template #headerRight>
      <BaseLiveUsers class="me-2" />
      <BaseButtonExternalLink v-if="0" />
      <BaseButtonRefresh class="btn-sm me-1" @click="refresh();" />
      <BaseDropdown class="btn-outline-primary me-1" icon="fa-bolt">
        <BaseDropdownItem @click="makeCopy()">Vytvořit kopii</BaseDropdownItem>
      </BaseDropdown>
      <BaseButtonDelete :confirmation="true" :outline="true" class="btn-sm btn-danger" @confirm="deleteItem()" />
    </template>
    <template #body>
      <BaseLiveAlert :record-id="route.params.id.toString()" @refresh="refresh" />
      <AdministratorsForm ref="form" :data="data" :slug="route.params.id" :loading="pending" @success="redirect">
        <template #top><h5 class="card-title">Administrátor ID {{ data?.id }}</h5></template>
      </AdministratorsForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">

const route = useRoute();
const router = useRouter();

const {data, pending, refresh} = useApiFetch('administrators/' + route.params.id);
const {deleteItem, makeCopy, redirect} = useDetailMethods('administrators', 'administrators');

</script>