<template>
  <BaseGridTh>
    <div class="d-flex align-items-start gap-1 flex-shrink-0">
      <BaseMultiSelect v-if="type === 'select'" v-model="modelValue[name]" :options="options" />
      <BaseTextBox v-else v-model="modelValue[name]" :placeholder="placeholder" :type="type" />
      <BaseButtonFilter class="flex-shrink-0" />
      <BaseButtonFilterDelete class="flex-shrink-0" @clear="emit('clear')" />
    </div>
  </BaseGridTh>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  name: string,
  placeholder?: string,
  type?: string,
  options?: any,
  modelValue?: any | null,
}>(), { placeholder: 'Hledejte', type: 'text', options: [], modelValue: undefined });

const emit = defineEmits(['update:modelValue', 'clear']);
</script>