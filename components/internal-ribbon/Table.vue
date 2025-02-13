<template>
  <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters" :order="order" @change-order="emit('update:order', $event)">
    <template #header>
      <tr>
        <BaseGridThSelect />
        <BaseGridTh order-by="id">#</BaseGridTh>
        <BaseGridTh />
        <BaseGridTh order-by="name">Popisek</BaseGridTh>
        <BaseGridTh order-by="type">Typ</BaseGridTh>
        <BaseGridTh class="minimal" order-by="color">Barva textu</BaseGridTh>
        <BaseGridTh class="minimal" order-by="backgroundColor">Barva pozadí</BaseGridTh>
        <BaseGridTh class="minimal"><BaseGridThSettings /></BaseGridTh>
      </tr>
    </template>
    <template v-if="showFilters" #filters>
      <tr>
        <BaseGridTh />
        <BaseGridTh />
        <BaseGridTh />
        <BaseGridTh><BaseHeaderFilter :model-value="filters" name="f-name%" placeholder="Popisek" type="text" /></BaseGridTh>
        <BaseGridTh><BaseHeaderFilter :model-value="filters" name="f-type" placeholder="Typ" type="select" :options="typeOptions" /></BaseGridTh>
        <BaseGridTh class="minimal" />
        <BaseGridTh class="minimal" />
        <BaseGridTh class="minimal" />
      </tr>
    </template>
    <template #body="{item, selected, deleteRow}">
      <tr :class="{'inactive': item.hidden, 'active': selected}">
        <BaseGridTdSelect :id="item.uuid" />
        <td class="minimal">{{ item.id }}  ☰</td>
        <td class="minimal"><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'internal-ribbon-id', params: { id: item.uuid }})" /></td>
        <td>{{ item.name ?? '-' }}</td>
        <td>{{ item.type ?? '-' }}</td>
        <td class="minimal"><BaseColorPicker :model-value="item.color" disabled /></td>
        <td class="minimal"><BaseColorPicker :model-value="item.backgroundColor" disabled /></td>
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
import BaseHeaderFilter from '~/components/BaseHeaderFilter.vue';

withDefaults(defineProps<{
  filters?: any,
  showFilters?: boolean,
  page: number,
  onPage: number,
  order: GridOrder,
}>(), { filters: {}  });

const url: string = '/eshop/internal-ribbon';
const emit = defineEmits(['update:page', 'update:onPage', 'update:order']);

const typeOptions = {
  product: 'product',
  order: 'order',
  price_list: 'price_list',
};
</script>