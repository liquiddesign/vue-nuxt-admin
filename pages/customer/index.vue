<template>
  <BasePageHeader title="Zákaznici" description="Administrace zákazníků" icon="pe-7s-users">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'customer-new'})">Přidat zákazníka</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #header>
      <CustomerTableFilter v-model="filters" @clear="clearFilters" />
    </template>
    <CustomerTable v-model:page="page" v-model:on-page="onPage" v-model:order="order" :filters="filters" />
  </BaseCard>
</template>

<script setup lang="ts">
const { filters, clearFilters, page, onPage, order } = useTableVars();
</script>