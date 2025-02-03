<template>
  <BasePageHeader title="Dostupnost" description="Administrace dostupnosti" icon="pe-7s-box1">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'display-amount-new'})">Přidat dostupnost</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #header>
      <DisplayAmountTableFilter v-model="filters" @clear="clearFilters">
        <BaseLanguageDropdown class="me-1" :lang="lang" :langs="langs" @select="lang = $event" />
      </DisplayAmountTableFilter>
    </template>
    <template #body>
      <DisplayAmountTable v-model:page="page" v-model:on-page="onPage" v-model:order="order" :filters="filters" :lang="lang" />
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
const { filters, clearFilters, lang, langs, page, onPage, order } = useTableVars();
</script>