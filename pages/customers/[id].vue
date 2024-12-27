<template>
  <BaseCard>
    <template #headerLeft>
      <button class="btn btn-light btn-sm" @click="navigateTo({name: 'customers'})"><i class="fa fa-long-arrow-left" /> Zpět</button>
    </template>
    <template #headerRight>
      <BaseButtonSave :disabled="$refs.form?.disabled || $refs.form?.pending" @click="goBack = false; $refs.form.submit();" />
    </template>
    <template #body>
      <div class="row">
        <BaseForm ref="form" wrap="col-lg-6" url="customer" :disabled="pending" :slug="route.params.id" :input="input" :rules="rules" @success="success">
          <div class="row">
            <BaseFormInput name="ic" wrap="col-lg-6" label="IC" type="text" />
            <BaseFormInput name="company" wrap="col-lg-6" label="Company" type="text" />
          </div>
          <div class="row mt-3">
            <div class="col-lg-6">
              <BaseFormButton class="btn-success me-1" @click="goBack = true;">Uložit</BaseFormButton>
              <BaseFormButton class="btn-outline-primary" @click="goBack = false;">Uložit a pokračovat</BaseFormButton>
            </div>
          </div>
        </BaseForm>
      </div>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">

const route = useRoute();
const config = useRuntimeConfig();

const input:any = reactive({});
const goBack:Ref<boolean> = ref(false);
const rules = {};

function success() {
  if (goBack.value) {
    navigateTo({name: 'customers'});
  }
}

const {data, pending} = useFetch(config.public.baseURL + 'customer/' + route.params.id, {
  pick : ['ic', 'company', 'uuid'],
});


watch(data, (value) => {

  Object.assign(input, value);
});




</script>