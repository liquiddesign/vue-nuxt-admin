<template>
  <BaseGridTh>
    <div class="d-flex align-items-start gap-1 flex-shrink-0">
      <!-- custom fields -->
      <slot v-if="fieldType === 'custom'" />

      <!-- fields -->
      <template v-else>
        <BaseMultiSelect v-if="fieldType === 'select'" v-model="modelValue[name + filterType.request]" :placeholder="placeholder" :options="options" :multiple="multiple" />
        <BaseCheckBox v-else-if="fieldType === 'checkbox'" v-model="modelValue[name + filterType.request]" />
        <BaseTextBox v-else v-model="modelValue[name + filterType.request]" :placeholder="placeholder" :type="textType" />

        <!-- set filter type -->
        <BaseDropdown v-if="fieldType === 'text'" class="btn-sm  flex-shrink-0" :class="activeFilter ? 'btn-outline-primary active' : 'btn-outline-secondary'" icon-name="Filter">
          <template v-for="(item, index) of filterTypes" :key="index">
            <BaseDropdownItem :class="{'active': filterType.code === item.code}" @click="updateFilterType(item.code);">{{ item.name }}</BaseDropdownItem>
          </template>
        </BaseDropdown>
        <BaseButtonFilter v-else :class="activeFilter ? 'active' : 'btn-outline-secondary disabled'" />

        <!-- delete filtered data -->
        <BaseButtonFilterCancel class="flex-shrink-0" :disabled="!activeFilter" @click="deleteFilter" />
      </template>
    </div>
  </BaseGridTh>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string,
  placeholder?: string,
  fieldType: string,
  textType?: string,
  multiple?: boolean,
  options?: any,
  modelValue?: any | null,
}>(), { placeholder: 'Hledejte', fieldType: 'custom', textType: 'text', multiple: false, options: [], modelValue: undefined });

const emit = defineEmits(['update:modelValue']);
const { filterType, filterTypes, setFilterType } = useFilter();

const activeFilter: ComputedRef<boolean> = computed(() => {
  return props.modelValue[props.name + filterType.value.request];
});

function updateFilterType(code: string): void {
  const value = props.modelValue[props.name + filterType.value.request];
  deleteFilter();
  setFilterType(code);
  props.modelValue[props.name + filterType.value.request] = value;
}

function deleteFilter() {
  delete(props.modelValue[props.name + filterType.value.request]);
  setFilterType('equals');
}

</script>