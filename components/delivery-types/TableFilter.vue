<template>
  <BaseFilter @clear="emit('clear')">
    <slot />
    <BaseTextBox v-model="modelValue.idn" wrap="flex-shrink-0" placeholder="id" type="number" style="width: 60px;" />
    <BaseTextBox v-model="modelValue['f-code+name%']" wrap="flex-shrink-0" placeholder="Kód a název" type="text" size="40" />
    <BaseMultiSelect v-model="modelValue['f-exclusive']" placeholder="Skupiny" :multiple="true" wrap="flex-shrink-0" options-url="eshop/customer-group?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
    <BaseMultiSelect v-model="modelValue['f-allowedPaymentTypes']" placeholder="Platby" :multiple="true" wrap="flex-shrink-0" options-url="eshop/payment-type?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />

    <!-- Tenhle kód bude implementován v budoucnu -->
    <BaseDropdown class="btn-outline-secondary btn-sm me-1" icon-name="Save" title="TODO">
      <BaseDropdownItem>
        TODO <BaseIcon icon-name="Globe" class="ms-1 text-black-50" />
        <BaseButtonDelete class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');" />
      </BaseDropdownItem>
      <BaseDropdownItem>
        TODO <BaseIcon icon-name="Globe" class="ms-1 text-black-50" style="top: 1px; padding: 2px; border: 1px solid gray; position: relative" />
        <BaseButtonDelete class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');" />
      </BaseDropdownItem>
      <BaseDropdownItem>TODO <BaseButtonDelete class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');" /></BaseDropdownItem>
      <BaseDropdownItem class="bg-success-subtle">TODO <BaseButtonDelete class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');" /></BaseDropdownItem>
      <BaseDropdownItem>
        TODO
        <div style="position: absolute; right: 10px; z-index: 0">
          <button class="btn-xs btn-outline-secondary btn me-2" @click.stop.prevent="console.log('áa');"><!--v-if--><BaseIcon icon-name="Globe" class="text-black-50" /> </button>
          <BaseButtonDelete class="btn-xs btn-outline-secondary btn" @click.stop.prevent="console.log('áa');" />
        </div>
      </BaseDropdownItem>
      <BaseDropdownDivider />
      <div class="px-2">
        <div class="input-group">
          <BaseTextBox class="form-control-xs" placehoder="uložit filtr" />
          <BaseButtonSave class="btn-xs" @click.stop="console.log('a')" />
        </div>
      </div>
      <BaseDropdownItem><BaseIcon icon-name="Save" class="me-2" /> Uložit filtr (TODO)</BaseDropdownItem>
    </BaseDropdown>
  </BaseFilter>
</template>
<script setup lang="ts">

withDefaults(defineProps<{
  modelValue?: any | null,
}>(), { modelValue: undefined });

const emit = defineEmits(['update:modelValue', 'clear']);


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