<template>
  <div class="base-grid">
    <div class="d-flex align-items-top gap-3 mb-3">
      <BaseButton class="btn btn-sm btn-primary" @click="saveData()">Uložit</BaseButton>
      <BaseCheckBox v-model="autoCheckChild" label="Povolit automatický výběr potomků" @change="() => {checkedTreeData = [];}" />
    </div>

    <div class="table-responsive" style="overflow: initial;" v-bind="$attrs">
      <table class="table table-sm table-striped">
        <Draggable ref="tree" v-model="treeItems" class="mtl-tree" disable-drag disable-drop tree-line :tree-line-offset="30" :indent="40">
          <template #prepend>
            <thead class="p-0">
              <tr>
                <BaseGridTh style="width: 25px" />
                <BaseGridThSelect />
                <BaseGridTh class="ps-4">Název</BaseGridTh>
              </tr>
            </thead>
          </template>

          <template #default="{ node, stat }">
            <tbody>
              <tr>
                <td style="width: 25px">
                  <OpenIcon v-if="stat.children.length" :open="stat.open" class="mtl-mr" @click="stat.open = !stat.open" />
                </td>
                <td>
                  <input v-if="autoCheckChild" v-model="stat.checked" class="mtl-checkbox mtl-mr" type="checkbox" @change="checkData(stat, node)">
                  <input v-else v-model="node.checked" class="mtl-checkbox mtl-mr" type="checkbox" @change="manualCheckUpdate(node)">
                  <span class="mtl-ml ps-2">{{ node.name[lang] }}</span>
                </td>
              </tr>
            </tbody>
          </template>
        </Draggable>
      </table>
    </div>
    <BaseButton class="btn btn-sm btn-primary mt-3" @click="emits('modal-close');">Uložit</BaseButton>
  </div>
</template>

<script setup lang="ts">
import { Draggable, OpenIcon } from '@he-tree/vue';
import '@he-tree/vue/style/default.css';
import '@he-tree/vue/style/material-design.css';

const props = defineProps({
  urlTree: {type: String, default: null},
  dataTree: {type: Object, default: undefined},
  data: {type: Array, default: undefined},
});

const emits = defineEmits([
    'modal-close', 'save', 'update:inputs',
]);

const autoCheckChild: Ref<boolean> = ref(false);
const treeItems: Ref<any> = ref([]);
const checkedTreeData: Ref<any[]> = ref([]);
const addedData: Ref<any> = ref({});
const { lang } = useTableVars();

const dataTree: ComputedRef<any> = computed(() => {
  return props.dataTree;
});

const data: ComputedRef<any> = computed(() => {
  return props.data;
});

const {data: tree} = useApiFetch(props.urlTree);

function saveData() {
  emits('save', addedData.value);
  emits('modal-close');
  addedData.value = {};
}

function manualCheckUpdate(node: any): void {
  let dataItem = null;

  for (const index in data?.value?.items) {
    if (data?.value?.items[index].uuid === node.uuid) {
      dataItem = data?.value?.items[index];
    }
  }

  if (node.checked) {
    addedData.value[node.uuid] = dataItem;
  } else {
    delete addedData.value[node.uuid];
  }
}

function checkData(stat: any, node: any): void {
  console.log('stat --- node', stat, node);
  // checkedTreeData.value = tree?.value ? tree.value.getChecked() : [];
  // console.log(checkedTreeData.value);
}

function buildTreeFromAncestors(data: any[], keysToInclude: string[]): any[] {
  const map = new Map();
  const tree: any[] = [];

  data.forEach(item => {
    const filteredItem = keysToInclude.reduce((acc, key) => {
      if (key in item) {
        acc[key] = item[key];
      }
      return acc;
    }, {} as any);

    filteredItem.children = [];
    filteredItem.checked = false;
    map.set(item.uuid, filteredItem);
  });

  data.forEach(item => {
    if (item.ancestor && map.has(item.ancestor.uuid)) {
      const parent = map.get(item.ancestor.uuid);
      parent.children.push(map.get(item.uuid));
    } else {
      tree.push(map.get(item.uuid));
    }
  });

  return tree;
}

watch(tree, (newData: any) => {
  if (newData?.items) {
    const keysToInclude = ['uuid', 'name', 'code', 'type', 'ancestor'];
    treeItems.value = buildTreeFromAncestors(Object.values(newData.items), keysToInclude);

    for (const checked in dataTree?.value) {
      console.log('checked item', checked);

      const item = treeItems.value.find((el: any) => {
        return el.uuid === checked;
      });

      if (item) {
        item.checked = true;
      }
    }

    console.log('treeItems', treeItems.value);
  }
});

</script>

<style>
.vtlist-inner div.tree-node:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>