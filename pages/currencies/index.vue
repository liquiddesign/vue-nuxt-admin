<template>
  <BasePageHeader title="Měny" icon="pe-7s-edit" description="Administrace dostupných měn">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'currencies-new'})">Přidat měnu</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <BaseFilter @cancel="filters={}">
        <BaseTextBox v-model="filters.q" wrap="flex-shrink-0" :placeholder="'Název, kód, #id'" type="text" />
      </BaseFilter>
    </template>
    <template #headerRight>
      <BaseCurrencyDropdown class="me-2" :currency="currency" :currencies="currencies" @select="currency=$event;" />
    </template>
    <BaseGrid ref="grid" url="currency" :page="page" :on-page="onPage" :filters="filters" :params="{currency: currency, lang: lang}">
      <template #header>
        <tr>
          <BaseGridThSelect />
          <BaseGridTh class="minimal" order-by="id">#</BaseGridTh>
          <BaseGridTh />
          <BaseGridTh class="minimal" order-by="code">Kód</BaseGridTh>
          <BaseGridTh order-by="name">Název</BaseGridTh>
          <BaseGridTh class="minimal" order-by="hidden"><i class="fa fa-eye-slash" /></BaseGridTh>
          <BaseGridTh><BaseGridThSettings /></BaseGridTh>
        </tr>
      </template>
      <template #body="{item, selected, deleteRow, updateRow}">
        <tr :class="{'inactive': item.hidden, 'active': selected}">
          <BaseGridTdSelect :id="item.uuid" />
          <td class="minimal">{{ item.id }}</td>
          <td class="minimal"><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'currencies-id', params: { id: item.uuid }})" /></td>
          <td class="minimal">{{ item.code }}</td>
          <td>{{ item.name }}</td>
          <td class="minimal"><BaseCheckBox v-model="item.hidden" @change="(e) => updateRow(e.target.checked, 'hidden')" /></td>
          <td class="minimal"><BaseButtonDelete class="btn-xs" :confirmation="true" @confirm="deleteRow();" /></td>
        </tr>
      </template>
      <template #footer="{deleteRows, exportRows, selectedCount, disabledControls, selectedQuery, resetSelect}">
        <BaseGridSelectAll wrap="flex-shrink-0 me-1 ms-1" />
        <BaseGridPaginator v-slot="{ totalCount }" wrap="flex-shrink-0" url="currency" :page="page" :on-page="onPage" :filters="filters" @change-page="page = $event" @change-on-page="onPage = $event; page = 1;">
          <BaseButtonEdit class="btn-paging" :outline="true" :disabled="disabledControls" @click="$refs.modalUpdate.open();">({{ selectedCount(totalCount) }})</BaseButtonEdit>
          <BaseButtonExport class="btn-paging" :outline="true" :disabled="disabledControls" @click="exportRows();">({{ selectedCount(totalCount) }})</BaseButtonExport>
          <BaseButtonDelete class="btn-paging" :outline="true" :disabled="disabledControls" :confirmation="true" @confirm="deleteRows();">({{ selectedCount(totalCount) }})</BaseButtonDelete>
        </BaseGridPaginator>
      </template>
    </BaseGrid>
  </BaseCard>
</template>

<script setup lang="ts">

import {ToastPluginApi, useToast} from 'vue-toast-notification';

const { $price } = useNuxtApp();

const filters: any = ref({});
const defaultFormData = {recommended: {strategy: 'noAction', value: false}, hidden: {strategy: 'noAction', value: false}};
const formData: any = ref({recommended: {strategy: 'noAction', value: false}, hidden: {strategy: 'noAction', value: false}});
const page = ref(1);
const onPage = ref(20);
const lang = ref('cs');
const currency = ref('CZK');
const currencies = ref(['CZK', 'EUR', 'USD']);
const langs = ref(['cs', 'en']);
const toast: ToastPluginApi = inject('toast', useToast());

function setDefaults()
{
  Object.assign(formData.value.recommended, defaultFormData.recommended);
  Object.assign(formData.value.hidden, defaultFormData.hidden);
}

</script>