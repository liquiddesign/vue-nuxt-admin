<script setup lang="ts">
import {RouteParamValue} from 'vue-router';

withDefaults(defineProps<{
  url: string,
  data: any,
  lang: string,
  loading?: boolean,
  slug?: string|RouteParamValue[],
}>(), { loading: false, slug: undefined });
</script>

<template>
  <BaseForm ref="form" :url="url" :lang="lang" :data="data" :slug="slug" :loading="loading">
    <h5 class="card-title">HLAVNÍ ÚDAJE</h5>
    <BaseTextBox :wrap="'col-3 row flex-nowrap'" :label="'Popisek'" :type="'text'" locale />
    <BaseTextBox :wrap="'col-3 row flex-nowrap mt-2'" :label="'Priorita'" :type="'number'" required />
    <BaseMultiSelect :wrap="'col-3 row flex-nowrap mt-2'" :label="'Přednastavené doručení'" :type="'text'" options-url="eshop/display-delivery?property=label" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
  </BaseForm>
</template>