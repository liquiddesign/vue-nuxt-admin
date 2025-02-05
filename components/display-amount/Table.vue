<template>
  <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters" :order="order" @change-order="emit('update:order', $event)">
    <template #header>
      <tr>
        <BaseGridThSelect />
        <BaseGridTh />
        <BaseGridTh order-by="label"><BaseFlag :lang="lang"/> Popisek</BaseGridTh>
        <BaseGridTh order-by="isSold">Vyprodáno</BaseGridTh>
        <BaseGridTh class="minimal" order-by="priority">Priorita</BaseGridTh>
        <BaseGridTh><BaseGridThSettings /></BaseGridTh>
      </tr>
    </template>
    <template #body="{item, selected, deleteRow, updateRow}">
      <tr :class="{'inactive': item.hidden, 'active': selected}">
        <BaseGridTdSelect :id="item.uuid" />
        <td class="minimal"><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'display-amount-id', params: { id: item.uuid }})" /></td>
        <td>{{ item.label[lang] ?? '-' }}</td>
        <td class="minimal"><BaseCheckBox v-model="item.isSold" @change="(e) => updateRow(e.target.checked, 'isSold')" /></td>
        <td class="minimal"><BaseTextBox v-model="item.priority" type="number" class="form-control-xs" style="width: 50px;" @change="(e) => updateRow(parseInt(e.target.value), 'priority')" /></td>
        <td class="minimal"><BaseButtonDelete class="btn-xs btn-danger" :confirmation="true" @confirm="deleteRow();" /></td>
      </tr>
    </template>
    <template #footer>
      <BaseGridPaginator wrap="flex-shrink-0" :url="url" :page="page" :on-page="onPage" :filters="filters" @change-page="emit('update:page', $event)" @change-on-page="emit('update:onPage', $event); page = 1;" />
    </template>
  </BaseGrid>
</template>

<script setup lang="ts">

import type {GridOrder} from '~/composables/useTableVars';

withDefaults(defineProps<{
  filters?: object
  lang: string,
  page: number,
  onPage: number,
  order: GridOrder,
}>(), {  });

const url: string = '/eshop/display-amount';
const emit = defineEmits(['update:page', 'update:onPage', 'update:order']);

</script>