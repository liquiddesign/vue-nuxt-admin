<script setup lang="ts">
const { filters, lang } = useTableVars();
</script>

<template>
  <BasePageHeader :title="'Dostupnost'" :icon="'icon'" />
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <AmountTableFilter v-model="filters" />
    </template>
    <template #headerRight>
      <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'amount-new'})">Nová položka</BaseButtonNew>
    </template>
    <template #body>
      <AmountTable :filters="filters" :lang="lang" />
    </template>
  </BaseCard>
</template>