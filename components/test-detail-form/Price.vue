<template>
  <BaseForm ref="form" :data="mainData" :lang="lang" @success="() => {console.log(mainData)}">
    <div class="row">
      <div class="col-lg-6">
        <h5 class="card-title">Slevy a daně</h5>
        <div class="row">
          <BaseTextBox wrap="col-lg-4" name="discount" label="Procentuální sleva (%)" type="number" />
          <BaseTextBox wrap="col-lg-4" name="dph" label="Úroveň DPH (%)" type="number" />
        </div>
        <div class="row mt-2">
          <BaseMultiSelect wrap="col-lg-8" name="vat" label="Poplatky a daně" />
        </div>
        <h5 class="card-title mt-3">Viditelnosti</h5>
        <div class="row">
          <BaseTextBox wrap="col-lg-4" name="visibility.abel.priority" label="Priorita" type="number" />
        </div>
        <div class="row mt-2">
          <BaseCheckBox wrap="col-lg-3" name="visibility.abel.active" label="Aktivní" />
          <BaseCheckBox wrap="col-lg-3" name="visibility.abel.hidden" label="Skryto" />
          <BaseCheckBox wrap="col-lg-3" name="visibility.abel.recommended" label="Doporučeno" />
        </div>
      </div>
      <div class="col-lg-6">
        <h5 class="card-title">Ceníky</h5>
        <div class="table-responsive">
          <table class="mb-0 table table-sm table-striped">
            <thead>
              <tr>
                <BaseGridTh />
                <BaseGridTh class="minimal" order-by="price">Cena bez DPH</BaseGridTh>
                <BaseGridTh class="minimal" order-by="priceVat">Cena s DPH</BaseGridTh>
                <BaseGridTh class="minimal" order-by="priceBefore">Původní bez DPH</BaseGridTh>
                <BaseGridTh class="minimal" order-by="priceVatBefore">Původní s DPH</BaseGridTh>
                <BaseGridTh class="minimal" />
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, key) of mainData.pricelist" :key="key">
                <td>{{ item.pricelist.name }}</td>
                <td class="minimal">{{ item.price }}</td>
                <td class="minimal">{{ item.priceVat }}</td>
                <td class="minimal">{{ item.priceBefore }}</td>
                <td class="minimal">{{ item.priceVatBefore }}</td>
                <td class="minimal"><BaseButtonDelete class="btn-xs btn-danger" /></td>
              </tr>
            </tbody>
          </table>
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
  'visibility', 'discount', 'dph', 'vat', 'pricelist',
];

if (props.data) {
  for (const template of formTemplate) {
    mainData.value[template] = props.data[template];
  }
}
</script>