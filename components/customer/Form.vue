<template>
  <BaseForm ref="form" :url="url" :data="data" :slug="slug" :loading="loading" :rules="rules" @success="$emit('success', goBack ? null : $event.result); goBack = false">
    <div class="row">
      <div class="col-lg-6">
        <h5 class="card-title">HLAVNÍ ÚDAJE</h5>
        <div class="row">
          <BaseTextBox name="fullname" wrap="col-lg-8" label="Jméno a příjmení" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="company" wrap="col-lg-8" label="Firma" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="ic" wrap="col-lg-8" label="IČ" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="dic" wrap="col-lg-8" label="DIČ" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="phone" wrap="col-lg-8" label="Telefon" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="email" wrap="col-lg-8" label="E-mail" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="ccEmails" wrap="col-lg-8" label="Kopie e-mailů" type="text" />
        </div>
        <i class="fa fa-info-circle" /> Zadejte e-mailové adresy oddělené středníkem (;).

        <div class="row mt-2">
          <BaseTextBox name="" wrap="col-lg-8" label="Ceníky" type="text" />
        </div>
        <div class="row mt-2">
          <BaseMultiSelect name="" wrap="col-lg-8" label="Oblíbené ceníky" />
        </div>
        <i class="fa fa-info-circle" /> Pokud zvolený ceník není přiřazen jako "Ceníky", <br>bude dodatečně spárován.

        <div class="row mt-2">
          <BaseTextBox name="" wrap="col-lg-8" label="Seznamy viditelnosti" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="" wrap="col-lg-8" label="Obchodníci" type="text" />
        </div>
        <div class="row mt-2">
          <BaseMultiSelect name="group" wrap="col-lg-8" label="Skupina" options-url="eshop/customer-group?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
        </div>
        <div class="row mt-2">
          <BaseMultiSelect name="" wrap="col-lg-8" label="Oblíbené produkty" />
        </div>

        <div class="form-wrapper-blue mt-2">
          <h5 class="card-title mt-3">NÁKUP A PREFERENCE</h5>
          <div class="row mt-2">
            <BaseMultiSelect name="parentCustomer" wrap="col-lg-8" label="Nadřazený zákazník" options-url="" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
          </div>
          <div class="row mt-2">
            <BaseMultiSelect name="" wrap="col-lg-8" label="Objednání" options-url="" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="lastOrder" wrap="col-lg-8" label="Poslední objednávka" type="text" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="" wrap="col-lg-8" label="Preferovaný jazyk" type="text" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="preferredCurrency" wrap="col-lg-8" label="Preferovaná měna nákupu" type="text" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="preferredPaymentType" wrap="col-lg-8" label="Preferovaná platba" type="text" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="preferredDeliveryType" wrap="col-lg-8" label="Preferovaná doprava" type="text" />
          </div>
          <div class="row mt-2">
            <BaseMultiSelect name="" wrap="col-lg-8" label="Povolené exkluzivní platby" options-url="" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
          </div>
          <div class="row mt-2">
            <BaseMultiSelect name="" wrap="col-lg-8" label="Povolené exkluzivní platby" options-url="" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="discountLevelPct" wrap="col-lg-8" label="Sleva (%)" />
          </div>
          <i class="fa fa-info-circle" /> Aplikuje se vždy největší z čtveřice: procentuální slevy produktu, procentuální slevy zákazníka, slevy věrnostního programu zákazníka nebo slevového kupónu. <br>Platí jen pokud má ceník povoleno "Povolit procentuální slevy"
          <div class="row mt-2">
            <BaseTextBox name="maxDiscountProductPct" wrap="col-lg-8" label="Max. sleva produktů (%)" />
          </div>
          <i class="fa fa-info-circle" /> Omezuje maximální slevu z dvojice uživatel - produkt.
          <div class="row mt-2">
            <BaseTextBox name="productRoundingPct" wrap="col-lg-8" label="Zaokrouhlení od procent (%)" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="" wrap="col-lg-8" label="Max. cena objednávky bez DPH" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="" wrap="col-lg-8" label="Max. cena objednávky s DPH" />
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-lg-6">
            <BaseFormButton class="btn-success btn-sm me-1" @click="goBack = true;">Uložit</BaseFormButton>
            <BaseFormButton class="btn-outline-primary me-1 btn-sm" @click="goBack = false;">Uložit a pokračovat</BaseFormButton>
          </div>
        </div>

      </div>


      <div class="col-lg-6 ps-5">
        <h5 class="card-title">EXPORTY</h5>
        <div class="form-wrapper-light mt-2">
          <div class="row mt-2">
            <BaseCheckBox name="allowExport" wrap="col-lg-8" label="Feed povolen" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="ediCompany" wrap="col-lg-8" label="EDI: Identifikátor firmy" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="ediBranch" wrap="col-lg-8" label="EDI: Identifikátor pobočky" />
          </div>

          <h5 class="card-title mt-3">CACHE</h5>
          <div class="row mt-2">
            <BaseTextBox name="" wrap="col-lg-8" label="Index" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="" wrap="col-lg-8" label="Dodatečné e-maily asistentů" />
          </div>

          <h5 class="card-title mt-3">QI SPECIFICKÉ</h5>
          <div class="row mt-2">
            <BaseTextBox name="externalId" wrap="col-lg-8" label="ID" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="externalCode" wrap="col-lg-8" label="Code" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="" wrap="col-lg-8" label="CKP" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="" wrap="col-lg-8" label="Asistentka (Qi)" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="" wrap="col-lg-8" label="E-mail asistentky (Qi)" />
          </div>
          <div class="row mt-2">
            <BaseMultiSelect name="" wrap="col-lg-8" label="Asistentka (alternativní)" :options="optionsAssistants" />
          </div>
          <span>
            Vypnuto = Asistentka z Qi nebo ABELman<br>
            Vlastní = Vlastní text a obecný obrázek<br>
            Ostatní = Vybraná asistentka
          </span>
          <div class="row mt-2">
            <BaseTextBox name="" wrap="col-lg-8" label="DealerCategory ID" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="" wrap="col-lg-8" label="DealerCategory jméno" />
          </div>
          <div class="row mt-2">
            <BaseCheckBox name="" wrap="col-lg-8" label="Přiřazovat slevové ceníky" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="" wrap="col-lg-8" label="Poslední aktualizace z Qi" />
          </div>
          <div class="row mt-2">
            <BaseCheckBox name="" wrap="col-lg-8" label="Zobrazit objednání servisu" />
          </div>
          <div class="row mt-2">
            <BaseCheckBox name="" wrap="col-lg-8" label="Individuální dodací adresa" />
          </div>

        </div>
      </div>
    </div>
  </BaseForm>
</template>

<script setup lang="ts">
import {RouteParamValue} from 'vue-router';
import {required} from '@vuelidate/validators';

const props = withDefaults(defineProps<{
  url: string,
  data: any,
  loading?: boolean,
  slug?: string|RouteParamValue[],
}>(), { loading: false, slug: undefined });

const form = ref(null);
const goBack: Ref<boolean> = ref(false);

const rules = {
  email: {required},
};

const optionsAssistants = {
  off: 'Vypnuto',
  personal: 'Vlastní',
  other: 'Ostatní',
};

function submit()
{
  form.value?.submit();
}

const $emit = defineEmits(['success']);
defineExpose({ submit } );
</script>