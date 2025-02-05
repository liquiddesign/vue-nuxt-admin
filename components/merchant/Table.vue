<template>
  <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters" :order="order" @change-order="emit('update:order', $event)">
    <template #header>
      <tr>
        <BaseGridThSelect />
        <BaseGridTh class="minimal" order-by="id">#</BaseGridTh>
        <BaseGridTh />
        <BaseGridTh order-by="code">Kód</BaseGridTh>
        <BaseGridTh order-by="fullname">Jméno a příjmení</BaseGridTh>
        <BaseGridTh class="minimal" order-by="pricelists">Ceníky/Viditelníky</BaseGridTh>
        <BaseGridTh class="minimal" order-by="email">E-mail</BaseGridTh>
        <BaseGridTh class="minimal" order-by="customerGroup">Skupina</BaseGridTh>
        <BaseGridTh class="minimal"><BaseGridThSettings /></BaseGridTh>
      </tr>
    </template>
    <template #body="{item, selected, deleteRow}">
      <tr :class="{'inactive': item.hidden, 'active': selected}">
        <BaseGridTdSelect :id="item.uuid" />
        <td class="minimal">{{ item.id }}  ☰</td>
        <td class="minimal"><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'merchant-id', params: { id: item.uuid }})" /></td>
        <td>{{ item.code ?? '-' }}</td>
        <td>{{ item.fullname ?? '-' }}</td>
        <td class="minimal">{{ item.pricelists }}</td>
        <td class="minimal">{{ item.email ?? '-' }}</td>
        <td class="minimal">{{ item.customerGroup.name ?? '-' }}</td>
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

const url: string = '/eshop/merchant?expand=customerGroup';
const emit = defineEmits(['update:page', 'update:onPage', 'update:order']);
</script>