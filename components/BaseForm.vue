<template>
  <BaseWrapper :wrap="wrap">
    <!--{{ v$.test?.$each?.$invalid }}-->
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
    lang?: string,
    url?: string|null,
    slug?: string|RouteParamValue[]|null,
    method?: string,
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


  const config = useRuntimeConfig();
  const v$:any = useVuelidate(props.rules, props.data);
  const toast: ToastPluginApi = inject('toast', useToast());
  const pending: Ref<boolean> = ref(false);

  function updateInput(path: string, value: any) {
    _set(props.data, path, value);
    _get(v$.value, path)?.$touch();
  }

  const disabled = computed(() => {
    return props.disabled;
  });

  const loading = computed(() => {
    return props.loading;
  });

  const lang = computed(() => {
    return props.lang;
  });

  const dirty: Ref<boolean> = ref(false);

  watch(props.data, () => {
    if (!props.loading) {
      dirty.value = true;
    }
  });

  provide('form', {
    name: props.name,
    lang: lang,
    disabled: disabled || loading || pending,
    loading: loading,
    pending: pending,
    dirty: dirty,
    input: props.data,
    validation: v$,
    updateInput,
  });



  defineExpose({submit, disabled, pending, dirty, v$});
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

      $fetch(config.public.baseURL + (props.slug !== null ?  props.url + '/' + props.slug : props.url), {body: inputs, params: props.params, method: props.method !== undefined ? props.method: (props.slug !== null ? 'PATCH' : 'POST')})
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