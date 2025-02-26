<template>
  <BasePageHeader title="Doručení" description="" icon="CalendarClock">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'display-delivery-new'})">Přidat doručení</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <DisplayDeliveryTableFilter v-model="filters" @clear="clearFilters">
        <BaseLanguageDropdown class="me-1" :lang="lang" :langs="langs" @select="lang = $event" />
      </DisplayDeliveryTableFilter>
    </template>
    <DisplayDeliveryTable v-model:page="page" v-model:on-page="onPage" v-model:order="order" :filters="filters" :lang="lang" />
  </BaseCard>
</template>

<script setup lang="ts">
const { filters, clearFilters, lang, langs, page, onPage, order } = useTableVars();
</script>