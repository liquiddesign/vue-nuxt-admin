<template>
  <div>
<!--    <Draggable class="mtl-tree" v-model="newCategoriesData" tree-line>-->
<!--      <template #default="{ node, stat }">-->
<!--        <OpenIcon v-if="stat.children.length" :open="stat.open" class="mtl-mr" @click.native="stat.open = !stat.open" />-->
<!--        <input class="mtl-checkbox mtl-mr" type="checkbox" v-model="stat.checked">-->
<!--        <span class="mtl-ml">{{ node.name.cs }}</span>-->
<!--        <BaseButtonEdit />-->
<!--        <BaseButtonDelete />-->
<!--      </template>-->
<!--    </Draggable>-->
    <BasePageHeader title="Tree Manager Test" icon="ListTree" description="Tree Manager Test" />

    <BaseCard v-if="newCategoriesData.length > 0" wrap="col-lg-12">
      <template #headerRight>
        <BaseLiveUsers class="me-2" />
        <BaseDropdown class="btn-outline-primary btn-sm me-1" icon-name="Zap">
          <BaseDropdownItem>Hromadná akce</BaseDropdownItem>
        </BaseDropdown>
      </template>
      <template #body>
        <div class="base-grid">
          <div class="table-responsive" style="overflow: initial;" v-bind="$attrs">
            <Draggable v-model="newCategoriesData" table class="table table-sm table-striped">
              <template #prepend>
                <thead>
                  <tr>
                    <BaseGridTh class="minimal" />
                    <BaseGridThSelect />
                    <BaseGridTh />
                    <BaseGridTh class="minimal">Edit</BaseGridTh>
                    <BaseGridTh class="minimal">Delete</BaseGridTh>
                  </tr>
                </thead>
              </template>

              <template #default="{ node, stat }">
                <td>
                  <OpenIcon v-if="stat.children.length" :open="stat.open" class="mtl-mr" @click="() => {stat.open = !stat.open; console.log('stat - node', stat, node)}" />
                </td>
                <td :style="{ paddingLeft: `${stat.level * 20}px` }">
                  <input v-model="stat.checked" class="mtl-checkbox mtl-mr" type="checkbox">
                </td>
                <td>
                  {{ node.name[lang] }}
                </td>
                <td class="minimal">
                  <BaseButtonEdit />
                </td>
                <td class="minimal">
                  <BaseButtonDelete class="btn-sm btn-danger" />
                </td>
              </template>
            </Draggable>
          </div>
        </div>
      </template>
    </BaseCard>
  </div>
</template>

<script setup lang='ts'>
import { Draggable, OpenIcon } from '@he-tree/vue';
import '@he-tree/vue/style/default.css';
import '@he-tree/vue/style/material-design.css';

const newCategoriesData: Ref<any[]> = ref([]);
const { lang } = useTableVars();

const {data: categories}: any = useApiFetch('eshop/category/?expand=ancestor&onpage=200');

const categoriesItems: Ref<any[]> = ref([]);
for (const c in categories?.value?.items) {
  categoriesItems.value.push(categories?.value?.items[c]);
}

watch(categories, (newValue) => {
  categoriesItems.value = [];
  for (const c in newValue?.items) {
    categoriesItems.value.push(newValue?.items[c]);
  }

  const newObject83: Ref<any> = ref({});
  const newObject22: Ref<any> = ref({});
  const newObject80: Ref<any> = ref({});

  if (newValue?.items) {
    newObject83.value = newValue.items['60768fad2e8e421452022183'];
    newObject83.value.children = [];
    newObject22.value = newValue.items['42cae7aceab923f6bda56f8498891522'];
    newObject22.value.children = [];
    newObject80.value = newValue.items['607828d450fa288411861580'];
    newObject80.value.children = [];
  }

  for (const iCat in categoriesItems.value) {
    const category = categoriesItems.value[iCat];
    if (category.ancestor.uuid === '60768fad2e8e421452022183') {
      newObject83.value.children.push(category);
    }
    if (category.ancestor.uuid === '42cae7aceab923f6bda56f8498891522') {
      newObject22.value.children.push(category);
    }
    if (category.ancestor.uuid === '607828d450fa288411861580') {
      newObject80.value.children.push(category);
    }
  }

  console.log('newObject83', newObject83.value);
  console.log('newObject22', newObject22.value);
  console.log('newObject80', newObject80.value);


  newCategoriesData.value.push(newObject83.value);
  newCategoriesData.value.push(newObject22.value);
  newCategoriesData.value.push(newObject80.value);
  console.log('newCategoriesData', newCategoriesData);

});

</script>