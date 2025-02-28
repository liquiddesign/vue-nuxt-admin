<template>
  <div class="base-grid">
    <div class="table-responsive" style="overflow: initial;" v-bind="$attrs">
      <table class="mb-0 table table-sm table-striped">
        <thead>
          <slot name="header" :select-page="selectPage" :order-by="(value) => orderBy(value)" :order-by-value="orderByValue" :order-by-asc="orderByAsc" />
          <slot name="filters" />
        </thead>
        <tbody style="position:relative;">
          <Loading :active="pending" :can-cancel="false" :is-full-page="false" loader="bars" color="gray" />
          <template v-for="(item,i) in items" :key="i">
            <slot name="body" :item="applyDecorator(item)" :index="i" :selected="selected[i]" :changed="changed[i]" :delete-row="() => deleteRow(item, i)" :processing="processing" :update-row="(value, name) => updateRow(item, value, name)" />
          </template>
          <tr v-if="!pending && !error && Object.values(items).length === 0">
            <td colspan="100%" style="text-align: center; font-style: italic">
              K zobrazení nejsou žádné záznamy. Přidejte záznam nebo změňte nastavení filtru.
            </td>
          </tr>
          <tr v-if="error">
            <td colspan="100%" style="text-align: center; font-style: italic">
              <span class="text-danger">{{ error.message }}</span>
            </td>
          </tr>
          <tr v-if="pending && Object.values(items).length === 0 ">
            <td colspan="100%" style="text-align: center; font-style: italic">
             &nbsp;
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex align-items-center flex-wrap gap-1">
      <slot
        name="footer"
        :selected-number="selectedNumber"
        :reset-select="() => resetSelect()"
        :selected-query="selectedQuery"
        :action="(i) => action(i)"
        :async-action="(i) => asyncAction(i)"
        :selected-count="(i) => selectedCount(i)"
        :select-all="selectAll"
        :selected="selected"
        :delete-rows="deleteRows"
        :export-rows="exportRows"
        :disabled-controls="pending || error || processing || (!selectedAllChecked && !selectedNumber)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive, computed, onActivated, Ref} from 'vue';
import {ToastPluginApi, useToast} from 'vue-toast-notification';
import qs from 'qs';
import {transformObjectWithArrays} from '~/utils/transformObjectWithArrays';
import {downloadFile} from '~/utils/helpers';
import type {GridOrder} from '~/composables/useTableVars';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const props = withDefaults(defineProps<{
  url: string,
  page?: number,
  onPage?: number,
  filters?: any,
  order?: GridOrder,
  params?: any,
  silent?: boolean
}>(), {page: 1, onPage: 15, filters: {}, order: undefined, params: {},  silent: false});

const changed: any = ref({});
const selected: any = ref({});
const processing: any = ref(false);
const decorator: any = reactive({});
const selectedAllChecked: Ref<boolean> = ref(false);


const orderByValue: Ref<string|null|undefined> = ref(props.order ? props.order.property : null);
const orderByAsc: Ref<boolean|null> = ref(props.order ? props.order.direction === 'asc' : true);


const filterValues: any = ref(props.filters);

const { onDelete, onUpdate, onCreated, sendDelete, sendUpdate } = useLiveFeed();

const { page, onPage } = toRefs(props);

const paging: any = reactive({
  page : page,
  onpage : onPage,
});

const params = computed(function () {
  const params2 = Object.assign({}, paging, filterValues.value, props.params);
  orderByValue.value ? params2['order'] =  orderByValue.value + '-' + (orderByAsc.value ? 'ASC' : 'DESC') : delete params2['order'];

  return transformObjectWithArrays(params2);
});

const debounceParams: any = ref(params.value);
watch(params, _debounce((value) => {
  debounceParams.value = value;
}, 150));

const toast: ToastPluginApi = inject('toast', useToast());



watch(() => props.filters, (value) => {
  filterValues.value = value;
  selected.value = {};
  selectedAllChecked.value = false;
}, { deep: true, immediate: false });



watch(page, () => {
  selected.value = {};
  selectedAllChecked.value = false;
});

watch(onPage, () => {
  selected.value = {};
  selectedAllChecked.value = false;
});

const items = computed(function() {
  return data?.value?.items || {};
});

const {data, pending, error, refresh} = useApiFetch(props.url, {query: debounceParams});

const selectedNumber = computed( () => selectedIds().length);

const selectPage = computed({
  get: function () {
    return items.value ? (Object.values(selected.value).filter( w => w === true).length === Object.values(items.value).length && Object.values(items.value).length > 0) : false;
  },
  set: function (value) {
    Object.keys(items.value).forEach((key:string) => selected.value[key] = value);
    selectedAllChecked.value = false;
  }}
);

const selectAll = computed({
  get: function () {
    return items.value ? selectedAllChecked.value && (Object.values(selected.value).filter( w => w === true).length === Object.values(items.value).length && Object.values(items.value).length > 0) : false;
  },
  set: function (value) {
    Object.keys(items.value).forEach((key:string) => selected.value[key] = value);
    selectedAllChecked.value = value;
  }}
);

function refreshRows(uuids) {

  apiFetch(props.url, { params: {uuid: uuids}}).then((response) => {

    for (const uuid in response.items) {
      if (data.value.items[uuid]) {
        data.value.items[uuid] = response.items[uuid];

        markRowsAsChanged(uuid);
      }
    }

  });
}

defineExpose({ selected, selectedIds, decorator, pending, refresh, refreshRows, selectPage, selectAll, orderBy, orderByValue, orderByAsc, processing});

function applyDecorator(item: any) {
  if (!decorator[item.uuid]) {
    return item;
  }

  return Object.assign(Object.assign({}, item), decorator[item.uuid]);
}

const selectedQuery = computed(function () {
  const ids = qs.stringify({ids: selectedIds()}, { arrayFormat: 'indices', encode: false });

  return '?' + ids + '&selectedAll=' + (selectAll.value ? 1 : 0);
});

function deleteRow(item: any, sendLiveMessage = true) {
  processing.value = true;
  apiFetch(props.url + '/' + item.uuid, { method: 'DELETE'}).then(() => {
    refresh();

    selected.value = {};

    if (sendLiveMessage) {
      props.silent || toast.success('Smazáno');
      sendDelete(item.uuid);
    }

  }).catch(() => {
    props.silent || toast.error('Smazání se nezdařilo');
  }).finally(() => {
    processing.value = false;
  });
}

function exportRows() {
  processing.value = true;
  props.silent || toast.info('Exportuji ...');
  apiFetch(props.url + selectedQuery.value, { params: props.filters, responseType: 'blob', method: 'POST', body: {'_op': 'export'}})
    .then((response) => {

      downloadFile(response, 'export.csv');
    }).catch(() => {
      toast.error('Nepodařilo se exportovat data');
  }).finally(() => {
    processing.value = false;
  });
}

function deleteRows() {
  processing.value = true;
  props.silent || toast.info('Hromadná akce může chvíli trvat ...');
  apiFetch(props.url + '?' + selectedQuery.value, { method: 'DELETE', params: props.filters}).then(() => {
    refresh();
    selected.value = {};
    selectAll.value = false;
    props.silent || toast.success('Smazáno');
  }).catch(() => {
    props.silent || toast.error('Smazání se nezdrařilo');
  }).finally(() => {
    processing.value = false;
  });
}

function asyncAction(promise: Promise<void>)
{
  processing.value = true;
  promise.finally(() => {
    processing.value = false;
  });
}

function resetSelect()
{
  selected.value = {};
  selectedAllChecked.value = false;
}

async function action(callback: () => void)
{
  processing.value = true;
  callback();
  processing.value = false;
}

function selectedCount(totalCount: number)
{
  return selectedAllChecked.value ? (totalCount || 0) : selectedNumber.value;
}

function updateRow(item, value, name = null) {
  processing.value = true;

  apiFetch(props.url + '/' + item.uuid, {body: name ? {[name]: value, uuid: item.uuid} : item, method: 'PATCH'})
    .then(() => {
      toast.success('Uloženo');
      sendUpdate(item.uuid);
    }).catch((error) => {
      console.error(error);
      toast.error('Nepodařilo se uložit');
  }).finally(() => {
    processing.value = false;
  });
}



function markRowsAsChanged(uuid) {
  changed.value[uuid] = true;

  setTimeout(() => {
    delete changed.value[uuid];
  }, 500);
}



onDelete(() => {
  refresh();
});

onCreated(() => {
  refresh();
});

onUpdate((id) => {
  refreshRows([id]);
});

function orderBy(value: string) {
  const aux: boolean|null = orderByAsc.value;

  orderByAsc.value = orderByValue.value === value && !orderByAsc.value ? true : orderByValue.value !== value;
  orderByValue.value = orderByValue.value === value && !aux ? null : value;

  //Object.keys(items.value).forEach((key:string) => delete selected[key]);
  selected.value = {};
  selectedAllChecked.value = false;

  emit('changeOrder', {property: orderByValue.value, direction: orderByAsc.value ? 'asc' : 'desc'});
}

onActivated(() => {
  if (data?.value?.items) {
    refresh();
  }
});

function selectedIds() {
  return Object.keys(Object.fromEntries(Object.entries(selected.value).filter(([, value]) => value) ));
}

const emit = defineEmits(['changeOrder']);

provide('grid', {
  refresh,
});

</script>