<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'dashboards'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
      <BaseLanguageList :langs="settings.langs" :lang="lang" @select="lang = $event" />
    </template>
    <template #body>
      <BaseTabs class="col-xl-6 col-lg-12" :active="activeTab" :tabs="{'main': 'Hlavní údaje', 'content': 'Obsah', 'price': 'Ceny a viditelnost'}" @select="activeTab = $event" />
      <BaseCard wrap="col-lg-12">
        <div v-show="activeTab === 'main'">
          <TestDetailFormMain :data="formData" :lang="lang" />
        </div>
        <div v-show="activeTab === 'content'">
          <TestDetailFormContent :data="formData" :lang="lang" />
        </div>
        <div v-show="activeTab === 'price'">
          <TestDetailFormPrice :data="formData" :lang="lang" />
        </div>
      </BaseCard>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
const activeTab: Ref<string> = ref('main');
const { settings } = useUser();
const lang: Ref<string> = ref(settings.value.defaultLang);

const formData = {
  name: {
    cs: 'cs jmeno produktu',
    en: 'en product name',
  },
  amount: '60c1c90d2a7b733103623874',
  delivery: '608bd7db8d47899796692293',
  label: {
    cs: 'Záslepka pro konektor RJ45 černá. 100ks',
    en: 'Plug for RJ45 connector black. 100pcs',
  },
  detail: {
    cs: 'Toto příslušentsví slouží k zaslepení portů RJ45 na zásuvce nebo patch panelu tak, aby do těchto komponent strukturované kabeláže zbytečně nepronikal prach nebo jiné nečitosty. Záslepky Solarix se prodávají v černé barvě.\n' +
        'Prodává se po 100ks',
    en: 'This accessory is used to blind the RJ45 ports on the socket or patch panel so that dust or other debris does not unnecessarily penetrate these components of the structured cabling. Solarix plugs are sold in black.\n' +
        'Sold in packs of 100',
  },
  visibility: {
    abel: {
      uuid: 'abel',
      systemicLock: 1,
      name: 'ABEL',
      code: 'abel',
      priority: 10,
      active: false,
      recommended: true,
      hidden: false,
      id: 1,
      shop: 'abel',
    },
    rt: {
      uuid: 'rt',
      systemicLock: 1,
      name: 'RT',
      code: 'rt',
      priority: 10,
      active: false,
      recommended: true,
      hidden: false,
      id: 2,
      shop: 'rt',
    },
  },
  discount: 0,
  dph: 21,
  vat: null,
  pricelist: {
    1: {
      uuid: '000fe2097249a79e4c1d63292982df10',
      price: 2805,
      priceVat: 3394.05,
      priceBefore: null,
      priceVatBefore: null,
      hidden: false,
      createdTs: '2024-04-17 14:36:42',
      id: 1,
      product: 'b36a157651a79bfb6a44f653cdf9dc85',
      pricelist: {
        uuid: 'a2c73a0093bc0468b496902f25afeef9',
        code: 'qiBaseListed',
        name: 'QI (Zalistované, základní cena)',
      },
    },
    2: {
      uuid: '001006c53d2447d8b225e841837ec004',
      price: 4185,
      priceVat: 5063.85,
      priceBefore: null,
      priceVatBefore: null,
      hidden: false,
      createdTs: '2024-08-23 03:53:03',
      id: 2,
      product: '6492dc34cdcf582383010759',
      pricelist: {
        uuid: 'e2bc8ad65531763b110d61b9e0065521',
        code: 'qiBase',
        name: 'QI (Základní cena)',
      },
    },
    3: {
      uuid: '0015110a4a05794518a3cfbd8786ada2',
      price: 1097,
      priceVat: 1327.37,
      priceBefore: null,
      priceVatBefore: null,
      hidden: false,
      createdTs: '2025-01-10 06:04:43',
      id: 3,
      product: '6492dc2cdef7925777249087',
      pricelist: {
        uuid: '6669555d87bff73846623283',
        code: 'Qi-080648',
        name: 'Qi - CKP Diakonie ČCE - středisko Západní Čechy, Plzeň',
      },
    },
  },
};
</script>