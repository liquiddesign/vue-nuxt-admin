<template>
  <BaseGridTh>
    <div class="d-flex align-items-start gap-1 flex-shrink-0">
      <!-- fields -->
      <BaseMultiSelect v-if="fieldType === 'select'" v-model="modelValue[name]" :placeholder="placeholder" :options="options" />
      <BaseTextBox v-else v-model="modelValue[name]" :placeholder="placeholder" :type="fieldType" />

      <!-- set filter type -->
      <BaseDropdown class="btn-sm btn-outline-secondary flex-shrink-0" icon="fa-filter">
        <template v-for="(item, index) of filterTypes" :key="index">
          <BaseDropdownItem :class="{'active': filterType === item.code}" @click="setFilterType(item.code)">{{ item.name }}</BaseDropdownItem>
        </template>
        <BaseDropdownDivider />
        <BaseDropdownItem @click="setFilterType('starts')">Resetovat</BaseDropdownItem>
      </BaseDropdown>

      <!-- delete filtered data -->
      <BaseButtonFilterDelete class="btn-sm btn-outline-danger flex-shrink-0" @click="delete(modelValue[name])" />
      {{ modelValue }}
    </div>
  </BaseGridTh>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  name: string,
  placeholder?: string,
  fieldType?: string,
  options?: any,
  modelValue?: any | null,
}>(), { placeholder: 'Hledejte', fieldType: 'text', options: [], modelValue: undefined });

const emit = defineEmits(['update:modelValue']);
const { filterType, filterTypes, setFilterType } = useFilter();
const activeFilter: Ref<boolean> = ref(false);



</script>