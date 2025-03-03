<template>
  <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters" :order="order" @change-order="emit('update:order', $event)">
    <template #header>
      <tr>
        <BaseGridThSelect />
        <BaseGridTh class="minimal" order-by="id">#</BaseGridTh>
        <BaseGridTh class="minimal">
          <BaseButtonFilter v-if="!showFilters" class="btn-xs" :show-filters="showFilters" @click="showFilters = !showFilters" />
          <BaseButtonFilterDelete v-if="showFilters" class="btn-xs" @click="clearFilters(); showFilters = !showFilters;" />
        </BaseGridTh>
        <BaseGridTh order-by="name">Popisek</BaseGridTh>
        <BaseGridTh order-by="type" style="width: 400px">Typ</BaseGridTh>
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
        <BaseGridTh><BaseHeaderFilter v-model="filters" name="f-name" placeholder="Popisek" field-type="text" text-type="text" /></BaseGridTh>
        <BaseGridTh><BaseHeaderFilter v-model="filters" name="f-type" placeholder="Typ" field-type="select" :options="typeOptions" /></BaseGridTh>
        <BaseGridTh>
          <BaseHeaderFilter name="f-color" field-type="custom">
            <BaseColorPicker v-model="filters['f-color']" name="f-color" style="width: 30px" />
            <BaseButtonFilter :class="filters['f-color'] ? 'active' : 'btn-outline-secondary disabled'" />
            <BaseButtonFilterCancel class="flex-shrink-0" :disabled="!filters['f-color']" @click="delete(filters['f-color']);" />
          </BaseHeaderFilter>
        </BaseGridTh>
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
        <td class="minimal"><BaseColorPicker :model-value="item.color" /></td>
        <td class="minimal"><BaseColorPicker :model-value="item.backgroundColor" /></td>
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
  filters?: any | null,
  page: number,
  onPage: number,
  order: GridOrder,
}>(), { filters: {} });

const url: string = '/eshop/internal-ribbon';
const emit = defineEmits(['update:page', 'update:onPage', 'update:order', 'clear']);
const { filters, clearFilters, showFilters } = useTableVars();

const typeOptions = {
  product: 'product',
  order: 'order',
  price_list: 'price_list',
};
</script>