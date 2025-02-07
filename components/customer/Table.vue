<template>
  <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters" :order="order" @change-order="emit('update:order', $event)">
    <template #header>
      <tr>
        <BaseGridThSelect />
        <BaseGridTh class="minimal" order-by="id">#</BaseGridTh>
        <BaseGridTh class="minimal" />
        <BaseGridTh class="minimal" order-by="createdTs">Registrace</BaseGridTh>
        <BaseGridTh order-by="fullname">
          <span>Jméno / IČO</span>
          <hr class="m-0">
          <span>Adresa (Fakt., Doruč.)</span>
        </BaseGridTh>
        <BaseGridTh class="minimal" order-by="fullname">
          <span>Email</span>
          <hr class="m-0">
          <span>Telefon</span>
        </BaseGridTh>
        <BaseGridTh order-by="merchants">
          <span>Obchodníci</span>
          <hr class="m-0">
          <span>Nadřazený zák.</span>
        </BaseGridTh>
        <BaseGridTh class="minimal" order-by="group">Skupina</BaseGridTh>
        <BaseGridTh class="minimal" order-by="pricelists">
          <span>Ceníky</span>
          <hr class="m-0">
          <span>Viditelníky</span>
        </BaseGridTh>
        <BaseGridTh class="minimal" order-by="lastOrder">Poslední obj.</BaseGridTh>
        <BaseGridTh class="minimal" order-by="ordersCount">Počet obj.</BaseGridTh>
        <BaseGridTh class="minimal"><BaseGridThSettings /></BaseGridTh>
      </tr>
    </template>
    <template #body="{item, selected, deleteRow}">
      <tr :class="{'inactive': item.hidden, 'active': selected}">
        <BaseGridTdSelect :id="item.uuid" />
        <td class="minimal">{{ item.id }}  ☰</td>
        <td class="minimal"><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'customer-id', params: { id: item.uuid }})" /></td>
        <td class="minimal">{{ registrationDate(item.createdTs) }}</td>
        <td>
          <span class="row">
            <span class="col-6">{{ item.fullname }}</span>
            <span class="col-6">{{ item.ic }}</span>
          </span>
          <hr class="m-0">
          <span class="row">
            <span class="col-6">{{ fullAddress(item.billAddress) }}</span>
            <span class="col-6">{{ fullAddress(item.deliveryAddress) }}</span>
          </span>
        </td>
        <td class="minimal">
          <a :href="'mailto:' + item.email"><i v-if="item.email" class="pe-7s-mail text-center" /> {{ item.email }}</a>
          <br class="m-0">
          <a :href="'tel:' + item.phone"><i v-if="item.phone" class="pe-7s-phone text-center" /> {{ item.phone }}</a>
        </td>
        <td class="minimal">
          <span> {{ item.merchants?.map((item: any) => item['name'] || null).join(', ') }} </span>
          <hr class="m-0">
          <span> {{ item.parentCustomer.fullname }} </span>
        </td>
        <td class="minimal">{{ item.group.name }}</td>
        <td class="minimal">
          <span> {{ item.pricelists?.map((item: any) => item['name'] || null).join(', ') }} </span>
          <hr class="m-0">
          <span> {{ item.visibilityLists?.map((item: any) => item['name'] || null).join(', ') }} </span>
        </td>
        <td class="minimal">
          <span>{{ item.lastOrder.code }}</span>
          <br class="m-0">
          <span class="text-secondary">{{ item.lastOrder.createdTs }}</span>
        </td>
        <td class="minimal text-center">{{ item.ordersCount ?? '-' }}</td>
        <td class="minimal"><BaseButtonDelete class="btn-xs btn-danger" :confirmation="true" @confirm="deleteRow();" /></td>
      </tr>
    </template>
    <template #footer>
      <BaseGridPaginator wrap="flex-shrink-0" :url="url" :page="page" :on-page="onPage" :filters="filters" @change-page="emit('update:page', $event)" @change-on-page="emit('update:onPage', $event); page = 1;" />
    </template>
  </BaseGrid>
</template>

<script setup lang="ts">
import {doubleFormat} from '~/utils/helpers';
import type {GridOrder} from '~/composables/useTableVars';

withDefaults(defineProps<{
  filters?: any,
  page: number,
  onPage: number,
  order: GridOrder,
}>(), { filters: {}  });

const url: string = '/eshop/customer?expand=group,lastOrder,billAddress,deliveryAddress,parentCustomer,merchants,pricelists,visibilityLists,accounts';
const emit = defineEmits(['update:page', 'update:onPage', 'update:order']);


const registrationDate: string = (currentDate: string) => {
  const newDate = new Date(currentDate);
  return doubleFormat(newDate.getDate()) + '.' + doubleFormat(newDate.getMonth() + 1) + '.' + newDate.getFullYear();
};

const fullAddress: string = (dataAddress: any) => {
  let address: any[] = [];
  if (dataAddress.street) { address.push(dataAddress.street); }
  if (dataAddress.zipcode) { address.push(dataAddress.zipcode); }
  if (dataAddress.city) { address.push(dataAddress.city); }
  return address.length ? address.join(', ') : '';
};
</script>