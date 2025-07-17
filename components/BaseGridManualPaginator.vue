<template>
  <BaseWrapper :wrap="wrap">
    <div class="" style="position: relative;">
      <nav class="pt-3 ms-auto">
        <ul class="pagination pagination-sm">
          <li class="page-item" :class="{disabled: currentPage === 1}">
            <a class="page-link" aria-label="Previous" @click.prevent="updateTable(currentPage > 1 ? currentPage - 1 : 1)">
              <span aria-hidden="true"><BaseIcon icon-name="ChevronLeft" /></span>
              <span class="sr-only">Předchozí</span>
            </a>
          </li>
          <li v-for="index in currentPageNumber" :key="index" class="page-item" :class="{active: index === currentPage}">
            <a v-if="index === 1 || index === currentPageNumber || (currentPage <= index + 2 && currentPage >= index - 2)" class="page-link" @click.prevent.stop="updateTable(index)">{{ index }}</a>
            <span v-else-if="index === currentPage - 3 || index === currentPage + 3 " class="page-link" style="pointer-events: none;"> ... </span>
          </li>
          <li class="page-item" :class="{disabled: currentPage === currentPageNumber}">
            <a class="page-link" aria-label="Next" @click.prevent="updateTable(currentPage < currentPageNumber ? currentPage + 1 : currentPageNumber)">
              <span aria-hidden="true"><BaseIcon icon-name="ChevronRight" /></span>
              <span class="sr-only">Další</span>
            </a>
          </li>
          <li class="px-2">
            <span class="page-link text-black " style="border: 0;pointer-events: none; min-width: 35px;">
              <template v-if="data">&sum; {{ data.length }}</template>
              <BaseIcon v-else icon-name="Ellipsis" class="text-black-50" />
            </span>
          </li>
          <template v-for="option in onPageOptions" :key="option">
            <li class="page-item" style="">
              <a class="page-link text-black" :class="{'bg-light' : currentOnPage === option, 'bg-white' : currentOnPage !== option}" @click.prevent.stop="updateOnPage(option)">
                {{ option }}
              </a>
            </li>
          </template>
        </ul>
      </nav>
    </div>
  </BaseWrapper>
</template>

<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps({
  page: {type: Number, default: 1},
  onPage: {type: Number, default: 10},
  onPageOptions: {type: Array, default: () => [20, 40, 80]},
  dataTable: {type: Object, default: undefined},
  dataByPage: {type: Object, default: undefined},
  wrap: {type: String, default: ''},
});

const data: ComputedRef<any> = computed(() => {
  return props.dataTable;
});

const currentPage: Ref<number> = ref(1);
const currentOnPage: Ref<number> = ref(10);
const currentPageNumber: Ref<number> = ref(1);

const emit = defineEmits(['update:data-by-page']);

function updateTable(index: number): void {
  if (data?.value && index) {
    const start = (index - 1) * currentOnPage.value;
    const sliced = data.value.slice(start, start + currentOnPage.value);

    currentPage.value = index;
    emit('update:data-by-page', sliced);
  }
}

function updateOnPage(onPage: number): void {
  currentOnPage.value = onPage;
  currentPageNumber.value = data?.value ? Math.ceil(data?.value.length / currentOnPage.value) : 1;
  currentPage.value = 1;
  updateTable(currentPage.value);
}

watch(() => props.dataTable, () => {
  updateOnPage(props.onPage);
});
</script>