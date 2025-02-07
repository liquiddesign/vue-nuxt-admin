<template>
  <BasePageHeader title="Ceníky" description="Administrace ceníků" icon="pe-7s-note2">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'pricelist-new'})">Přidat ceník</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #header>
      <PricelistTableFilter v-model="filters" @clear="clearFilters" />
    </template>
    <PricelistTable v-model:page="page" v-model:on-page="onPage" v-model:order="order" :filters="filters" />
  </BaseCard>
</template>

<script setup lang="ts">
const { filters, clearFilters, page, onPage, order } = useTableVars();
</script>