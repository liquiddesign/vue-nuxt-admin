<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label !== null" :for="$attrs['id']">
      {{ label }}
    </label>
    <slot v-if="custom" />
    <template v-else>
      <div class="row">
        <BaseTextBox :id="elId" :name="name ? name + '.street' : 'street'" wrap="col-lg-12" label="Ulice" type="text" />
      </div>
      <div class="row mt-2">
        <BaseTextBox :name="name ? name + '.city' : 'city'" wrap="col-lg-8" label="Město" type="text" />
        <BaseTextBox :name="name ? name + '.zipcode' : 'zipcode'" wrap="col-lg-4" label="PSČ" type="text" />
      </div>
    </template>
  </BaseWrapper>
</template>

<script setup lang="ts">
import {inject} from 'vue';
import {useGoogleMaps} from '~/composables/useGoogleMaps';

const props = defineProps({
  wrap: {type: String, default: ''},
  custom: {type: Boolean, default: false},
  label: {type: String, default: ''},
  name: {type: String, default: ''},
  elId: {type: String, default: 'street'},
  googleComplete: {type: Boolean, default: true},
});

const elStreet: Ref<any> = ref(null);
const { address, initAutocomplete } = useGoogleMaps();
const form: any = inject('form', null) as any;

watch(address.value, (newAddress: any) => {
  form.updateInput(props.name ? props.name + '.street' : 'street', newAddress.street);
  form.updateInput(props.name ? props.name + '.city' : 'city', newAddress.city);
  form.updateInput(props.name ? props.name + '.zipcode' : 'zipcode', newAddress.zipcode);
});

onMounted(() => {
  elStreet.value = document.getElementById(props.elId);
  if (props.googleComplete) {
    initAutocomplete(elStreet.value);
  }
});

</script>