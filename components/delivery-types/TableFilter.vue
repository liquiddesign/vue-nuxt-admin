<template>
  <BaseFilter @cancel="emit('update:modelValue', {})">
    <slot />
    <BaseTextBox v-model="modelValue.idn" wrap="flex-shrink-0" placeholder="id" type="number" style="width: 60px;" />
    <BaseTextBox v-model="modelValue['f-code+name%']" wrap="flex-shrink-0" placeholder="Kód a název" type="text" size="40" />
    <BaseMultiSelect v-model="modelValue['f-exclusive']" placeholder="Skupiny" :multiple="true" wrap="flex-shrink-0" options-url="eshop/customer-group?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
    <BaseMultiSelect v-model="modelValue['f-allowedPaymentTypes']" placeholder="Platby" :multiple="true" wrap="flex-shrink-0" options-url="eshop/payment-type?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />

    <!-- Tenhle kód bude implementován v budoucnu -->
    <BaseDropdown class="btn-outline-secondary btn-sm me-1 text-primary " icon="fa-save" title="TODO">
      <BaseDropdownItem>TODO <i class="ms-1 fa fa-globe text-black-50" style="top: 1px; position: relative" /> <button class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');"><!--v-if--><i class="fa fa-trash-o" /> </button></BaseDropdownItem>
      <BaseDropdownItem>TODO <i class="child ms-2 fa fa-globe text-black-50" style="top: 1px; padding: 2px; border: 1px solid gray; position: relative" />

        <button class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');"><!--v-if--><i class="fa fa-trash-o" /> </button></BaseDropdownItem>
      <BaseDropdownItem>TODO <button class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');"><!--v-if--><i class="fa fa-trash-o" /> </button></BaseDropdownItem>
      <BaseDropdownItem class="bg-success-subtle">TODO <button class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');"><!--v-if--><i class="fa fa-trash-o" /> </button></BaseDropdownItem>
      <BaseDropdownItem>TODO

        <div style="position: absolute; right: 10px; z-index: 0">
        <button class="btn-xs btn-outline-secondary btn me-2" @click.stop.prevent="console.log('áa');"><!--v-if--><i class="fa fa-globe" /> </button>
        <button class="btn-xs btn-outline-secondary btn" @click.stop.prevent="console.log('áa');"><!--v-if--><i class="fa fa-trash-o" /> </button>
        </div>
      </BaseDropdownItem>
      <BaseDropdownDivider />
      <div class="px-2">
        <div class="input-group">
        <BaseTextBox class="form-control-xs" placehoder="uložit filtr" />
          <BaseButtonSave class="btn-xs" @click.stop="console.log('a')" />
        </div>

      </div>
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

<style scoped>

.child {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease; /* Animace pro plynulý přechod */
}

.dropdown-item:hover .child {
  opacity: 1;
}

.dropdown-item .child:hover {
  color: red !important;
}

</style>