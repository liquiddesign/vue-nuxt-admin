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
        <BaseButtonCancel wrap="flex-shrink-0" class="btn btn-sm" @click.prevent="() => {delete treePickerInputs[key];}" />
      </div>
    </template>

    <BaseButton class="btn btn-sm btn-outline-dark mt-2" @click.prevent="() => {$refs.treePicker.open();}">Upravit</BaseButton>
  </BaseWrapper>

  <BaseModal ref="treePicker" :title="label" :display-footer="false">
    <template #body>
      <BaseTreeTable :data-tree="treePickerInputs" :url-tree="urlTree" @save="saveTree" @modal-close="() => {$refs.treePicker.close();}" />
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
  modelValue: {type: [String, Number], default: null},
  urlTree: {type: String, default: null},
});

const $emit = defineEmits(['update:modelValue']);
const treePickerInputs: Ref<any> = ref(form && props.name ? _get(form.data.value, props.name) : props.modelValue);

const fullName = (item: any): string => {
  console.log('item', item);
  let fullName = item?.name?.cs;

  if (item?.ancestor) {
    fullName = item.ancestor.name_cs + ' > ' + fullName;
  }

  return fullName;
};

function saveTree(addedData: any) {
  // treePickerInputs.value = addedData;
  treePickerInputs.value = Object.assign(treePickerInputs.value, addedData);
  console.log('treePickerInputs', treePickerInputs);

  if (treePickerInputs?.value) {
    if (treePickerInputs.value?.new) {
      delete treePickerInputs.value.new;
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
</script>

<style>

</style>