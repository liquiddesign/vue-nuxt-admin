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
          <li v-for="index in pageNumber" :key="index" class="page-item" :class="{active: index === currentPage}">
            <a v-if="index === 1 || index === pageNumber || (currentPage <= index + 2 && currentPage >= index - 2)" class="page-link" @click.prevent.stop="updateTable(index)">{{ index }}</a>
            <span v-else-if="index === currentPage - 3 || index === currentPage + 3 " class="page-link" style="pointer-events: none;"> ... </span>
          </li>
          <li class="page-item" :class="{disabled: currentPage === pageNumber}">
            <a class="page-link" aria-label="Next" @click.prevent="updateTable(currentPage < pageNumber ? currentPage + 1 : pageNumber)">
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
          <li class="page-item" style=""><a class="page-link text-black" :class="{'bg-light' : onPage === 20, 'bg-white' : onPage !== 20}" @click.prevent.stop="emit('changeOnPage', 20)">20</a></li>
          <li class="page-item" style=""><a class="page-link text-black" :class="{'bg-light' : onPage === 40, 'bg-white' : onPage !== 40}" @click.prevent.stop="emit('changeOnPage', 40)">40</a></li>
          <li class="page-item" style=""><a class="page-link text-black" :class="{'bg-light' : onPage === 80, 'bg-white' : onPage !== 80}" @click.prevent.stop="emit('changeOnPage', 80)">80</a></li>
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
  dataTable: {type: Object, default: undefined},
  dataByPage: {type: Object, default: undefined},
  wrap: {type: String, default: ''},
});

const data: ComputedRef<any> = computed(() => {
  return props.dataTable;
});

const pageNumber = computed(function () {
  return data?.value ? Math.ceil(data?.value.length / props.onPage) : 1;
});

const currentPage: Ref<number> = ref(1);

function updateTable(index: number) {
  if (data?.value && index) {
    const start = (index - 1) * props.onPage;
    const sliced = data.value.slice(start, start + props.onPage);

    currentPage.value = index;
    emit('update:data-by-page', sliced);
  }
}

const emit = defineEmits(['changeOnPage', 'update:data-by-page']);

watch(() => props.dataTable, () => {
  updateTable(props.page);
});
</script>