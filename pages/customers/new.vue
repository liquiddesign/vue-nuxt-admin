<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack @click="navigateTo({name: 'customers'})" />
      <a class="btn btn-sm  btn-outline-dark ms-1" :class="{'bg-primary': lang === 'cz'}" @click.prevent="lang = 'cz'"><flag iso="cz" class="px-2" /></a>
      <a class="btn btn-sm btn-outline-dark ms-1" :class="{'bg-primary': lang === 'gb'}" @click.prevent="lang = 'gb'"><flag iso="gb" class="px-2" /></a>
    </template>
    <template #headerRight>
      <BaseButtonSave :disabled="$refs.form?.disabled || $refs.form?.pending" @click="goBack = false; $refs.form.submit();" />
    </template>
    <template #body>
      {{ input }}
      =--
      <BaseTextBoxLocale v-model="input.pokus[lang]" label="jazyk" :lang="lang" :langs="['gb','en','ru']" />
      =--
      <BaseForm ref="form" url="customer" :input="input" :rules="rules" @success="success">
        <BaseTextBox name="account.name" />
        <div class="row">
          <div class="col-lg-6">
            <h5 class="card-title">Zákazník</h5>
            {{ input }}
            ----
            <BaseTextBoxLocale label="jazyk" name="pokus" :lang="lang" :langs="['cz','gb','ru']" />
            ---
            <BaseCheckBox v-model="isCompany" label="Označit zákazníka jako firmu" />

            <div class="row mt-2">
              <BaseTextBox v-if="!isCompany" name="fullname" wrap="col-lg-6" label="Jméno a příjmení" type="text" />
              <BaseTextBox v-if="isCompany" name="company" wrap="col-lg-6" label="Společnost" type="text" />
            </div>
            <div v-if="isCompany" class="row mt-2">
              <BaseTextBox name="ic" lang="cz" :locale="true" wrap="col-lg-6" label="IC" type="text" />
              <BaseTextBox name="dic.cs" wrap="col-lg-6" label="DIČ" type="text" />
            </div>
            <div class="row mt-2">
              <BaseTextBox name="email" wrap="col-lg-6" label="E-mail" type="text" />
              <BaseTextBox name="ccEmails" wrap="col-lg-6" label="E-mail (kopie)" type="text" />
            </div>
            <div class="row mt-2">
              <BaseTextBox name="phone" wrap="col-lg-6" label="Telefon" type="text" />
              <BaseTextBox name="phone" wrap="col-lg-6" label="Telefon" type="text" />
            </div>
            <div v-if="0" class="row mt-2">
              <!--<BaseFormInput name="parentCustomer" wrap="col-lg-6" label="Nadřazený zákazník / centrála" type="text" />-->
              <div class="col-lg-6">
                <label>Nadřazený zákazník / centrála</label>
                <div style="max-height:29.4px;">
                  <!--<VueMultiselect v-model="input.parent" :options-limit="200" :customLabel="(value) => $currencies.currencies[value]?.company" :searchable="true" :options="options2" placeholder="Zvolte položku ..."  selectLabel="" deselectLabel="odstranit" selectedLabel="Zvolena">
                <template #option="{option}">Zákazník ič|{{ $currencies.currencies[option]?.company }}|aaaa</template>
              </VueMultiselect>-->
                </div>
              </div>
              <div class="col-lg-6">
                <label>Přiřazení obchodníci</label>
                <div style="max-height:29.4px;">
                  <!--<VueMultiselect id="test" :options-limit="50" :model-value="'pse'" :options="['pse']" :multiple="false" placeholder="Zvolte položku ..." selectLabel="" deselectLabel="odstranit" selectedLabel="Zvolena">
                <template #option="{option}">Zákazník ič|{{ option }}|aaaa</template>
              </VueMultiselect>-->
                </div>
              </div>
            </div>
            <div class="form-wrapper-blue mt-3">
              <div class="row">
                <div class="col-lg-6">
                  <h5 class="card-title">Fakturační adresa</h5>
                </div>
                <div class="col-lg-6">
                  <h5 class="card-title">Doručovací adresa</h5>
                </div>
              </div>
              <div class="row mt-2">
                <BaseTextBox name="billAddress.street" wrap="col-lg-6" label="Ulice" type="text" />
                <BaseTextBox name="deliveryAddress.street" wrap="col-lg-6" label="Ulice" type="text" />
              </div>
              <div class="row mt-2">
                <BaseTextBox name="billAddress.city" wrap="col-lg-4" label="Město" type="text" />
                <BaseTextBox name="billAddress.zipcode" wrap="col-lg-2" label="PSČ" type="text" />
                <BaseTextBox name="deliveryAddress.street" wrap="col-lg-4" label="Město" type="text" />
                <BaseTextBox name="deliveryAddress.zipcode" wrap="col-lg-2" label="PSČ" type="text" />
              </div>
              <div class="row mt-2">
                <BaseTextBox name="billAddress.state" wrap="col-lg-6" label="Stát" type="text" />
                <BaseTextBox name="deliveryAddress.state" wrap="col-lg-6" label="Stát" type="text" />
              </div>
              <div class="row mt-2">
                <BaseTextBox name="billAddress.note" wrap="col-lg-6" label="Poznámka" type="text" />
                <BaseTextBox name="deliveryAddress.note" wrap="col-lg-6" label="Poznámka" type="text" />
              </div>
            </div>
            <h5 class="card-title mt-2">Ceny a slevy</h5>
            <div class="row">
              <div class="col-lg-6">
                <label>Ceníky ss</label>
              <!--<VueMultiselect v-model="input.parent" :options-limit="50" :options="options" placeholder="Zvolte položku ..."  selectLabel="" deselectLabel="odstranit" selectedLabel="Zvolena" :loading="isLoading" @search-change="asyncFind">
                <template #option="{option}">Zákazník ič|{{ option }}|aaaa</template>
              </VueMultiselect>-->
              </div>
              <div class="col-lg-6">
                <label>Měna</label>
              <!--<VueMultiselect v-model="input.parent" :options-limit="50" :options="Object.keys($currencies.currencies)" placeholder="Zvolte položku ..." selectLabel="" deselectLabel="odstranit" selectedLabel="Zvolena">
                <template #option="{option}">{{ $currencies.currencies[option].uuid }}</template>
              </VueMultiselect>-->
              </div>
            </div>
            <div class="row mt-2">
              <BaseTextBox name="phone" wrap="col-lg-6" label="Procentuální sleva" type="text" />
            </div>

            <div class="form-wrapper-blue mt-3">
              <h5 class="card-title mt-3">Nákup</h5>
              <div class="row">
                <BaseTextBox name="phone" wrap="col-lg-6" label="Telefon" type="text" />
                <BaseTextBox name="email" wrap="col-lg-6" label="E-mail" type="text" />
              </div>

              <div class="row">
                <BaseTextBox name="phone" wrap="col-lg-6" label="Telefon" type="text" />
                <BaseTextBox name="email" wrap="col-lg-6" label="E-mail" type="text" />
              </div>
            </div>
            <h5 class="card-title">Exporty</h5>
            <div class="row">
              <BaseTextBox name="phone" wrap="col-lg-6" label="Telefon" type="text" />
              <BaseTextBox name="email" wrap="col-lg-6" label="E-mail" type="text" />
            </div>
            <div class="row mt-3">
              <div class="col-lg-6">
                <BaseFormButton class="btn-success me-1" @click="goBack = true;">Uložit</BaseFormButton>
                <BaseFormButton class="btn-outline-primary" @click="goBack = false;">Uložit a pokračovat</BaseFormButton>
              </div>
            </div>
          </div>
          <div class="col-lg-6 ps-5">
            <h5 class="card-title">Účty</h5>
            <div class="form-wrapper-light mt-3">
              <h5 class=" card-title-lower">1) petr@lqd.cz    <div class="float-end"><button class="btn btn-xs btn-outline-secondary me-2"><i class="fa fa-trash-o" /></button></div></h5>
              <div class="row">
                <BaseTextBox name="phone" wrap="col-lg-6" label="Telefon" type="text" />
                <BaseTextBox name="email" wrap="col-lg-6" label="E-mail" type="text" />
              </div>
              <div class="row mt-2">
                <BaseTextBox name="phone" wrap="col-lg-6" label="Telefon" type="text" />
                <BaseTextBox name="email" wrap="col-lg-6" label="E-mail" type="text" />
              </div>
              <hr class="pt-1" style="color: white">
              <h5 class=" card-title-lower">2) petr@lqd.cz    <div class="float-end"><button class="btn btn-xs btn-outline-secondary me-2"><i class="fa fa-trash-o" /></button></div></h5>
              <div class="row">
                <BaseTextBox name="phone" wrap="col-lg-6" label="Telefon" type="text" />
                <BaseTextBox name="email" wrap="col-lg-6" label="E-mail" type="text" />
              </div>
              <div class="row">
                <BaseTextBox name="phone" wrap="col-lg-6" label="Telefon" type="text" />
                <BaseTextBox name="email" wrap="col-lg-6" label="E-mail" type="text" />
              </div>
              <div class="mt-3">
                <button class="btn btn-sm btn-outline-secondary me-2"><i class="fa fa-plus" /></button>
              </div>
            </div>
          </div>
        </div>
      </BaseForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">
import {required} from '@vuelidate/validators';
import { reactive } from 'vue';

const input:any = reactive({account: {}, pokus: {cz: 'aa'}});
const goBack:Ref<boolean> = ref(false);
const isCompany:Ref<boolean> = ref(false);
const lang:Ref<string> = ref('cz');



/*
$fetch(config.public.baseURL + 'customer', {method: "POST", body: {'_op': 'optionsList'}}).then((response: any) => {

  options2.value = Object.values(response.result);
  optionsValues.value = response.result;

});*/



const rules = {
  test: { required },
  pokus: { required },
};

//const v$: Ref<BaseValidation> = useVuelidate(rules, input, {$autoDirty: true});



function success(result:any) {
  Object.keys(input).forEach((key:string) => delete input[key]);
  Object.assign(input, {});

  if (!goBack.value) {
    navigateTo({name: 'customers-id', params: {id: result.result}});
  } else {
    navigateTo({name: 'customers'});
  }

}

</script>