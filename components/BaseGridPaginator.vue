<template>
  <slot :total-count="totalItems" />
  <BaseWrapper :wrap="wrap">
    <div class="" style="position: relative;">
      <nav class="pt-3 ms-auto">
        <ul class="pagination pagination-sm">
          <li class="page-item" :class="{disabled: page === 1}">
            <a class="page-link" aria-label="Previous" @click.prevent="emit('changePage', page > 1 ? page - 1 : 1)">
              <span aria-hidden="true"><BaseIcon icon-name="ChevronLeft" /></span>
              <span class="sr-only">Předchozí</span>
            </a>
          </li>
          <li v-for="index in pageNumber" :key="index" class="page-item" :class="{active: index === page}">
            <a v-if="index === 1 || index === pageNumber || (page <= index + 2 && page >= index - 2)" class="page-link" @click.prevent.stop="emit('changePage', index)">{{ index }}</a>
            <span v-else-if="index === page - 3 || index === page + 3 " class="page-link" style="pointer-events: none;"> ... </span>
          </li>
          <li class="page-item" :class="{disabled: page === pageNumber}">
            <a class="page-link" aria-label="Next" @click.prevent="emit('changePage', page < pageNumber ? page + 1 : pageNumber)">
              <span aria-hidden="true"><BaseIcon icon-name="ChevronRight" /></span>
              <span class="sr-only">Další</span>
            </a>
          </li>
          <li class="px-2">
            <span class="page-link text-black " style="border: 0;pointer-events: none; min-width: 35px;">
              <template v-if="pending">&sum; {{ data?.result }}</template>
              <BaseIcon v-else icon-name="Ellipsis" class="text-black-50" />
            </span>
          </li>
          <li class="page-item" style=""><a class="page-link text-black" :class="{'bg-light' : onPage === 20, 'bg-white' : onPage !== 20}" @click.prevent.stop="emit('changeOnPage', 20)">20</a></li>
          <li class="page-item" style=""><a class="page-link text-black" :class="{'bg-light' : onPage === 40, 'bg-white' : onPage !== 40}" @click.prevent.stop="emit('changeOnPage', 40)">40</a></li>
          <li class="page-item" style=""><a class="page-link text-black" :class="{'bg-light' : onPage === 80, 'bg-white' : onPage !== 80}" @click.prevent.stop="emit('changeOnPage', 80)">80</a></li>
        </ul>
      </nav>
    </div>
  </BaseWrapper>
</template>

<script setup lang="ts">
import {computed, onActivated} from 'vue';
import {transformObjectWithArrays} from '~/utils/transformObjectWithArrays';

const props = withDefaults(defineProps<{
  url: string,
  page: number,
  onPage: number,
  filters?: any,
  wrap?: string,
}>(), {filters: {}, wrap: undefined});


const filterValues: any = ref(props.filters);


const debouncing = _debounce(function (value) {
  filterValues.value = transformObjectWithArrays(value);
}, 250);

watch(() => props.filters, (value) => {
  debouncing(value);
}, { deep: true, immediate: false });

const {data, refresh, pending} = useApiFetch(props.url, {
  method: 'POST',
  query: filterValues,
  body: {'_op': 'itemsCount'},
});

const totalItems = computed(function () {
  return data?.value?.result ? parseInt(data?.value?.result) : 0;
});


const pageNumber = computed(function () {
  return data?.value?.result ? Math.ceil(data?.value?.result / props.onPage) : 1;
});

onActivated(() => {
  if (data?.value?.result) {
    refresh();
  }
});

const emit = defineEmits(['changePage', 'changeOnPage']);
defineExpose({ totalItems });

</script>