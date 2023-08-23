<template>
  <div class="base-grid">
    <div class="table-responsive" style="overflow: initial;" v-bind="$attrs">
      <table class="mb-0 table table-sm table-striped">
        <thead>
        <slot name="header" :select-page="selectPage" :order-by="(value) => orderBy(value)" :order-by-value="orderByValue" :order-by-asc="orderByAsc"  />
        </thead>
        <tbody>
        <template v-for="(item,i) in items" :key="i">
          <slot name="body" :item="applyDecorator(item)" :index="i" :selected="selected[i]" :delete-row="() => deleteRow(item, i)" :update-row="(value) => updateRow(item, value)" />
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
            <i class="fa fa-circle-notch fa-spin" /> Načítám data ...
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex align-items-center flex-wrap gap-1">
      <slot name="footer" :selected-number="selectedNumber" :select-all="selectAll" />
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive, withDefaults, computed, onActivated, Ref} from "vue";


const props = withDefaults(defineProps<{
  url: string,
  page?: number
  onPage?: number
  filters?: any
}>(), {page: 1, onPage: 15, filters: {}});

const selected: any = reactive({});
const decorator: any = reactive({});
const selectedAllChecked: Ref<boolean> = ref(false);
const orderByValue: Ref<string|null> = ref(null);
const orderByAsc: Ref<boolean|null> = ref(true);

const config = useRuntimeConfig();

const { page, onPage } = toRefs(props);

const filters: any = reactive({
  page : page,
  onpage : onPage,
});


const params = computed(function () {
  const params = Object.assign({}, filters);
  if (orderByValue.value) {
    params['order'] =  orderByValue.value + '-' + (orderByAsc.value ? 'ASC' : 'DESC');
  } else {
    delete params['order'];
  }

  return params;
})


const debouncing = _debounce(function (value) {
  Object.assign(filters, value);
}, 150);

watch(props.filters, (value) => {
  debouncing(value);
  Object.keys(items.value).forEach((key:string) => delete selected[key]);
  selectedAllChecked.value = false;
})

watch(page, (value) => {
  Object.keys(items.value).forEach((key:string) => delete selected[key]);
  selectedAllChecked.value = false;
});

watch(onPage, (value) => {
  Object.keys(items.value).forEach((key:string) => delete selected[key]);
  selectedAllChecked.value = false;
});

const items = computed(function() {
  return data?.value?.items || {};
});

const {data, pending, error, refresh} = useFetch(config.public.baseURL + props.url, {params: params});

const selectedNumber = computed( () => selectedIds().length);

const selectPage = computed({
  get: function () {
    return items.value ? (Object.values(selected).filter( w => w === true).length === Object.values(items.value).length && Object.values(items.value).length > 0) : false;
  },
  set: function (value) {
    Object.keys(items.value).forEach((key:string) => selected[key] = value);
    selectedAllChecked.value = false;
  }}
);

const selectAll = computed({
  get: function () {
    return items.value ? selectedAllChecked.value && (Object.values(selected).filter( w => w === true).length === Object.values(items.value).length && Object.values(items.value).length > 0) : false;
  },
  set: function (value) {
    Object.keys(items.value).forEach((key:string) => selected[key] = value);
    selectedAllChecked.value = value;
  }}
);

defineExpose({ selected, selectedIds, decorator, pending, refresh, selectPage, selectAll});

function applyDecorator(item: any) {
  if (!decorator[item.uuid]) {
    return item;
  }

  return Object.assign(Object.assign({}, item), decorator[item.uuid]);
}

function deleteRow(item: any, index) {
  if (props.delete) {
    deleteItem({'uuid': item.uuid});
    refresh();
  }
}

function updateRow(item, value) {

}

function orderBy(value: string) {
  const aux: boolean|null = orderByAsc.value;

  orderByAsc.value = orderByValue.value === value && !orderByAsc.value ? true : orderByValue.value !== value;
  orderByValue.value = orderByValue.value === value && !aux ? null : value;

  Object.keys(items.value).forEach((key:string) => delete selected[key]);
  selectedAllChecked.value = false;
}

onActivated(() => {
  if (data?.value?.items) {
    refresh();
  }
});

function selectedIds() {
  return Object.keys(Object.fromEntries(Object.entries(selected).filter(([key, value]) => value) ));
}

</script>