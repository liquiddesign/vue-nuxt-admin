<template>
  <BaseCard wrap="col-lg-12">
    <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters" :order="order" @change-order="emit('update:order', $event)">
<!--      <template v-if="showFilters" #header>-->
<!--        <tr>-->
<!--          <BaseGridTh class="minimal" order-by="id">#</BaseGridTh>-->
<!--          <BaseGridTh class="" order-by="product">Kód</BaseGridTh>-->
<!--          <BaseGridTh order-by="product">Název</BaseGridTh>-->
<!--          <BaseGridTh class="minimal" order-by="price">Cena</BaseGridTh>-->
<!--          <BaseGridTh class="minimal" order-by="priceVat">Cena s DPH</BaseGridTh>-->
<!--          <BaseGridTh class="minimal" order-by="priceBefore">Cena před slevou</BaseGridTh>-->
<!--          <BaseGridTh class="minimal" order-by="priceVatBefore">Cena s DPH před slevou</BaseGridTh>-->
<!--          <BaseGridTh class="minimal" order-by="hidden"><BaseIcon icon-name="EyeOff" /></BaseGridTh>-->
<!--        </tr>-->
<!--      </template>-->
      <template v-if="showFilters" #filters>
        <tr>
          <BaseGridTh class=""></BaseGridTh>
          <BaseGridTh class=""><BaseHeaderFilter v-model="filters" name="f-product" placeholder="Kód" field-type="text" text-type="text" /></BaseGridTh>
          <BaseGridTh><BaseHeaderFilter v-model="filters" name="f-product" placeholder="Název" field-type="text" text-type="text" /></BaseGridTh>
          <BaseGridTh class=""></BaseGridTh>
          <BaseGridTh class=""></BaseGridTh>
          <BaseGridTh class=""></BaseGridTh>
          <BaseGridTh class=""></BaseGridTh>
          <BaseGridTh class=""></BaseGridTh>
        </tr>
      </template>
      <template #body="{item, updateRow}">
        <tr>
          <td class="minimal">{{ item.id }}  ☰</td>
          <td class="">{{ item.product.code ?? '-' }}</td>
          <td>{{ item.product.name ?? '-' }}</td>
          <td class="minimal"><BaseTextBox v-model="item.price" type="number" class="form-control-xs" style="width: 50px;" @change="(e) => updateRow(parseInt(e.target.value), 'price')" /></td>
          <td class="minimal"><BaseTextBox v-model="item.priceVat" type="number" class="form-control-xs" style="width: 50px;" @change="(e) => updateRow(parseInt(e.target.value), 'priceVat')" /></td>
          <td class="minimal"><BaseTextBox v-model="item.priceBefore" type="number" class="form-control-xs" style="width: 50px;" @change="(e) => updateRow(parseInt(e.target.value), 'priceBefore')" /></td>
          <td class="minimal"><BaseTextBox v-model="item.priceVatBefore" type="number" class="form-control-xs" style="width: 50px;" @change="(e) => updateRow(parseInt(e.target.value), 'priceVatBefore')" /></td>
          <td class="minimal"><BaseCheckBox v-model="item.hidden" @change="(e) => updateRow(e.target.checked, 'hidden')" /></td>
        </tr>
      </template>
<!--      <template #footer>-->
<!--        <BaseGridPaginator wrap="flex-shrink-0" :url="url" :page="page" :on-page="onPage" :filters="filters" @change-page="emit('update:page', $event)" @change-on-page="emit('update:onPage', $event); page = 1;" />-->
<!--      </template>-->
    </BaseGrid>
  </BaseCard>
</template>

<script setup lang="ts">
import type {GridOrder} from '~/composables/useTableVars';

withDefaults(defineProps<{
  filters?: any,
  showFilters?: boolean,
  page: number,
  onPage: number,
  order: GridOrder,
}>(), {  });

const url: string = 'eshop/price';
// const url: string = 'eshop/price?expand=product';
const emit = defineEmits(['update:page', 'update:onPage', 'update:order']);
const { filters } = useTableVars();
</script>