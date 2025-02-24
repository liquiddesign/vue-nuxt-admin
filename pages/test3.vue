<template>
  <input ref="el"> {{ unmasked }} | {{ masked }}

  <Save stroke-width="1" size="20" />
  <vue-tel-input v-model="test" @on-input="updatePhone" />
{{ test }} | {{ full }}
</template>

<script setup lang="ts">

import { useIMask } from 'vue-imask';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import { Save } from 'lucide-vue-next';

const test = ref('');
const full = ref('');

const { el, masked, unmasked } = useIMask({
  mask: 'Kč num',
  blocks: {
    num: {
      // nested masks are available!
      mask: Number,
      thousandsSeparator: ' ',
    },
  },
}, {defaultValue: ''});


const updatePhone = (number, phoneObject) => {
  console.log(number);
  console.log(phoneObject.number);
  console.log(phoneObject.valid);

};

</script>