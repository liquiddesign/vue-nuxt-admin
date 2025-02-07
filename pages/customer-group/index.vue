<template>
  <BasePageHeader title="Skupiny zákazníků" description="Administrace skupin zákazníků" icon="pe-7s-users">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'customer-group-new'})">Přidat skupinu zákazníků</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #header>
      <CustomerGroupTableFilter v-model="filters" @clear="clearFilters" />
    </template>
    <CustomerGroupTable v-model:page="page" v-model:on-page="onPage" v-model:order="order" :filters="filters" />
  </BaseCard>
</template>

<script setup lang="ts">
const { filters, clearFilters, page, onPage, order } = useTableVars();
</script>