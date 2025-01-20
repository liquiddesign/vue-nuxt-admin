<template>
  <BaseFilter @cancel="emit('update:modelValue', {})">
    <slot />
    <BaseTextBox v-model="modelValue.idn" wrap="flex-shrink-0" placeholder="id" type="number" style="width: 60px;" />
    <BaseTextBox v-model="modelValue['f-code+name%']" wrap="flex-shrink-0" placeholder="Kód a název" type="text" size="40" />
    <BaseMultiSelect v-model="modelValue['f-exclusive']" placeholder="Skupiny" :multiple="true" wrap="flex-shrink-0" options-url="eshop/customer-group?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
    <BaseMultiSelect v-model="modelValue['f-allowedPaymentTypes']" placeholder="Platby" :multiple="true" wrap="flex-shrink-0" options-url="eshop/payment-type?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />

    <!-- Tenhle kód bude implementován v budoucnu -->
    <BaseDropdown class="btn-outline-secondary btn-sm me-1" icon="fa-save" :disabled="true" title="TODO">
      <BaseDropdownItem>TODO <i class="ms-1 fa fa-globe text-black-50" style="top: 1px; position: relative" /> <button class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');"><!--v-if--><i class="fa fa-trash-o" /> </button></BaseDropdownItem>
      <BaseDropdownItem>TODO <button class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');"><!--v-if--><i class="fa fa-trash-o" /> </button></BaseDropdownItem>
      <BaseDropdownItem>TODO <button class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');"><!--v-if--><i class="fa fa-trash-o" /> </button></BaseDropdownItem>
      <BaseDropdownItem class="bg-success-subtle">TODO <button class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');"><!--v-if--><i class="fa fa-trash-o" /> </button></BaseDropdownItem>
      <BaseDropdownItem>TODO <button class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');"><!--v-if--><i class="fa fa-trash-o" /> </button></BaseDropdownItem>
      <BaseDropdownDivider />
      <BaseDropdownItem><i class="fa fa-save me-2" /> Uložit filtr (TODO)</BaseDropdownItem>
    </BaseDropdown>
  </BaseFilter>
</template>
<script setup lang="ts">

withDefaults(defineProps<{
  modelValue?: any | null,
}>(), { modelValue: undefined });

const emit = defineEmits(['update:modelValue']);


</script>