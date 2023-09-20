<template>
  <BaseWrapper :wrap="wrap">
    <form v-bind="$attrs" @submit.prevent="submit">
      <slot />
    </form>
  </BaseWrapper>
</template>

<script setup lang="ts">
import {withDefaults, inject, Ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {ToastPluginApi, useToast} from "vue-toast-notification";
import {RouteParamValue} from "vue-router";

  const props = withDefaults(defineProps<{
    name?: string,
    url: string,
    slug?: string|RouteParamValue[]|null,
    input: any | null,
    disabled?: boolean,
    rules?: any,
    omit?: string[],
    wrap?: string,
    silent?: boolean,
  }>(), {
    name: 'frm',
    slug: null,
    disabled: false,
    rules: {},
    omit: () => [],
    silent: false,
    wrap: undefined,
  });


  const config = useRuntimeConfig();
  const v$:any = useVuelidate(props.rules, props.input ?? {});
  const toast: ToastPluginApi = inject('toast', useToast());
  const pending: Ref<boolean> = ref(false);

  function updateInput(path: string, value: any, convert: string|null = null, nullable: boolean = false) {
    if (nullable && value === '') {
      value = null;
    }

    if (convert === 'number') {
      value = parseInt(value);
    }

    if (convert === 'float') {
      value = parseFloat(value);
    }

    _set(props.input, path, value);
    _get(v$.value, path)?.$touch();
  }

  const disabled = computed(() => {
    return props.disabled;
  });

  provide('form', {
    name: props.name,
    disabled: disabled,
    pending: pending,
    input: props.input,
    validation: v$,
    updateInput,
  });

  defineExpose({submit, disabled, pending});
  const emit = defineEmits(['success', 'error']);

  function submit() {
    v$.value.$touch();

    const inputs = Object.assign({}, props.input);
    props.omit.forEach((val) => {
      delete inputs[val];
    })

    if (!v$.value.$invalid && !props.disabled) {
      pending.value = true;
      $fetch(config.public.baseURL + (props.slug !== null ?  props.url + '/' + props.slug : props.url), {body: inputs, method: props.slug !== null ? 'PATCH' : 'POST'})
        .then((result) => {
          emit('success', result);
          props.silent || toast.success('Uloženo');

        }).catch((error) => {
          emit('error', error);
          props.silent || toast.error(error.message);
        }).finally(() => {
          pending.value = false;
        });

      v$.value.$reset();
    }
  }

</script>