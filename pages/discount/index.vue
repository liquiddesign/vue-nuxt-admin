<template>
  <BasePageHeader title="Slevy" description="Administrace slev" icon="pe-7s-ticket">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'discount-new'})">Přidat ceník</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #header>
      <DiscountTableFilter v-model="filters" @clear="clearFilters">
        <BaseLanguageDropdown class="me-1" :lang="lang" :langs="langs" @select="lang = $event" />
      </DiscountTableFilter>
    </template>
    <DiscountTable v-model:page="page" v-model:on-page="onPage" v-model:order="order" :lang="lang" :filters="filters" />
  </BaseCard>
</template>

<script setup lang="ts">
const { filters, clearFilters, lang, langs, page, onPage, order } = useTableVars();
</script>