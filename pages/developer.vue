<template>
  <BaseCard>
    Karta jen s tělem
  </BaseCard>
  <BaseCard>
    <template #header>Hlavička</template>
    <template #body>Tělo</template>
    <template #footer>Patička</template>
  </BaseCard>
  <BaseCard>
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
  <BaseCard>
    <template #header>Flash zprávy</template>
    <BaseButton class="btn-outline-success" @click="toast.success('OK')">OK</BaseButton>
    <BaseButton class="btn-outline-primary ms-2" @click="toast.info('INFO')">INFO</BaseButton>
    <BaseButton class="btn-outline-danger ms-2" @click="toast.error('ERROR')">ERROR</BaseButton>
  </BaseCard>
  <BaseCard>
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
  <BaseCard>
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
  </BaseCard>
  <BaseCard>
    <template #header>Formulářové prvky</template>
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
</template>
<script setup lang="ts">
import {ToastPluginApi, useToast} from "vue-toast-notification";

const toast: ToastPluginApi = inject('toast', useToast());

</script>