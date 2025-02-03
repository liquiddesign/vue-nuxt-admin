<script setup lang="ts">
const { filters, lang, langs } = useTableVars();
</script>

<template>
  <BasePageHeader title="Doručení" description="" icon="pe-7s-date">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'display-delivery-new'})">Přidat doručení</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <DisplayDeliveryTableFilter v-model="filters">
        <BaseLanguageDropdown class="me-1" :lang="lang" :langs="langs" @select="lang = $event" />
      </DisplayDeliveryTableFilter>
    </template>
    <DisplayDeliveryTable :filters="filters" :lang="lang" />
  </BaseCard>
</template>