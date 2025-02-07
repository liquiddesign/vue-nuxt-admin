<template>
  <BasePageHeader title="Viditelníky" description="Administrace viditelníků" icon="pe-7s-home">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'visibility-list-new' })">Přidat viditelník</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <VisibilityListTableFilter v-model="filters" @clear="clearFilters" />
    </template>
    <VisibilityListTable v-model:page="page" v-model:on-page="onPage" v-model:order="order" :filters="filters" />
  </BaseCard>
</template>

<script setup lang="ts">
const { filters, clearFilters, page, onPage, order } = useTableVars();
</script>