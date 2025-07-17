<template>
  <div class="base-grid">
    <div class="d-flex align-items-top gap-3 mb-3">
      <BaseButton class="btn btn-sm btn-primary" @click="saveData()">Uložit</BaseButton>
      <BaseCheckBox v-model="autoCheckChild" label="Povolit automatický výběr potomků" @change="() => {checkedTreeData = [];}" />
    </div>

    <div class="table-responsive" style="overflow: initial;" v-bind="$attrs">
      <table class="table table-sm table-striped">
        <Draggable ref="tree" v-model="treeItemsByPage" class="mtl-tree" disable-drag disable-drop tree-line :tree-line-offset="30" :indent="40" :default-open="false">
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

          <template #append>
            <BaseGridManualPaginator v-model:data-by-page="treeItemsByPage" :data-table="treeItems" :on-page-options="[10, 20, 40, 80]" wrap="flex-shrink-0" />
          </template>
        </Draggable>
      </table>
    </div>
    <BaseButton class="btn btn-sm btn-primary mt-3" @click="saveData()">Uložit</BaseButton>
  </div>
</template>

<script setup lang="ts">
import { Draggable, OpenIcon } from '@he-tree/vue';
import '@he-tree/vue/style/default.css';
import '@he-tree/vue/style/material-design.css';

const props = defineProps({
  dataTree: {type: Object, default: undefined},
  optionsTree: {type: Object, default: undefined},
});

const emits = defineEmits([
    'modal-close', 'save',
]);

const tree = useTemplateRef('tree');
const autoCheckChild: Ref<boolean> = ref(false);
const treeItems: Ref<any> = ref([]);
const treeItemsByPage: Ref<any> = ref([]);
const checkedTreeData: Ref<any[]> = ref([]);
const updatedData: Ref<any> = ref({add: [], delete: []});
const { lang } = useTableVars();

const dataTree: ComputedRef<any> = computed(() => {
  return props.dataTree;
});

const optionsTree: ComputedRef<any> = computed(() => {
  return props.optionsTree;
});

function saveData() {
  emits('save', updatedData.value);
  emits('modal-close');
  updatedData.value = {add: [], delete: []};
}

function manualCheckUpdate(node: any): void {
  if (node.checked) {
    if (updatedData.value.delete.includes(node)) {
      updatedData.value.delete.splice(updatedData.value.delete.indexOf(node), 1);
    }
    if (!updatedData.value.add.includes(node)) {
      updatedData.value.add.push(node);
    }
  } else {
    if (updatedData.value.add.includes(node)) {
      updatedData.value.add.splice(updatedData.value.add.indexOf(node), 1);
    }
    if (!updatedData.value.delete.includes(node)) {
      updatedData.value.delete.push(node);
    }
  }
  console.log('updatedData', updatedData.value);
}

function checkData(stat: any, node: any): void {
  console.log('stat --- node', stat, node);
  // checkedTreeData.value = tree?.value ? tree.value.getChecked() : [];
  // console.log(checkedTreeData.value);
}

function setCheckedItems(data: any[]) {
  const map = new Map();

  data.forEach(item => {
    item.checked = false;
    for (const checked in dataTree?.value) {
      if (item.uuid === checked) {
        item.checked = true;
        openParentsForCheckedNodes(treeItems.value);
        break;
      }
    }
    map.set(item.uuid, item);
  });
}

function openParentsForCheckedNodes(nodes: any, ancestors = []) {
  for (const node of nodes) {
    if (node.checked) {
      console.log('ancestors', ancestors);
      for (const ancestor of ancestors) {
        const ancestorStat = tree.value?.getStat(ancestor);
        if (ancestorStat) {
          ancestorStat.open = true;
        }
      }
    }

    if (node.children?.length) {
      openParentsForCheckedNodes(node.children, [...ancestors, node]);
    }
  }
}

// zmenit endpoind a smazat tento method
function buildTreeFromAncestors(data: any[]): any[] {
  const map = new Map();
  const tree: any[] = [];

  data.forEach(item => {
    item.children = [];
    map.set(item.uuid, item);
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

watch(optionsTree, (newData: any) => {
  if (newData?.items) {
    const options = Object.values(newData.items);
    setCheckedItems(options);
    treeItems.value = buildTreeFromAncestors(options); // zmenit endpoind a smazat tento method
    console.log('treeItems', treeItems.value);
  }
});

defineExpose({
  setCheckedItems,
});

</script>

<style>
.vtlist-inner div.tree-node:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>