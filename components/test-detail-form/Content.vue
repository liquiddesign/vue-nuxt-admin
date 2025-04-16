<template>
  <BaseForm ref="form" :data="mainData" :lang="lang" @success="() => {console.log(mainData)}">
    <div class="row">
      <div class="col-lg-6">
        <h5 class="card-title">Obsah</h5>
        <div class="row">
          <BaseTextAreaLocale wrap="col-lg-8" name="label" label="Popisek" />
        </div>
        <div class="row mt-2">
          <BaseTextAreaLocale wrap="col-lg-8" name="detail" label="Obsah" />
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
  'label', 'detail',
];

if (props.data) {
  for (const template of formTemplate) {
    mainData.value[template] = props.data[template];
  }
}
</script>