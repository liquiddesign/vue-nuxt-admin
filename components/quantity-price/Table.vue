<template>
  <BaseCard wrap="col-lg-12">
    <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters" :order="order" @change-order="emit('update:order', $event)">
      <template #header>
        <tr>
          <BaseGridTh class="minimal" order-by="id">#</BaseGridTh>
          <BaseGridTh class="minimal" order-by="product">Kód produktu</BaseGridTh>
          <BaseGridTh order-by="product">Produkt</BaseGridTh>
          <BaseGridTh class="minimal" order-by="price">Cena</BaseGridTh>
          <BaseGridTh class="minimal" order-by="priceVat">Cena s daní</BaseGridTh>
          <BaseGridTh class="minimal" order-by="validFrom">Od jakého množství je cena</BaseGridTh>
        </tr>
      </template>
      <template #body="{item, updateRow}">
        <tr>
          <td class="minimal">{{ item.id }}  ☰</td>
          <td class="minimal">{{ item.product.code ?? '-' }}</td>
          <td>{{ item.product.name ?? '-' }}</td>
          <td class="minimal"><BaseTextBox v-model="item.price" type="number" class="form-control-xs" style="width: 50px;" @change="(e) => updateRow(parseInt(e.target.value), 'price')" /></td>
          <td class="minimal"><BaseTextBox v-model="item.priceVat" type="number" class="form-control-xs" style="width: 50px;" @change="(e) => updateRow(parseInt(e.target.value), 'priceVat')" /></td>
          <td class="minimal">{{ item.product.validFrom ?? '-' }}</td>
        </tr>
      </template>
      <template #footer>
        <BaseGridPaginator wrap="flex-shrink-0" :url="url" :page="page" :on-page="onPage" :filters="filters" @change-page="emit('update:page', $event)" @change-on-page="emit('update:onPage', $event); page = 1;" />
      </template>
    </BaseGrid>
  </BaseCard>
</template>

<script setup lang="ts">
import type {GridOrder} from '~/composables/useTableVars';

withDefaults(defineProps<{
  filters?: any,
  page: number,
  onPage: number,
  order: GridOrder,
}>(), { filters: {} });

const url: string = 'eshop/price';
const emit = defineEmits(['update:page', 'update:onPage', 'update:order']);
</script>