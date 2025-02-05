<template>
  <BaseFilter @clear="emit('clear')">
    <BaseTextBox v-model="modelValue['f-fullname%']" wrap="flex-shrink-0" placeholder="Jméno a příjmení" type="text" size="40" style="max-width: 290px" />
    <BaseTextBox v-model="modelValue['f-email%']" wrap="flex-shrink-0" placeholder="E-mail" type="text" size="40" style="max-width: 290px" />
    <BaseTextBox v-model="modelValue['f-phone%']" wrap="flex-shrink-0" placeholder="Telefon" type="text" size="40" style="max-width: 290px" />
    <BaseMultiSelect v-model="modelValue['f-group']" placeholder="Skupina" :multiple="true" wrap="flex-shrink-0" options-url="eshop/customer-group?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" style="width: 144px" />
    <BaseMultiSelect v-model="modelValue['f-parentCustomer']" placeholder="Nadřazený zák." :multiple="true" wrap="flex-shrink-0" options-url="" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" style="width: 144px" />
    <BaseTextBox v-model="modelValue['f:>>createdTs']" placeholder="Registrace od" type="text" style="max-width: 290px" />
    <BaseTextBox v-model="modelValue['f:<<createdTs']" placeholder="Registrace do" type="text" style="max-width: 290px" />
    <BaseTextBox v-model="modelValue['f:>>createdTs']" placeholder="Poslední obj. od" type="text" style="max-width: 290px" />
    <BaseTextBox v-model="modelValue['f:<<createdTs']" placeholder="Poslední obj. do" type="text" style="max-width: 290px" />
    <BaseTextBox v-model="modelValue['f-ordersCount']" placeholder="Počet obj." type="number" style="max-width: 290px" />
    <BaseTextBox v-model="modelValue['f-billAddress']" placeholder="Fakt. adr. město" type="text" style="max-width: 290px" />
    <BaseTextBox v-model="modelValue['f-deliveryAddress']" placeholder="Dod. adr. město" type="text" style="max-width: 290px" />
  </BaseFilter>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: any | null,
}>(), { modelValue: undefined });

const emit = defineEmits(['update:modelValue', 'clear']);
</script>