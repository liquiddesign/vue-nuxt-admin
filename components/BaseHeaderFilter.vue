<template>
  <BaseGridTh>
    <div class="d-flex align-items-start gap-1 flex-shrink-0">
      <BaseMultiSelect v-if="fieldType === 'select'" v-model="modelValue[name]" :placeholder="placeholder" :options="options" />
      <BaseTextBox v-else v-model="modelValue[name]" :placeholder="placeholder" :type="fieldType" />
      <BaseButtonFilter class="flex-shrink-0" />
      <BaseButtonFilterDelete class="flex-shrink-0" @click="emit('clear')" />
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

const emit = defineEmits(['update:modelValue', 'clear']);
</script>