<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'display-amount'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
      <BaseLanguageList :langs="settings.langs" :lang="lang" @select="lang = $event" />
    </template>
    <template #headerRight>
      <BaseButtonExternalLink v-if="0" class="me-1" />
      <BaseButtonRefresh class="btn-sm me-1" @click="refresh();" />
      <BaseDropdown class="btn-outline-primary me-1" icon-name="Zap">
        <BaseDropdownItem @click="makeCopy()">Vytvořit kopii</BaseDropdownItem>
      </BaseDropdown>
      <BaseButtonDelete :confirmation="true" :outline="true" class="btn-sm btn-danger" @confirm="deleteItem()" />
    </template>
    <DisplayAmountForm ref="form" :lang="lang" :data="data" :loading="pending" url="/eshop/display-amount" :slug="route.params.id" @success="redirect" />
  </BaseCard>
</template>

<script setup lang="ts">
const route = useRoute();
const { settings } = useUser();
const lang: Ref<string> = ref(settings.value.defaultLang);

const {data, pending, refresh} = useApiFetch('/eshop/display-amount/' + route.params.id);
const {deleteItem, makeCopy, redirect} = useDetailMethods('eshop/display-amount/', 'display-amount');

</script>