<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'currencies'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <template #headerRight>
      <BaseButtonExternalLink v-if="0" class="me-1" />
      <BaseButtonRefresh class="btn-sm me-1" @click="refresh();" />
      <BaseDropdown class="btn-outline-primary me-1" icon-name="Zap">
        <BaseDropdownItem @click="makeCopy()">Vytvořit kopii</BaseDropdownItem>
      </BaseDropdown>
      <BaseButtonDelete :confirmation="true" :outline="true" class="btn-sm" @confirm="deleteItem()" />
    </template>
    <template #body>
      <VatRatesForm ref="form" :data="data" :slug="route.params.id" :loading="pending" @success="redirect">
        <template #top><h5 class="card-title">Měna #{{ data?.id }}</h5></template>
      </VatRatesForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">
const route = useRoute();

const {data, pending, refresh} = useApiFetch('currency/' + route.params.id);
const {deleteItem, makeCopy, redirect} = useDetailMethods('currency', 'currencies');

</script>