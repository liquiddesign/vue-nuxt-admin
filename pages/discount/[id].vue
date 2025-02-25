<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'discount'})" />
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
    <DiscountForm ref="form" :data="data" :lang="lang" url="eshop/discount" :slug="route.params.id" :loading="pending" @success="redirect" />
  </BaseCard>
</template>

<script setup lang="ts">
const route = useRoute();
const { settings } = useUser();
const lang: Ref<string> = ref(settings.value.defaultLang);

const {data, pending, refresh} = useApiFetch('eshop/discount/' + route.params.id + '?expand=pricelists-uuid,coupons,ribbons-uuid');
const {deleteItem, makeCopy, redirect} = useDetailMethods('eshop/discount/', 'discount');
</script>