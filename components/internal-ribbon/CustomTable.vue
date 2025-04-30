<template>
  <div class="table-responsive">
    <table class="mb-0 table table-sm table-striped">
      <thead>
        <tr>
          <template v-for="(columnItem, columnKey) in columnsDefault" :key="columnKey">
            <BaseGridTh :order-by="columnItem.key">{{ columnItem.label }}</BaseGridTh>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rowItem, rowKey) of data" :key="rowKey">
          <template v-for="(columnItem, columnKey) in columnsDefault" :key="columnKey">
            <td>{{ rowItem[columnItem.key] }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const columnsDefault: Ref<any[]> = ref([
  {
    key: 'id',
    label: '#',
    visible: true,
    fixed: true,
  },
  {
    key: 'name',
    label: 'Popisek',
    visible: true,
    fixed: false,
  },
  {
    key: 'type',
    label: 'Typ',
    visible: true,
    fixed: false,
  },
  {
    key: 'color',
    label: 'Barva textu',
    visible: true,
    fixed: false,
  },
  {
    key: 'backgroundColor',
    label: 'Barva pozadí',
    visible: true,
    fixed: false,
  },
]);




const data = {
  '2b222c9e2a48e6726851a856364c8bd2': {
    uuid: '2b222c9e2a48e6726851a856364c8bd2',
    name: 'Qi - zákaznický ceník',
    color: '#ffffff',
    backgroundColor: '#ff0000',
    systemic: true,
    type: 'price_list',
    id: 1,
    shop: null,
  },
  '60a75fea0fd8096366310688': {
    uuid: '60a75fea0fd8096366310688',
    name: 'konkurence',
    color: '#000000',
    backgroundColor: '#ffffff',
    systemic: false,
    type: 'product',
    id: 2,
    shop: null,
  },
  '60a7789457fb699889007018': {
    uuid: '60a7789457fb699889007018',
    name: 'drum',
    color: '#000000',
    backgroundColor: '#ffffff',
    systemic: false,
    type: 'product',
    id: 3,
    shop: null,
  },
  '60cb21fe5968371004592562': {
    uuid: '60cb21fe5968371004592562',
    name: 'Heureka TOP',
    color: '#000000',
    backgroundColor: '#ffff00',
    systemic: false,
    type: 'product',
    id: 4,
    shop: null,
  },
  '60efe1763998887621078785': {
    uuid: '60efe1763998887621078785',
    name: 'k otextování',
    color: '#000000',
    backgroundColor: '#80ff80',
    systemic: false,
    type: 'product',
    id: 5,
    shop: null,
  },
};
</script>