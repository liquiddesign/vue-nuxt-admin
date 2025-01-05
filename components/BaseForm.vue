<template>
  <BaseWrapper :wrap="wrap">
    <form v-bind="$attrs" @submit.prevent="submit">
      <slot />
    </form>
  </BaseWrapper>
</template>

<script setup lang="ts">
import { inject, computed, ref, provide } from 'vue';
import useVuelidate from '@vuelidate/core';
import { ToastPluginApi, useToast } from 'vue-toast-notification';
import { RouteParamValue } from 'vue-router';
import { useLiveFeed } from '@/composables/useLiveFeed';

const props = withDefaults(
    defineProps<{
      name?: string;
      lang?: string;
      url?: string | null;
      slug?: string | RouteParamValue[] | null;
      method?: 'GET' | 'POST' | 'PUT'  | 'DELETE' | 'PATCH';
      data: any | null;
      loading?: boolean;
      disabled?: boolean;
      params?: any;
      rules?: any;
      omit?: string[];
      wrap?: string;
      silent?: boolean;
      liveFeed?: boolean;
    }>(),
    {
      name: 'frm',
      lang: undefined,
      url: null,
      method: 'POST',
      slug: null,
      loading: false,
      disabled: false,
      params: {},
      rules: {},
      omit: () => [],
      silent: false,
      wrap: undefined,
      liveFeed: true,
    }
);

const input = computed(() => props.data);
const v$: any = useVuelidate(props.rules, input);

const dirty = ref(false);
const deleted = ref(false);
const pending = ref(false);

const disabled = computed(() => props.disabled || props.loading || pending.value || deleted.value);
const loading = computed(() => props.loading);
const lang = computed(() => props.lang);

let liveFeedFunctions: any = {};
if (props.liveFeed) {
  liveFeedFunctions = useLiveFeed();
  const { onDelete } = liveFeedFunctions;

  onDelete((id: string) => {
    if (props.slug?.toString() === id) {
      deleted.value = true;
    }
  });
}

const toast: ToastPluginApi = inject('toast', useToast());

function updateInput(path: string, value: any) {
  dirty.value = true;

  const throttle = _throttle(() => {
    if (props.liveFeed && liveFeedFunctions.sendTyping) {
      liveFeedFunctions.sendTyping();
    }
  }, 1000);

  throttle();
  _set(props.data, path, value);
  _get(v$.value, path)?.$touch();
}

function getDynamicErrors(container: string, index: string | number, property: string) {
  return v$.value[container]?.$each.$response.$errors[index][property];
}

function submit() {
  v$.value.$touch();

  const inputs = { ...props.data };
  props.omit.forEach((key) => {
    _unset(inputs, key);
  });

  if (!v$.value.$invalid && !props.disabled && props.url) {
    pending.value = true;

    const url = `${props.slug ? `${props.url}/${props.slug}` : props.url}`;
    const method = props.method || (props.slug ? 'PATCH' : 'POST');

    apiFetch(url, { body: inputs, params: props.params, method, credentials: 'include' })
        .then((result) => {
          emit('success', result);
          if (!props.silent) { toast.success('Uloženo'); }

          if (props.liveFeed) {
            if (props.slug) {
              liveFeedFunctions.sendUpdate(props.slug.toString());
            } else {
              liveFeedFunctions.sendCreated();
            }
          }
        })
        .catch((error) => {
          console.error(error);
          emit('error', error);
          if (!props.silent) { toast.error(error.message); }
        })
        .finally(() => {
          pending.value = false;
        });

    v$.value.$reset();
  }
}

provide('form', {
  name: props.name,
  lang,
  disabled,
  loading,
  pending,
  dirty,
  data: input,
  validation: v$,
  updateInput,
});

defineExpose({ submit, disabled, pending, dirty, v$, getDynamicErrors });

const emit = defineEmits(['success', 'error']);
</script>
