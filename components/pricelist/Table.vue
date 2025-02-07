<template>
  <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters" :order="order" @change-order="emit('update:order', $event)">
    <template #header>
      <tr>
        <BaseGridThSelect />
        <BaseGridTh class="minimal" order-by="id">#</BaseGridTh>
        <BaseGridTh />
        <BaseGridTh class="minimal" order-by="code">Kód</BaseGridTh>
        <BaseGridTh class="minimal" order-by="currency">Měna</BaseGridTh>
        <BaseGridTh order-by="name">Název</BaseGridTh>
        <BaseGridTh order-by="description">Popis</BaseGridTh>
        <BaseGridTh class="minimal" order-by="discounts">Slevy</BaseGridTh>
        <BaseGridTh class="minimal" order-by="supplier">Zdroj</BaseGridTh>
        <BaseGridTh class="minimal" order-by="priority">Priorita</BaseGridTh>
        <BaseGridTh class="minimal" order-by="isActive">Aktivní</BaseGridTh>
        <BaseGridTh class="minimal"><BaseGridThSettings /></BaseGridTh>
      </tr>
    </template>
    <template #body="{item, selected, deleteRow, updateRow}">
      <tr :class="{'inactive': item.hidden, 'active': selected}">
        <BaseGridTdSelect :id="item.uuid" />
        <td class="minimal">{{ item.id }}  ☰</td>
        <td class="minimal"><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'pricelist-id', params: { id: item.uuid }})" /></td>
        <td class="minimal">{{ item.code ?? '-' }}</td>
        <td class="minimal">{{ item.currency ?? '-' }}</td>
        <td>{{ item.name ?? '-' }}</td>
        <td>{{ item.description ?? '-' }}</td>
        <td class="minimal">{{ item.discounts?.map((item: any) => item['name'].cs || null).join(', ') }}</td>
        <td class="minimal">{{ item.supplier.name ?? '-' }}</td>
        <td class="minimal"><BaseTextBox v-model="item.priority" type="number" class="form-control-xs" style="width: 50px;" @change="(e) => updateRow(parseInt(e.target.value), 'priority')" /></td>
        <td class="minimal"><BaseCheckBox v-model="item.isActive" @change="(e) => updateRow(e.target.checked, 'isActive')" /></td>
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

const url: string = 'eshop/pricelist?expand=supplier,discounts,internalRibbons';
const emit = defineEmits(['update:page', 'update:onPage', 'update:order']);
</script>