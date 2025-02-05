<template>
  <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters" :order="order" @change-order="emit('update:order', $event)">
    <template #header>
      <tr>
        <BaseGridThSelect />
        <BaseGridTh class="minimal" />
        <BaseGridTh class="minimal" order-by="code">Kód</BaseGridTh>
        <BaseGridTh class="minimal" />
        <BaseGridTh order-by="name"><BaseFlag :lang="lang" /> Název</BaseGridTh>
        <BaseGridTh order-by="name">Celková cena (CZK)</BaseGridTh>
        <BaseGridTh class="minimal" order-by="priority">Priorita</BaseGridTh>
        <BaseGridTh class="minimal" order-by="recommended"><i class="fa fa-thumbs-o-up" /></BaseGridTh>
        <BaseGridTh class="minimal" order-by="hidden"><i class="far fa-eye-slash" /></BaseGridTh>
        <BaseGridTh class="minimal"><BaseGridThSettings /></BaseGridTh>
      </tr>
    </template>
    <template #body="{item, selected, deleteRow, updateRow}">
      <tr :class="{'inactive': item.hidden, 'active': selected}">
        <BaseGridTdSelect :id="item.uuid" />
        <td class="minimal"><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'payment-type-id', params: { id: item.uuid }})" /></td>
        <td class="minimal">{{ item.code }}</td>
        <td class="minimal"><img height="20" :alt="item.code" :src="'https://www.abel.cz//userfiles/paymenttype_images/thumb/' + item.imageFileName"></td>
        <td>{{ item.name[lang] ?? '-' }}</td>
        <td class="minimal">cena</td>
        <td class="minimal"><BaseTextBox v-model="item.priority" type="number" class="form-control-xs" style="width: 50px;" @change="(e) => updateRow(parseInt(e.target.value), 'priority')" /></td>
        <td class="minimal"><BaseCheckBox v-model="item.recommended" @change="(e) => updateRow(e.target.checked, 'recommended')" /></td>
        <td class="minimal"><BaseCheckBox v-model="item.hidden" @change="(e) => updateRow(e.target.checked, 'hidden')" /></td>
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

const url: string = '/eshop/payment-type';
const emit = defineEmits(['update:page', 'update:onPage', 'update:order']);

</script>