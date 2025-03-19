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
        <BaseGridTh class="minimal" />
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
        <BaseGridTh class="minimal" />
      </tr>
    </template>
    <template #body="{item, selected, deleteRow}">
      <tr :class="{'inactive': item.hidden, 'active': selected}">
        <BaseGridTdSelect :id="item.uuid" />
        <td class="minimal">{{ item.id }}  ☰</td>
        <td class="minimal"><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'internal-ribbon-id', params: { id: item.uuid }})" /></td>
        <td>{{ item.name ?? '-' }}</td>
        <td>{{ $t(`internalRibbonTypes.${item.type}`, {name: 'vue-i18n'}) ?? '-' }}</td>
        <td class="minimal"><BaseColorPicker :model-value="item.color" /></td>
        <td class="minimal"><BaseColorPicker :model-value="item.backgroundColor" /></td>
        <td class="minimal"><BaseButton class="btn-xs btn-primary" @click="$refs.modalComments.open();"><BaseIcon icon-name="MessageSquare" /></BaseButton></td>
        <td class="minimal"><BaseButtonDelete class="btn-xs btn-danger" :confirmation="true" @confirm="deleteRow();" /></td>
      </tr>
    </template>
    <template #footer>
      <BaseGridPaginator wrap="flex-shrink-0" :url="url" :page="page" :on-page="onPage" :filters="filters" @change-page="emit('update:page', $event)" @change-on-page="emit('update:onPage', $event); page = 1;" />
    </template>
  </BaseGrid>

  <BaseModal ref="modalComments" title="KOMUNIKACE" :display-footer="false">
    <template #body>
      <BaseCommentForm :comments="comments" />
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import type {GridOrder} from '~/composables/useTableVars';
import {useI18n} from 'vue-i18n';

withDefaults(defineProps<{
  filters?: any | null,
  page: number,
  onPage: number,
  order: GridOrder,
}>(), { filters: {} });

const url: string = '/eshop/internal-ribbon';
const emit = defineEmits(['update:page', 'update:onPage', 'update:order', 'clear']);
const { filters, clearFilters, showFilters } = useTableVars();
const { t } = useI18n();

const typeOptions: ComputedRef<any> = computed(() => ({
  product: t('internalRibbonTypes.product', { name: 'vue-i18n' }),
  order: t('internalRibbonTypes.order', { name: 'vue-i18n' }),
  price_list: t('internalRibbonTypes.price_list', { name: 'vue-i18n' }),
}));

const comments: Ref<any> = ref([
  {
    uuid: '1gft6sjfkguid',
    isSystem: false,
    isExternal: false,
    isContact: false,
    callBack: null,
    isUnanswered: false,
    sendEmail: false,
    created: '2025-03-04 11:11:55',
    content: 'test test 1',
    administrator: {
      uuid: '624aee9b4217111591666294',
      imageName: null,
      nickname: 'OP',
      name: 'Johnasd',
      surname: 'Doeaaassaaa',
    },
  },
  {
    uuid: '2hfksflfo4tg',
    isSystem: false,
    isExternal: false,
    isContact: true,
    callBack: '2025-03-10',
    isUnanswered: true,
    sendEmail: true,
    created: '2025-03-04 18:18:48',
    content: 'test test test 222',
    administrator: {
      uuid: '624aee9b4217111591666294',
      imageName: null,
      nickname: 'OP',
      name: 'Johnasd',
      surname: 'Doeaaassaaa',
    },
  },
  {
    uuid: '3lsdlfd845knj',
    isSystem: true,
    isExternal: false,
    isContact: false,
    callBack: null,
    isUnanswered: false,
    sendEmail: false,
    created: '2025-03-14 21:15:00',
    content: 'comment #3',
    mentionIds: [],
    administrator: {
      uuid: '624aee9b4217111591666294',
      imageName: null,
      nickname: 'OP',
      name: 'Johnasd',
      surname: 'Doeaaassaaa',
    },
  },
]);
</script>