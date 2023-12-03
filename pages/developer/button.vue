<template>
  <BaseCard wrap="col-lg-12">
    <h3>Tlačítko</h3>
    <p>The <code>va-button</code> component replaces the standard HTML button. It offers multiple built-in style presets and allows user to change different attributes (size, color, opacity etc.) manually.</p>

    <h5>1. Velikosti</h5>
    <p>Velikosti jsou tři</p>
    <BaseCard wrap="col-lg-12">
      <BaseButton class="btn-primary" @click="select">Velké tlačítko</BaseButton> <br>

      <template #footer>
        <div class="pb-2" style="display: block; width: 100%;">

          <BaseButton class="btn-alternate btn-xs me-2" @click="test = !test;"><i class="fa fa-code"></i> Kód</BaseButton>
          <BaseButton class="btn-alternate btn-xs" @click="select"><i class="fa fa-copy"></i> Kopírovat</BaseButton>
        <code ref="code" v-if="test" style="background-color: ghostwhite; display: block" class="p-3 mt-2">
          {{ '<BaseButton class="btn-primary">Velké tlačítko</BaseButton>' }}
        </code>
        <code ref="code"  v-if="test"  style="background-color: ghostwhite; display: block" class="p-3 mt-2">
          {{ '<BaseButton class="btn-primary">Velké tlačítko</BaseButton>' }}
        </code>
        </div>
      </template>
    </BaseCard>

    <h5>2. Druhy</h5>
    <p>Velikosti jsou tři</p>
    <BaseCard wrap="col-lg-12">
      <BaseButton class="btn-primary" @click="select">Velké tlačítko</BaseButton> <br>

      <template #footer>
        <div class="pb-2" style="display: block; width: 100%;">

          <BaseButton class="btn-alternate btn-xs me-2" @click="test = !test;"><i class="fa fa-code"></i> Kód</BaseButton>
          <BaseButton class="btn-alternate btn-xs" @click="select"><i class="fa fa-copy"></i> Kopírovat</BaseButton>
          <code ref="code" v-if="test" style="background-color: ghostwhite; display: block" class="p-3 mt-2">
            {{ '<BaseButton class="btn-primary">Velké tlačítko</BaseButton>' }}
          </code>
          <code ref="code"  v-if="test"  style="background-color: ghostwhite; display: block" class="p-3 mt-2">
            {{ '<BaseButton class="btn-primary">Velké tlačítko</BaseButton>' }}
          </code>
        </div>
      </template>
    </BaseCard>

  </BaseCard>
</template>
<script setup lang="ts">

const code = ref(null);
const test = ref(false);

function select() {
  window.getSelection().removeAllRanges()

    let div = document.createRange();
    div.setStartBefore(code.value);
    div.setEndAfter(code.value);

    window.getSelection().addRange(div);
    navigator.clipboard.writeText( window.getSelection().toString());
}
</script>