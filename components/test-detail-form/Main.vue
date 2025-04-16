<template>
  <BaseForm ref="form" :data="mainData" :lang="lang" @success="() => {console.log(mainData)}">
    <div class="row">
      <div class="col-lg-6">
        <h5 class="card-title">Hlavní údaje</h5>
        <div class="row">
          <BaseTextBoxLocale wrap="col-lg-8" name="name" label="Název" type="text" />
        </div>
        <div class="row mt-2">
          <BaseMultiSelect wrap="col-lg-8" name="amount" label="Dostupnost" options-url="eshop/display-amount?property=label" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
        </div>
        <div class="row mt-2">
          <BaseMultiSelect wrap="col-lg-8" name="delivery" label="Doručení" options-url="eshop/display-delivery?property=label" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
        </div>
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
const props = defineProps({
  data: {type: Object, default: null},
  lang: {type: String, default: 'cs'},
});

const goBack: Ref<boolean> = ref(false);
const mainData: Ref<any> = ref({});
const formTemplate = [
    'name', 'amount', 'delivery',
];

if (props.data) {
  for (const template of formTemplate) {
    mainData.value[template] = props.data[template];
  }
}

</script>