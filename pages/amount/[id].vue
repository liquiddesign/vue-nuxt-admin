<script setup lang="ts">
const route = useRoute();
const { settings } = useUser();
const lang: Ref<string> = ref(settings.value.defaultLang);

const {data, pending} = useApiFetch('/eshop/display-amount/' + route.params.id);

</script>

<template>
  <BasePageHeader :title="'Detail'" :icon="'icon'" />
  <BaseCard>
    <template #header>
      <BaseButton class="btn-secondary" @click="navigateTo({ name: 'amount'})">
        <i class="fa fa-long-arrow-left" />
        Zpět
      </BaseButton>
    </template>
    <AmountForm ref="form" :lang="lang" :data="data" :loading="pending" url="/eshop/display-amount" :slug="route.params.id" />
  </BaseCard>
</template>