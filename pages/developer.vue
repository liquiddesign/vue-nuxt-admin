<template>
  <div class="row">
    <BaseCard wrap="col-lg-6">
      Karta jen s tělem
    </BaseCard>
    <BaseCard wrap="col-lg-6">
      <template #header>Karta Hlavička</template>
      <template #body>Karta Tělo</template>
      <template #footer>Karta Patička</template>
    </BaseCard>
  </div>
  <div class="row">
    <BaseCard wrap="col-lg-6">
      <template #header>Standalone tlačítka</template>
      <template #body>
        <div class="row">
          <div class="col-lg-10">
            <BaseButton class="btn-primary">Velké tlačítko</BaseButton>
            <BaseButton class="btn-sm btn-primary ms-2">Střední tlačítko</BaseButton>
            <BaseButton class="btn-xs btn-primary ms-2">Malé tlačítko</BaseButton>
            <BaseButton class="btn-sm btn-primary ms-2" :loading="true">Busy tlačítko</BaseButton>
            <BaseButtonBack class="ms-2" />
            <BaseButtonBack class="btn-sm ms-2" />
            <BaseButtonBack class="btn-xs ms-2" />
            <BaseButtonCancel class="ms-2" />
            <BaseButtonCancel class="btn-sm ms-2" />
            <BaseButtonCancel class="btn-xs ms-2" />
            <BaseButtonSave class="ms-2" />
            <BaseButtonSave class="btn-sm ms-2" />
            <BaseButtonSave class="btn-xs ms-2" />
            <BaseButtonDelete class="ms-2" />
            <BaseButtonDelete class="btn-sm ms-2" />
            <BaseButtonDelete class="btn-xs ms-2" />
            <BaseButtonEdit class="ms-2" />
            <BaseButtonEdit class="btn-sm ms-2" />
            <BaseButtonEdit class="btn-xs ms-2" />
          </div>
          <BaseButton wrap="col-lg-2" class="btn-primary">Wrapované tlačítko</BaseButton>
        </div>
      </template>
    </BaseCard>
    <BaseCard wrap="col-lg-6">
      <template #header>Flash zprávy</template>
      <BaseButton class="btn-outline-success" @click="toast.success('OK')">OK</BaseButton>
      <BaseButton class="btn-outline-primary ms-2" @click="toast.info('INFO')">INFO</BaseButton>
      <BaseButton class="btn-outline-danger ms-2" @click="toast.error('ERROR')">ERROR</BaseButton>
    </BaseCard>
  </div>
  <div class="row">
    <BaseCard wrap="col-lg-6">
      <template #header>Modal okna</template>
      <BaseButton class="btn-outline-secondary" @click="$refs.modal1.open();">Modal 1</BaseButton>
      <BaseButton class="btn-outline-secondary ms-2" @click="$refs.modal2.open();">Modal 2</BaseButton>
      <BaseModal ref="modal1" title="Modal 1">
        Tohle je tělo.
      </BaseModal>
      <BaseModal ref="modal2">
        <template #header>Modal 2</template>
        <template #body>Tělo</template>
        <template #footer>Patička</template>
      </BaseModal>
    </BaseCard>
    <BaseCard wrap="col-lg-6">
      <template #header>Popper</template>
      <Popper arrow placement="right">
        <BaseButtonDelete class="btn-xs" />
        <template #content="{close}">
          Opravdu smazat?<br>
          <div class="text-center">
            <button class="btn btn-success btn-xs">Ano</button>
            <button class="btn btn-light btn-xs ms-2" @click="close">Ne</button>
          </div>
        </template>
      </Popper>
      <Popper hover content="This is the Popper content" placement="top">
      <BaseButton class="btn-xs btn-outline-secondary ms-2">Nápověda</BaseButton>
      </Popper>
    </BaseCard>
  </div>
  <div class="row">
    <BaseCard wrap="col-lg-6">
      <template #header>Uživatel</template>
      {{ $user }}
    </BaseCard>
    <BaseCard wrap="col-lg-6">
      <template #header>Vlajky a ikony</template>
      <flag iso="gb" /> <span style="font-size: 1.5rem"><flag iso="cz" class="ms-2"/></span>
      <a target="_blank" href="https://themes-pixeden.com/font-demos/7-stroke">https://themes-pixeden.com/font-demos/7-stroke</a>
      <span style="font-size: 1.5rem"><i class="pe-7s-users " /></span>
      <span style="font-size: 1.5rem"><i class="pe-7s-users icon-gradient bg-ripe-malin" /></span>
      <a target="_blank" href="https://fontawesome.com/v4/icons/">https://fontawesome.com/v4/icons/</a>
      <i class="fa fa-bookmark-o"></i>
    </BaseCard>
  </div>
  <BaseCard>
    <template #header>Formulářové prvky</template>
    <div class="d-flex gap-1">
      <BaseTextBox id="test" label="BaseTextBox" v-model="formData.name" wrap="flex-shrink-0" style="width: 100px" placeholder="Standartní" />
      <BaseTextBox label="BaseTextBox" v-model="formData.name" wrap="flex-shrink-0" class="form-control-xs" style="width: 100px" placeholder="Malý" />
      <BaseTextBox label="BaseTextBox" v-model="formData.numeric" type="number" wrap="flex-shrink-0" style="width: 100px" placeholder="Číslo" />
      <BaseTextBox label="BaseTextBox" v-model="formData.numeric" type="float" wrap="flex-shrink-0" style="width: 100px" placeholder="Float" />
      <BaseTextBox label="BaseTextBox" v-model="formData.name" :nullable="true" wrap="flex-shrink-0" style="width: 100px" placeholder="Nullable" />
      <BaseTextBox label="BaseTextBox" v-model="formData.name" :disabled="true" wrap="flex-shrink-0" style="width: 100px" placeholder="Disable" />
      <BaseTextBox label="BaseTextBox" v-model="formData.test" wrap="flex-shrink-0" style="width: 100px" placeholder="predvyplnene" />
      <BaseTextBox label="" v-model="formData.name" wrap="flex-shrink-0" style="width: 200px" placeholder="S prázdným popiskem" />
      <BaseTextBox v-model="formData.name" wrap="flex-shrink-0" style="width: 200px" placeholder="Bez popisku" />
      <BaseForm :input="formData">
        <BaseTextBox name="test2" wrap="flex-shrink-0" style="width: 100px" placeholder="S formulářem" />
        <BaseTextBox name="test2" wrap="flex-shrink-0" style="width: 100px" placeholder="S formulářem" />
      </BaseForm>-->
      <div class="flex-shrink-0" style="line-height: 29px;">Value: {{ formData.name }} (null: {{ formData.name === null ? 'ano' : 'ne'}})</div>
    </div>
    <div class="d-flex gap-1">
      <BaseTextArea label="BaseTextArea" wrap="flex-shrink-0" v-model="formData.name" placeholder="Standartní" />
      <BaseTextArea label="BaseTextArea" wrap="flex-shrink-0" :nullable="true" v-model="formData.name" placeholder="Nullable" />
      <BaseForm :input="formData">
        <BaseTextArea label="BaseTextArea" name="test2" placeholder="S formulářem" />
      </BaseForm>
      <div class="flex-shrink-0" style="line-height: 29px;">Value: {{ formData.name }} (null: {{ formData.name === null ? 'ano' : 'ne'}}) | Test2: {{ formData.test2 }}</div>
    </div>
    <div class="d-flex gap-1">
      <BaseSelect label="BaseSelect" v-model="formData.gender" prompt="Choose" wrap="flex-shrink-0" :options="{'male': 'muz', 'female' : 'zena'}" />
      <BaseForm :input="formData">
        <BaseSelect label="BaseSelect" name="gender" prompt="Choose" wrap="flex-shrink-0" :options="{'male': 'muz', 'female' : 'zena'}" />
      </BaseForm>
      <div class="flex-shrink-0" style="line-height: 29px;">Value: {{ formData.gender }} (null: {{ formData.gender === null ? 'ano' : 'ne'}})</div>
    </div>
    <div class="d-flex gap-1">
      <BaseCheckBox label="BaseCheckBox" v-model="formData.hidden" wrap="flex-shrink-0" />
      <BaseCheckBox v-model="formData.hidden" wrap="flex-shrink-0" />
      <BaseForm :input="formData">
        <BaseCheckBox label="BaseCheckBox" name="hidden" wrap="flex-shrink-0" />
      </BaseForm>
      <div class="flex-shrink-0" style="line-height: 29px;">Value: {{ formData.hidden }} (null: {{ formData.hidden === null ? 'ano' : 'ne'}})</div>
    </div>
    <div class="d-flex gap-1">
      <BaseRadioBox v-model="formData.gender" :options="{'male': 'muz', 'female' : 'zena'}"></BaseRadioBox>
      <BaseForm :input="formData">
        <BaseRadioBox name="gender" :options="{'male': 'muz', 'female' : 'zena'}"></BaseRadioBox>
      </BaseForm>
      <div class="flex-shrink-0" style="line-height: 29px;">Value: {{ formData.gender }} (null: {{ formData.gender === null ? 'ano' : 'ne'}})</div>
    </div>
    <div class="d-flex gap-2">
      <BaseMultiSelect label="BaseMultiSelect" wrap="flex-shrink-0" v-model="formData.gender" :options="{'male': 'muz', 'female' : 'zena'}" />
      <BaseForm :input="formData">
        <BaseMultiSelect label="BaseMultiSelect" wrap="flex-shrink-0" name="gender" :options="{'male': 'muz', 'female' : 'zena'}" />
      </BaseForm>

      <BaseMultiSelect label="BaseMultiSelect (Multi)" :multiple="true" wrap="flex-shrink-0" v-model="formData.colors" :options="{'red': 'cervena', 'blue' : 'modra', 'green' : 'zelena'}" />


      <BaseMultiSelect label="BaseMultiSelect" wrap="flex-shrink-0" v-model="formData.company" options-url="customer" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />
      <BaseMultiSelect label="BaseMultiSelect" wrap="flex-shrink-0" v-model="formData.company" :async="true" options-url="customer" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />

      <div class="flex-shrink-0" style="line-height: 29px;">Value: {{ formData.colors }} (null: {{ formData.colors === null ? 'ano' : 'ne'}})</div>
      <div class="flex-shrink-0" style="line-height: 29px;">Value: {{ formData.company }} (null: {{ formData.company === null ? 'ano' : 'ne'}})</div>
      https://github.com/shentao/vue-multiselect/tree/next
    </div>
    <div class="d-flex gap-1">
      <BaseFileBox />
    </div>
    <div class="d-flex gap-1">
      <BaseImageBox :maxUploadSize="2" :max-files="3" />
    </div>
  </BaseCard>
  <BaseCard>
    <template #header>Validace</template>
    <div class="d-flex gap-1">

      <BaseTextBox label="BaseTextBox" v-model="formData.validation1" :validation="v$.validation1" wrap="flex-shrink-0" style="width: 100px" placeholder="Standartní" />
      <BaseTextArea label="BaseTextArea" wrap="flex-shrink-0" v-model="formData.validation1" :validation="v$.validation1" placeholder="Standartní" />
      <BaseButton @click="v$.$validate()" class="btn-success">Zvalidovat</BaseButton> Valid: {{ !v$.$invalid }}
      <BaseForm :input="formData" :rules="rules">
        <BaseTextBox label="BaseTextBox" name="validation2" wrap="flex-shrink-0" style="width: 100px" placeholder="Standartní" />
      </BaseForm>

      <div class="flex-shrink-0" style="line-height: 29px;">Value1: {{ formData.validation1 }}, Value2: {{ formData.validation2 }}</div>
    </div>
  </BaseCard>
  <BaseCard>
    <template #header>Jazyky</template>
  </BaseCard>
  <BaseCard>
    <template #header>Formuláře</template>
  </BaseCard>
  <BaseCard>
    <template #header>Taby</template>
  </BaseCard>
  <BaseCard>
    <template #header>Highlights</template>
  </BaseCard>
  <BaseCard>
    <template #header>Tabulky</template>
  </BaseCard>
  <BaseCard>
    <template #header>Strom</template>
  </BaseCard>
  <BaseCard>
    <template #header>Image preview</template>
  </BaseCard>
</template>
<script setup lang="ts">
import {ToastPluginApi, useToast} from "vue-toast-notification";
import {required} from "@vuelidate/validators";
import useVuelidate, {BaseValidation} from "@vuelidate/core";

const toast: ToastPluginApi = inject('toast', useToast());

const { $user } = useNuxtApp();

const formData: Ref<any> = ref({gender: 'female', hidden: true, colors: ['green'], company: null, test: 'test'});

const rules = {
  validation1: { required },
  validation2: { required },
};

const v$: Ref<BaseValidation> = useVuelidate(rules, formData, {$autoDirty: true});

</script>