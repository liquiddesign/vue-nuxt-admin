<template>
  <BasePageHeader title="Hlavička" icon="pe-7s-users" description="Cokoliv si zamantene">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'customers-new'})">Přidat cokoliv</BaseButtonNew>
  </BasePageHeader>
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
            <BaseDropdown icon="fa-trash-o" class="btn-outline-danger">
              <BaseDropdownItem>asdasd</BaseDropdownItem>
              <BaseDropdownItem :disabled="true">asdasd</BaseDropdownItem>
              <BaseDropdownDivider />
              <BaseDropdownItem>asdasd</BaseDropdownItem>
            </BaseDropdown>
            <BaseDropdown icon="fa fa-bolt" class="btn-outline-primary btn-xs" />
            <BaseDropdown icon="fa fa-bolt" :loading="true" class="btn-outline-primary btn-xs" />
            <BaseDropdown icon="fa fa-bolt" :label="'cokoliv <strong>html</strong>'" class="btn-outline-secondary" />
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
      <flag iso="gb" /> <span style="font-size: 1.5rem"><flag iso="cz" class="ms-2" /></span>
      <a target="_blank" href="https://themes-pixeden.com/font-demos/7-stroke">https://themes-pixeden.com/font-demos/7-stroke</a>
      <span style="font-size: 1.5rem"><i class="pe-7s-users " /></span>
      <span style="font-size: 1.5rem"><i class="pe-7s-users icon-gradient bg-ripe-malin" /></span>
      <a target="_blank" href="https://fontawesome.com/v4/icons/">https://fontawesome.com/v4/icons/</a>
      <i class="fa fa-bookmark-o" />
    </BaseCard>
  </div>
  <div class="row">
    <BaseCard wrap="col-lg-6">
      <template #header>Formulářové prvky</template>
      <div class="d-flex gap-1">
        <BaseTextBox id="test" v-model="formData.name" label="BaseTextBox" wrap="flex-shrink-0" style="width: 100px" placeholder="Standartní" />
        <BaseTextBox v-model="formData.name" label="BaseTextBox" wrap="flex-shrink-0" class="form-control-xs" style="width: 100px" placeholder="Malý" />
        <BaseTextBox v-model="formData.numeric" label="BaseTextBox" type="number" wrap="flex-shrink-0" style="width: 100px" placeholder="Číslo" />
        <BaseTextBox v-model="formData.numeric" label="BaseTextBox" type="float" wrap="flex-shrink-0" style="width: 100px" placeholder="Float" />
        <BaseTextBox v-model="formData.name" label="BaseTextBox" :nullable="true" wrap="flex-shrink-0" style="width: 100px" placeholder="Nullable" />
        <BaseTextBox v-model="formData.name" label="BaseTextBox" :disabled="true" wrap="flex-shrink-0" style="width: 100px" placeholder="Disable" />
        <BaseTextBox v-model="formData.test" label="BaseTextBox" wrap="flex-shrink-0" style="width: 100px" placeholder="predvyplnene" />
        <BaseTextBox v-model="formData.name" label="" wrap="flex-shrink-0" style="width: 100px" placeholder="S prázdným popiskem" />
        <BaseTextBox v-model="formData.name" wrap="flex-shrink-0" style="width: 100px" placeholder="Bez popisku" />
        <BaseForm :input="formData">
          <BaseTextBox name="test2" wrap="flex-shrink-0" style="width: 100px" placeholder="S formulářem" />
          <BaseTextBox name="test2" wrap="flex-shrink-0" style="width: 100px" placeholder="S formulářem" />
        </BaseForm>-->
        <div class="flex-shrink-0" style="line-height: 29px;">Value: {{ formData.name }} (null: {{ formData.name === null ? 'ano' : 'ne' }})</div>
      </div>
      <div class="d-flex gap-1">
        <BaseTextArea v-model="formData.name" label="BaseTextArea" wrap="flex-shrink-0" placeholder="Standartní" />
        <BaseTextArea v-model="formData.name" label="BaseTextArea" wrap="flex-shrink-0" :nullable="true" placeholder="Nullable" />
        <BaseForm :input="formData">
          <BaseTextArea label="BaseTextArea" name="test2" placeholder="S formulářem" />
        </BaseForm>
        <div class="flex-shrink-0" style="line-height: 29px;">Value: {{ formData.name }} (null: {{ formData.name === null ? 'ano' : 'ne' }}) | Test2: {{ formData.test2 }}</div>
      </div>
      <div class="d-flex gap-1">
        <BaseSelect v-model="formData.gender" label="BaseSelect" prompt="Choose" wrap="flex-shrink-0" :options="{'male': 'muz', 'female' : 'zena'}" />
        <BaseForm :input="formData">
          <BaseSelect label="BaseSelect" name="gender" prompt="Choose" wrap="flex-shrink-0" :options="{'male': 'muz', 'female' : 'zena'}" />
        </BaseForm>
        <div class="flex-shrink-0" style="line-height: 29px;">Value: {{ formData.gender }} (null: {{ formData.gender === null ? 'ano' : 'ne' }})</div>
      </div>
      <div class="d-flex gap-1">
        <BaseCheckBox v-model="formData.hidden" label="BaseCheckBox" wrap="flex-shrink-0" />
        <BaseCheckBox v-model="formData.hidden" wrap="flex-shrink-0" />
        <BaseForm :input="formData">
          <BaseCheckBox label="BaseCheckBox" name="hidden" wrap="flex-shrink-0" />
        </BaseForm>
        <div class="flex-shrink-0" style="line-height: 29px;">Value: {{ formData.hidden }} (null: {{ formData.hidden === null ? 'ano' : 'ne' }})</div>
      </div>
      <div class="d-flex gap-1">
        <BaseRadioBox v-model="formData.gender" :options="{'male': 'muz', 'female' : 'zena'}" />
        <BaseForm :input="formData">
          <BaseRadioBox name="gender" :options="{'male': 'muz', 'female' : 'zena'}" />
        </BaseForm>
        <div class="flex-shrink-0" style="line-height: 29px;">Value: {{ formData.gender }} (null: {{ formData.gender === null ? 'ano' : 'ne' }})</div>
      </div>
      <div class="d-flex gap-2">
        <BaseMultiSelect v-model="formData.gender" label="BaseMultiSelect" wrap="flex-shrink-0" :options="{'male': 'muz', 'female' : 'zena'}" />
        <BaseForm :input="formData">
          <BaseMultiSelect label="BaseMultiSelect" wrap="flex-shrink-0" name="gender" :options="{'male': 'muz', 'female' : 'zena'}" />
        </BaseForm>

        <BaseMultiSelect v-model="formData.colors" label="BaseMultiSelect (Multi)" :multiple="true" wrap="flex-shrink-0" :options="{'red': 'cervena', 'blue' : 'modra', 'green' : 'zelena'}" />


        <BaseMultiSelect v-model="formData.company" label="BaseMultiSelect" wrap="flex-shrink-0" options-url="customer" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />
        <BaseMultiSelect v-model="formData.company" label="BaseMultiSelect" wrap="flex-shrink-0" :async="true" options-url="customer" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />

        <div class="flex-shrink-0" style="line-height: 29px;">Value: {{ formData.colors }} (null: {{ formData.colors === null ? 'ano' : 'ne' }})</div>
        <div class="flex-shrink-0" style="line-height: 29px;">Value: {{ formData.company }} (null: {{ formData.company === null ? 'ano' : 'ne' }})</div>
        https://github.com/shentao/vue-multiselect/tree/next
      </div>
      <div class="d-flex gap-1">
        <BaseFileBox />
      </div>
      <div class="d-flex gap-1">
        <BaseImageBox :max-upload-size="2" :max-files="3" />
      </div>
    </BaseCard>
    <BaseCard wrap="col-lg-6">
      <template #header>Validace</template>
      <div class="d-flex gap-1">
        <BaseTextBox v-model="formData.validation1" label="BaseTextBox" :validation="v$.validation1 as BaseValidation" wrap="flex-shrink-0" style="width: 100px" placeholder="Standartní" />
        <BaseTextArea v-model="formData.validation1" label="BaseTextArea" wrap="flex-shrink-0" :validation="v$.validation1 as BaseValidation" placeholder="Standartní" />
        <BaseSelect v-model="formData.gender2" prompt="-zvolte-" :options="{'male': 'muz', 'female' : 'zena'}" wrap="flex-shrink-0" :validation="v$.gender2 as BaseValidation" />
        <BaseRadioBox v-model="formData.gender2" :options="{'male': 'muz', 'female' : 'zena'}" :validation="v$.gender2 as BaseValidation" />
        <BaseMultiSelect v-model="formData.gender2" label="BaseMultiSelect" wrap="flex-shrink-0" :options="{'male': 'muz', 'female' : 'zena'}" :validation="v$.gender2 as BaseValidation" />
        <BaseButton class="btn-success" @click="v$.$validate()">Zvalidovat</BaseButton> Valid: {{ !v$.$invalid }}
        <BaseForm :input="formData" :rules="rules">
          <BaseTextBox label="BaseTextBox" name="validation2" wrap="flex-shrink-0" style="width: 100px" placeholder="Standartní" />
        </BaseForm>

        <div class="flex-shrink-0" style="line-height: 29px;">Value1: {{ formData.validation1 }}, Value2: {{ formData.validation2 }}</div>
      </div>
    </BaseCard>
  </div>
  <div class="row">
    <BaseCard wrap="col-lg-6">
      <template #header>Jazyky</template>
      <div class="d-flex gap-1">
        <BaseTextBox v-model="formData.name" :locale="true" label="BaseTextBox" lang="cz" wrap="flex-shrink-0" style="width: 100px" placeholder="Standartní" />
        <BaseTextArea v-model="formData.name" label="BaseTextArea" lang="cz" wrap="flex-shrink-0" placeholder="Standartní" />
        <BaseSelect v-model="formData.gender2" label="BaseSelect" lang="cz" prompt="-zvolte-" :options="{'male': 'muz', 'female' : 'zena'}" wrap="flex-shrink-0" />
        <BaseRadioBox v-model="formData.gender2" lang="cz" :options="{'male': 'muz', 'female' : 'zena'}" />
        <BaseMultiSelect v-model="formData.gender2" label="BaseMultiSelect" lang="cz" wrap="flex-shrink-0" :options="{'male': 'muz', 'female' : 'zena'}" />
        <BaseForm :input="formData" lang="cz">
          <BaseTextBox label="BaseTextBox" name="validation2" wrap="flex-shrink-0" style="width: 100px" placeholder="Ve formu" />
        </BaseForm>
      </div>
      <div class="d-flex align-items-center flex-wrap gap-1 grid-filter">
        <div class="flex-shrink-0">
          <BaseLanguageDropdown :lang="lang" :langs="['it', 'cz', 'gb']" @select="lang = $event" />
          <BaseLanguageDropdown class="btn-xs" :lang="lang" :langs="['it', 'cz', 'gb']" @select="lang = $event">Zvolte jazyk: </BaseLanguageDropdown>
        </div>
      </div>
    </BaseCard>
    <BaseCard wrap="col-lg-6">
      <template #header>Formuláře</template>
      <div class="d-flex gap-1">
        <BaseForm :input="formData" lang="cz" :disabled="true" wrap="flex-shrink-0">
          <BaseTextBox label="BaseTextBox" name="name" wrap="flex-shrink-0" style="width: 150px" placeholder="defaultni hodnoty" />
        </BaseForm>
        <BaseForm :input="formData" :omit="['name']" wrap="flex-shrink-0">
          <BaseTextBox label="BaseTextBox" name="name" wrap="flex-shrink-0" style="width: 150px" placeholder="vynechani" />
        </BaseForm>
        <BaseForm :input="formData" wrap="flex-shrink-0" @submit.stop="toast.info('Odesilam.')">
          <BaseTextBox label="BaseTextBox" name="name" wrap="flex-shrink-0" style="width: 150px" placeholder="bez backendu" />
          <BaseFormButton class="btn-primary" wrap="flex-shrink-0">Uložit</BaseFormButton>
        </BaseForm>
        <BaseForm :input="formData" url="customer" :silent="true" wrap="flex-shrink-0" @error="toast.error('Vlastni error.')">
          <BaseTextBox label="BaseTextBox" name="name" wrap="flex-shrink-0" style="width: 150px" placeholder="tichý" />
          <BaseFormButton class="btn-primary" wrap="flex-shrink-0">Uložit</BaseFormButton>
        </BaseForm>
        <BaseForm :input="formData" url="customer" wrap="flex-shrink-0">
          <BaseTextBox label="BaseTextBox" name="name" wrap="flex-shrink-0" style="width: 150px" placeholder="vlozeni" />
          <BaseFormButton class="btn-primary" wrap="flex-shrink-0">Uložit</BaseFormButton>
        </BaseForm>
        <BaseForm :input="formData" url="customer" slug="1" wrap="flex-shrink-0">
          <BaseTextBox label="BaseTextBox" name="name" wrap="flex-shrink-0" style="width: 150px" placeholder="uprava" />
          <BaseFormButton class="btn-primary" wrap="flex-shrink-0">Uložit</BaseFormButton>
        </BaseForm>
      </div>
    </BaseCard>
  </div>
  <div class="row">
    <BaseCard wrap="col-lg-6">
      <template #header>Taby</template>
      <BaseTabs :active="activeTab" :tabs="{'accepted': 'Přijaté', 'sent': 'Odeslané', 'canceled': 'Stornované'}" @select="activeTab=$event">
        <i>|{{ activeTab }}| Tohle se zobrazi nad obsahem, dokumentace k dynamickym slotum: https://vuejs.org/guide/components/slots.html#dynamic-slot-names</i><br>
        <template #accepted>Obsah tabu Přijaté</template>
        <template #sent>Obsah tabu Odeslané</template>
        <template #canceled>Obsah tabu Stornované</template>
      </BaseTabs>
      <BaseTabs :active="activeTab" :tabs="{'accepted': 'Přijaté', 'sent': 'Odeslané', 'canceled': 'Stornované'}" @select="activeTab=$event">
        <i>Dynamicky tabs</i><br>
        <template #[activeTab]>Obsah tabu {{ activeTab }}</template>
      </BaseTabs>

      <BaseTabs :active="$route.name" :tabs="{'customers': 'Zakaznici', 'producers': 'Výrobci', 'developer': 'Developer'}" @select="navigateTo($event)" />
      Taby jako navigace
    </BaseCard>
    <BaseCard wrap="col-lg-6">
      <template #header>Highlights</template>
      <div class="row">
        <BaseHighlight wrap="col-xl-4" heading="Total Orders" subheading="Last year expenses" class="bg-secondary text-white">1896</BaseHighlight>
        <BaseHighlight wrap="col-xl-4" icon="metismenu-icon pe-7s-users" heading="Followers" subheading="People Hub" class="bg-night-sky text-white">56 Kč</BaseHighlight>
        <BaseHighlight wrap="col-xl-4" heading="Followers" subheading="People Interested" class="bg-light">46%</BaseHighlight>
      </div>
    </BaseCard>
  </div>
  <div class="row">
    <BaseCard wrap="col-lg-6">
      <template #header>Tabulky</template>
      <BaseGrid url="customer" :on-page="5">
        <template #header>
          <tr>
            <BaseGridThSelect />
            <BaseGridTh>#</BaseGridTh>
            <BaseGridTh order-by="company">Název</BaseGridTh>
          </tr>
        </template>
        <template #body="{item, selected}">
          <tr :class="{'inactive': item.id === 5, 'active': selected}">
            <BaseGridTdSelect :id="item.uuid" />
            <td class="minimal">test</td>
            <td>{{ item.company }}</td>
          </tr>
        </template>
      </BaseGrid>
    </BaseCard>
    <BaseCard wrap="col-lg-6">
      <template #header>Tabulky</template>
      <BaseFilter @cancel="filters={}">
        <BaseTextBox v-model="filters.q" wrap="flex-shrink-0" placeholder="Název, kód, #id" type="text" />
      </BaseFilter>
      <BaseGrid url="customer" :page="page" :on-page="onPage" :filters="filters">
        <template #header>
          <tr>
            <BaseGridThSelect />
            <BaseGridTh>#</BaseGridTh>
            <BaseGridTh order-by="company">Název</BaseGridTh>
            <BaseGridTh />
          </tr>
        </template>
        <template #body="{item, selected, deleteRow}">
          <tr :class="{'inactive': item.id === 5, 'active': selected}">
            <BaseGridTdSelect :id="item.uuid" />
            <td class="minimal"><BaseButtonEdit class="btn-xs" /></td>
            <td>{{ item.company }}</td>
            <td class="minimal"><BaseButtonDelete class="btn-xs" :confirmation="true" @confirm="deleteRow();" /></td>
          </tr>
        </template>
        <template #footer="{deleteRows, exportRows, selectedCount, disabledControls, action, asyncAction}">
          <BaseGridSelectAll wrap="flex-shrink-0 me-1 ms-1" />
          <BaseGridPaginator v-slot="{ totalCount }" wrap="flex-shrink-0" url="customer" :page="page" :on-page="onPage" :filters="filters" @change-page="page = $event" @change-on-page="onPage = $event; page = 1;">
            <BaseButton class="btn-outline-primary btn-paging" :disabled="disabledControls" @click="action(() => toast.info('aaa'));"><i class="fa fa-plus" /> custom ({{ selectedCount(totalCount) }})</BaseButton>
            <BaseButton class="btn-outline-primary btn-paging" :disabled="disabledControls" @click="asyncAction(test())"><i class="fa fa-plus" /> custom ({{ selectedCount(totalCount) }})</BaseButton>
            <BaseButtonEdit class="btn-paging" :outline="true" :disabled="disabledControls" @click="$refs.modal3.open();">({{ selectedCount(totalCount) }})</BaseButtonEdit>
            <BaseButtonExport class="btn-paging" :outline="true" :disabled="disabledControls" @click="exportRows();">({{ selectedCount(totalCount) }})</BaseButtonExport>
            <BaseButtonDelete class="btn-paging" :outline="true" :disabled="disabledControls" :confirmation="true" @confirm="deleteRows();">({{ selectedCount(totalCount) }})</BaseButtonDelete>
          </BaseGridPaginator>
        </template>
      </BaseGrid>
      <BaseModal ref="modal3" title="Modal 3">
        <BaseForm :input="formData">
          <BaseSelect :options="{'1': 'puvodni', '2': 'nahradit', '3': 'pridat', '4': 'odebrat'}" /><BaseTextBox label="BaseTextBox" name="name" wrap="flex-shrink-0" style="width: 150px" placeholder="uprava" />
          <BaseFormButton class="btn-primary" wrap="flex-shrink-0">Uložit</BaseFormButton>
        </BaseForm>
      </BaseModal>
    </BaseCard>
  </div>
  <BaseCard>
    <template #header>Image preview</template>
    <button @click="show(0)">show</button>
    <div class="">
      <div
        v-for="(src, index) in imgs"
        :key="index"
        class="pic"
        @click="() => show(index)"
      >
        <img :src="src">
      </div>
    </div>
    <vue-easy-lightbox
      teleport="body"
      :visible="visibleRef"
      :move-disabled="true"
      :rotate-disabled="true"
      :pinch-disabled="true"
      :zoom-disabled="true"
      :mask-closable="true"
      :loop="true"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
    />
  </BaseCard>
  <BaseCard>
    <template #header>Strom</template>

    <Tree :nodes="nodes" :config="treeConfig" />
  </BaseCard>
</template>
<script setup lang="ts">
import {ToastPluginApi, useToast} from "vue-toast-notification";
import VueEasyLightbox, { useEasyLightbox } from 'vue-easy-lightbox';
import Tree from "vue3-treeview";
import "vue3-treeview/dist/style.css";
import {required} from "@vuelidate/validators";
import useVuelidate, {BaseValidation} from "@vuelidate/core";

const config = useRuntimeConfig();

const toast: ToastPluginApi = inject('toast', useToast());

const { $user } = useNuxtApp();

const activeTab: Ref<string> = ref('accepted');
const formData: Ref<any> = ref({gender: 'female', gender2: null, hidden: true, colors: ['green'], company: null, test: 'test'});

const rules = {
  validation1: { required },
  validation2: { required },
  gender2: { required },
};


const filters: any = ref({});
const page = ref(1);
const onPage = ref(5);
const lang = ref('cz');

const v$: Ref<BaseValidation> = useVuelidate(rules, formData, {$autoDirty: true});

function test() {
  return $fetch(config.public.baseURL + 'customer');
}

const imgs = [
  'http://via.placeholder.com/250x150',
  'http://via.placeholder.com/300x150',
  'http://via.placeholder.com/350x150',
];

const { show, onHide, visibleRef, indexRef, imgsRef} = useEasyLightbox({imgs: imgs, initIndex: 0});

const treeConfig = ref({
  roots: ["id1", "id2"],
  checkboxes: true,
  checkMode: 1,
});
const nodes = ref({
  id1: {
    text: "text1",
      children: ["id11", "id12"],
  },
  id11: {
    text: "text11",
  },
  id12: {
    text: "text12",
  },
  id2: {
    text: "text2",
  },
});

</script>