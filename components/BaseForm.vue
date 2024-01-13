<template>
  <BaseWrapper :wrap="wrap">
    <!--{{ v$.test?.$each?.$invalid }}-->
    <form v-bind="$attrs" @submit.prevent="submit">
      <slot />
    </form>
  </BaseWrapper>
</template>

<script setup lang="ts">
import {withDefaults, inject, Ref} from 'vue';
import useVuelidate from '@vuelidate/core';
import {ToastPluginApi, useToast} from 'vue-toast-notification';
import {RouteParamValue} from 'vue-router';
import {HTTPMethod} from 'h3';

  const props = withDefaults(defineProps<{
    name?: string,
    lang?: string,
    url?: string|null,
    slug?: string|RouteParamValue[]|null,
    method?: HTTPMethod,
    data: any | null,
    loading?: boolean,
    disabled?: boolean,
    params?: any,
    rules?: any,
    omit?: string[],
    wrap?: string,
    silent?: boolean,
  }>(), {
    name: 'frm',
    lang: undefined,
    url: null,
    method: undefined,
    slug: null,
    loading: false,
    disabled: false,
    params: {},
    rules: {},
    omit: () => [],
    silent: false,
    wrap: undefined,
  });

  const input = computed(() => { return props.data; });
  const config = useRuntimeConfig();
  const v$:any = useVuelidate(props.rules, input);
  const dirty: Ref<boolean> = ref(false);

  const toast: ToastPluginApi = inject('toast', useToast());
  const pending: Ref<boolean> = ref(false);

  function updateInput(path: string, value: any) {
    dirty.value = true;
    _set(props.data, path, value);
    _get(v$.value, path)?.$touch();
  }

  const disabled = computed(() => {
    return props.disabled || props.loading || pending.value;
  });

  const loading = computed(() => {
    return props.loading;
  });

  const lang = computed(() => {
    return props.lang;
  });

  provide('form', {
    name: props.name,
    lang: lang,
    disabled: disabled,
    loading: loading,
    pending: pending,
    dirty: dirty,
    data: input,
    validation: v$,
    updateInput,
  });

  function getDynamicErrors(container: string, index: string|number, property: string)
  {
    return v$.value[container]?.$each.$response.$errors[index][property];
  }


defineExpose({submit, disabled, pending, dirty, v$, getDynamicErrors});
  const emit = defineEmits(['success', 'error']);


  function submit() {
    v$.value.$touch();

    const inputs = Object.assign({}, props.data);
    props.omit.forEach((val) => {
      delete inputs[val];
    });

    // @TODO: wait validate -> or valid by rules to avoid multiple form on one page
    if (!v$.value.$invalid && !props.disabled && props.url) {
      pending.value = true;

      $fetch(config.public.baseURL + (props.slug !== null ?  props.url + '/' + props.slug : props.url), {body: inputs, params: props.params, method: props.method !== undefined ? props.method : (props.slug !== null ? 'PATCH' : 'POST')})
        .then((result) => {
          emit('success', result);
          props.silent || toast.success('Uloženo');

        }).catch((error) => {
          console.error(error);
          emit('error', error);
          props.silent || toast.error(error.message);
        }).finally(() => {
          pending.value = false;
        });

      v$.value.$reset();
    }
  }

</script>