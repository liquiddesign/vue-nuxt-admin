<template>
  <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters" :order="order" @change-order="emit('update:order', $event)">
    <template #header>
      <tr>
        <BaseGridThSelect />
        <BaseGridTh class="minimal" order-by="id">#</BaseGridTh>
        <BaseGridTh />
        <BaseGridTh class="minimal" order-by="validFrom">Platnost od</BaseGridTh>
        <BaseGridTh class="minimal" order-by="validTo">Platnost do</BaseGridTh>
        <BaseGridTh order-by="name"><BaseFlag :lang="lang" /> Název</BaseGridTh>
        <BaseGridTh order-by="pricelists">Akční ceníky</BaseGridTh>
        <BaseGridTh class="minimal" order-by="coupons">Kupóny</BaseGridTh>
        <BaseGridTh class="minimal" order-by="recommended"><i class="far fa-thumbs-o-up" /></BaseGridTh>
        <BaseGridTh class="minimal"><BaseGridThSettings /></BaseGridTh>
      </tr>
    </template>
    <template #body="{item, selected, deleteRow, updateRow}">
      <tr :class="{'inactive': item.hidden, 'active': selected}">
        <BaseGridTdSelect :id="item.uuid" />
        <td class="minimal">{{ item.id }}  ☰</td>
        <td class="minimal"><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'discount-id', params: { id: item.uuid }})" /></td>
        <td class="minimal">{{ item.validFrom ?? '-' }}</td>
        <td class="minimal">{{ item.validTo ?? '-' }}</td>
        <td>{{ item.name[lang] ?? '-' }}</td>
        <td>{{ item.pricelists?.map((item: any) => item['name'] || null).join(', ') }}</td>
        <td class="minimal">{{ item.coupons?.map((item: any) => item['label'] || null).join(', ') }}</td>
        <td class="minimal"><BaseCheckBox v-model="item.recommended" @change="(e) => updateRow(e.target.checked, 'recommended')" /></td>
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
  lang: string,
  page: number,
  onPage: number,
  order: GridOrder,
}>(), { filters: {}  });

const url: string = 'eshop/discount?expand=pricelists,coupons,ribbons';
const emit = defineEmits(['update:page', 'update:onPage', 'update:order']);
</script>