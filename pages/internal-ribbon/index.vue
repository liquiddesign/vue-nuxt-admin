<template>
  <BasePageHeader title="Štítky" description="Administrace štítků" icon="pe-7s-ribbon">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'internal-ribbon-new'})">Přidat štítek</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <InternalRibbonTableFilter v-model="filters" />
    </template>
    <InternalRibbonTable :filters="filters" />
  </BaseCard>
</template>

<script setup lang="ts">
const { filters } = useTableVars();
</script>