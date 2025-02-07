<template>
  <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters" :order="order" @change-order="emit('update:order', $event)">
    <template #header>
      <tr>
        <BaseGridThSelect />
        <BaseGridTh class="minimal" order-by="id">#</BaseGridTh>
        <BaseGridTh />
        <BaseGridTh order-by="name">Název</BaseGridTh>
        <BaseGridTh order-by="pricelists">Ceníky/Viditelníky</BaseGridTh>
        <BaseGridTh class="minimal" order-by="defaultCatalogPermission">Katalogové oprávnění</BaseGridTh>
        <BaseGridTh class="minimal" order-by="defaultBuyAllowed">Povolený nákup</BaseGridTh>
        <BaseGridTh class="minimal" order-by="defaultAfterRegistration">Výchozí po registraci</BaseGridTh>
        <BaseGridTh class="minimal"><BaseGridThSettings /></BaseGridTh>
      </tr>
    </template>
    <template #body="{item, selected, deleteRow}">
      <tr :class="{'inactive': item.hidden, 'active': selected}">
        <BaseGridTdSelect :id="item.uuid" />
        <td class="minimal">{{ item.id }}  ☰</td>
        <td class="minimal"><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'customer-group-id', params: { id: item.uuid }})" /></td>
        <td>{{ item.name ?? '-' }}</td>
        <td>{{ item.pricelists ?? '-' }}</td>
        <td class="minimal">{{ item.defaultCatalogPermission }}</td>
        <td class="minimal">{{ item.defaultBuyAllowed }}</td>
        <td class="minimal">{{ item.defaultAfterRegistration }}</td>
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
  filters?: any,
  page: number,
  onPage: number,
  order: GridOrder,
}>(), { filters: {}  });

const url: string = 'eshop/customer-group';
const emit = defineEmits(['update:page', 'update:onPage', 'update:order']);
</script>