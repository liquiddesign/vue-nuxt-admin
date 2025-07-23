<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label !== null" :for="$attrs['id']">
      <span v-if="((form && form.lang) || lang) && locale" class="pe-1">
        <BaseFlag :lang="form && form.lang.value ? form.lang.value : lang" />
      </span>
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <br>

    <template v-for="(item, key) in treePickerInputs" :key="key">
      <div class="d-flex gap-3 mb-2">
        <div class="input-wrapper">
          <input v-bind="$attrs" class="form-control form-control-sm" :value="fullName(item)" disabled @change="onChange">
        </div>
        <BaseButtonCancel wrap="flex-shrink-0" class="btn btn-sm" @click.prevent="deleteItem(item)" />
      </div>
    </template>

    <BaseButton class="btn btn-sm btn-outline-dark mt-2" @click.prevent="open($refs)">Upravit</BaseButton>
  </BaseWrapper>

  <BaseModal ref="treePicker" :title="label" :display-footer="false" @closed="onModalClose($refs)">
    <template #body>
      <BaseTreeTable ref="treeTable" :data-tree="treePickerInputs" :options-tree="dataNew" @save="saveTree" @modal-close="close($refs)" />
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import {inject} from 'vue';

const form: any = inject('form', null) as any;

const props = defineProps({
  wrap: {type: String, default: undefined},
  label: {type: String, default: null},
  lang: {type: String, default: null},
  locale: {type: Boolean, default: false},
  required: {type: Boolean, default: false},
  nullable: {type: Boolean, default: false},
  name: {type: String, default: null},
  modelValue: {type: [Object, Array], default: null},
  urlTree: {type: String, default: null},
});

const {data: data} = useApiFetch(props.urlTree);
const dataNew: Ref<any> = ref([]);
const $emit = defineEmits(['update:modelValue']);
const treePickerInputs: Ref<any> = ref(form && props.name ? _get(form.data.value, props.name) : props.modelValue);

const fullName = (item: any): string => {
  let fullName = item?.name?.cs;

  if (item?.ancestor) {
    fullName = item.ancestor.name_cs + ' > ' + fullName;
  }

  return fullName;
};

function open(refs: any): void {
  refs.treeTable?.setCheckedItems(Object.values(dataNew?.value?.items));
  refs.treePicker.open();
}

function close(refs: any): void {
  refs.treePicker.close();
}

function onModalClose(refs: any): void {
  refs.treeTable?.resetUpdatedData();
  refs.treeTable?.resetSettings();
}

function addItem(item: any) {
  if (!treePickerInputs.value[item.uuid]) {
    treePickerInputs.value[item.uuid] = item;
  }
}

function deleteItem(item: any) {
  if (treePickerInputs.value[item.uuid]) {
    delete treePickerInputs.value[item.uuid];
  }
}

function saveTree(addedData: any) {
  if (addedData.add?.length > 0) {
    for (const item of addedData.add) {
      addItem(item);
    }
  }
  if (addedData.delete?.length > 0) {
    for (const item of addedData.delete) {
      deleteItem(item);
    }
  }
}

function onChange($event: any) {
  let value: string|number|null = $event.target.value;

  if (props.nullable && $event.target.value === '') {
    value = null;
  }

  if (form && props.name) {
    form.updateInput(props.name, value);
  }

  $emit('update:modelValue', value);
}

watch(data, (newData: any) => {
  if (newData?.items) {
    dataNew.value = newData;
  }
});
</script>