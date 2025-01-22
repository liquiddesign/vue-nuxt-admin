<script setup lang="ts">
const { filters, lang, langs } = useTableVars();
</script>

<template>
  <BasePageHeader title="Dostupnost" description="Administrace dostupnosti" icon="pe-7s-box1">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'amount-new'})">Přidat dostupnost</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #header>
      <AmountTableFilter v-model="filters">
        <BaseLanguageDropdown class="me-1" :lang="lang" :langs="langs" @select="lang = $event" />
      </AmountTableFilter>
    </template>
    <template #body>
      <AmountTable :filters="filters" :lang="lang" />
    </template>
  </BaseCard>
</template>