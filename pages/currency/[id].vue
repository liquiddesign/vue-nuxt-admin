<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'currency'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <template #headerRight>
      <BaseButtonExternalLink v-if="0" class="me-1" />
      <BaseButtonRefresh class="btn-sm me-1" @click="refresh();" />
      <BaseDropdown class="btn-outline-primary me-1" icon-name="Zap">
        <BaseDropdownItem @click="makeCopy()">Vytvořit kopii</BaseDropdownItem>
      </BaseDropdown>
      <BaseButtonDelete :confirmation="true" :outline="true" class="btn-sm btn-danger" @confirm="deleteItem()" />
    </template>
    <template #body>
      <CurrencyForm ref="form" url="eshop/currency" :data="data" :slug="route.params.id" :loading="pending" @success="redirect">
        <template #top><h5 class="card-title">Měna #{{ data?.uuid }}</h5></template>
      </CurrencyForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">
const route = useRoute();

const {data, pending, refresh} = useApiFetch('eshop/currency/' + route.params.id);
const {deleteItem, makeCopy, redirect} = useDetailMethods('eshop/currency', 'currency');

</script>