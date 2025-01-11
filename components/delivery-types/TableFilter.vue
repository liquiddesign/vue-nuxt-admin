<template>
  <BaseFilter @cancel="emit('update:modelValue', {})">
    <slot />
    <BaseTextBox v-model="modelValue.idn" wrap="flex-shrink-0" placeholder="id" type="number" style="width: 60px;" />
    <BaseTextBox v-model="modelValue['f-code+name%']" wrap="flex-shrink-0" placeholder="Login, příjmení, jméno, zkratka" type="text" size="40" />
    <BaseMultiSelect v-model="modelValue.roles" placeholder="Role" :multiple="true" wrap="flex-shrink-0" options-url="roles" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />
    <BaseMultiSelect v-model="modelValue.groups" placeholder="Skupiny" :multiple="true" wrap="flex-shrink-0" options-url="groups" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />

    <BaseDropdown class="btn-outline-secondary btn-sm me-1" icon="fa-save">
      <BaseDropdownItem>Filtr pes <i class="ms-1 fa fa-globe text-black-50" style="top: 1px; position: relative" /> <button class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');"><!--v-if--><i class="fa fa-trash-o" /> </button></BaseDropdownItem>
      <BaseDropdownItem>Filtr pes <button class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');"><!--v-if--><i class="fa fa-trash-o" /> </button></BaseDropdownItem>
      <BaseDropdownItem>Filtr pes <button class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');"><!--v-if--><i class="fa fa-trash-o" /> </button></BaseDropdownItem>
      <BaseDropdownItem class="bg-success-subtle">Filtr pes <button class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');"><!--v-if--><i class="fa fa-trash-o" /> </button></BaseDropdownItem>
      <BaseDropdownItem>Filtr pes <button class="btn-xs btn btn" style="position: absolute; right: 10px; z-index: 0" @click.stop.prevent="console.log('áa');"><!--v-if--><i class="fa fa-trash-o" /> </button></BaseDropdownItem>
      <BaseDropdownDivider />
      <BaseDropdownItem><i class="fa fa-save me-2" /> Uložit filtr</BaseDropdownItem>
    </BaseDropdown>
  </BaseFilter>
</template>
<script setup lang="ts">

withDefaults(defineProps<{
  modelValue?: any | null,
}>(), { modelValue: undefined });

const emit = defineEmits(['update:modelValue']);


</script>