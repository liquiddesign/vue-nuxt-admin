<template>
  <BasePageHeader title="Štítky" description="Administrace štítků" icon="pe-7s-ribbon">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'internal-ribbon-new'})">Přidat štítek</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <InternalRibbonTableFilter v-model="filters">
        <BaseLanguageDropdown class="me-1" :lang="lang" :langs="langs" @select="lang = $event" />
      </InternalRibbonTableFilter>
    </template>
    <InternalRibbonTable :filters="filters" :lang="lang" />
  </BaseCard>
</template>

<script setup lang="ts">
const { filters, lang, langs } = useTableVars();
</script>