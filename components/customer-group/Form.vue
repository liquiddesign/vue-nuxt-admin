<template>
  <BaseForm ref="form" :url="url" :data="data" :slug="slug" :rules="rules" :loading="loading" @success="$emit('success', goBack ? null : $event.result); goBack = false">
    <h5 class="card-title">HLAVNÍ ÚDAJE</h5>
    <div class="col-lg-6">
      <div class="row">
        <BaseTextBox wrap="col-lg-12" name="name" label="Název" type="text" required />
      </div>

      <div class="row mt-2">
        <BaseMultiSelect wrap="col-lg-12" name="defaultCatalogPermission" label="Katalogové oprávnění" />
      </div>

      <div class="form-wrapper-light mt-2">
        <div class="row mt-2">
          <BaseCheckBox wrap="col-lg-6" name="defaultPricesWithoutVat" label="Zobrazit ceny bez daně" />
          <BaseCheckBox wrap="col-lg-6" name="defaultPricesWithVat" label="Zobrazit ceny s daní" />
        </div>

        <div class="row mt-2">
          <BaseMultiSelect wrap="col-lg-12" name="defaultPriorityPrice" label="Prioritní cena" :options="priorityPriceOptions" />
        </div>

        <div class="row mt-2">
          <BaseTextBox wrap="col-lg-5" name="defaultDiscountLevelPct" label="Výchozí sleva (%)" type="number" min="0" max="100" required />
          <BaseTextBox wrap="col-lg-7" name="defaultMaxDiscountProductPct" label="Výchozí max.sleva u prod. (%)" type="number" min="0" max="100" required />
        </div>
      </div>

      <div class="row mt-3">
        <BaseCheckBox wrap="col-lg-12" name="defaultBuyAllowed" label="Povolený nákup" />
        <BaseCheckBox wrap="col-lg-12 mt-2" name="defaultViewAllOrders" label="Účet vidí všechny objednávky zákazníka" />
      </div>

      <div class="row mt-2">
        <BaseTextBox wrap="col-lg-6" name="priselists" label="Ceníky" type="text" />
        <BaseMultiSelect wrap="col-lg-6" name="" label="Seznamy viditelnosti" :multiple="true" />
      </div>

      <div class="row mt-3">
        <BaseCheckBox wrap="col-lg-12" name="defaultAfterRegistration" label="Výchozí po registraci" />
        <BaseCheckBox wrap="col-lg-12 mt-2" name="autoActiveCustomers" label="Zákazníci budou automaticky aktivní po registraci" />
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-lg-6">
        <BaseFormButton class="btn-success btn-sm me-1" @click="goBack = true;">Uložit</BaseFormButton>
        <BaseFormButton class="btn-outline-primary me-1 btn-sm" @click="goBack = false;">Uložit a pokračovat</BaseFormButton>
      </div>
    </div>
  </BaseForm>
</template>

<script setup lang="ts">
import {RouteParamValue} from 'vue-router';
import {required} from '@vuelidate/validators';

withDefaults(defineProps<{
  url: string,
  data: any,
  loading?: boolean,
  slug?: string|RouteParamValue[],
}>(), { loading: false, slug: undefined });

const form = ref(null);
const goBack: Ref<boolean> = ref(false);

const rules = {
  name: {required},
  defaultDiscountLevelPct: {required},
  defaultMaxDiscountProductPct: {required},
};

const priorityPriceOptions = {
  'withVat': 'S daní',
  'withoutVat': 'Bez daně',
};

function submit()
{
  form.value?.submit();
}

const $emit = defineEmits(['success']);
defineExpose({ submit } );
</script>