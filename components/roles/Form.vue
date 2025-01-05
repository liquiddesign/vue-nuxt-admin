<template>
  <BaseForm ref="form" url="roles" :data="data" :slug="slug" :loading="loading" :rules="rules" @success="$emit('success', goBack ? null : $event.result); goBack = false">
    <div class="row">
      <div class="col-lg-6">
        <slot name="top" />
        <div class="row">
          <BaseTextBox name="name" wrap="col-lg-8" label="Název" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="description" wrap="col-lg-8" label="Popisek" type="text" />
        </div>
        <div class="row mt-3">
          <div class="col-lg-6">
            <BaseFormButton class="btn-success btn-sm me-1" @click="goBack = true;">Uložit</BaseFormButton>
            <BaseFormButton class="btn-outline-primary me-1 btn-sm" @click="goBack = false;">Uložit a pokračovat</BaseFormButton>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="row">
          <div class="form-wrapper-light mt-1">
            <div v-for="item in menu" :key="item.name">
              <template v-if="!item.route && item.items && item.items.length">
                <h5 class="mt-0 mb-2" style="text-transform: uppercase; font-weight: lighter">
                  <BaseCheckBox :label="item.title" :model-value="areAllSubItemsChecked(item.items)" @change="toggleAllSubItems(item.items, $event.target.checked)" />
                </h5>
                <div class="ms-3">
                  <div v-for="subItem in item.items" :key="subItem.name" class="p-1">
                    <template v-if="!subItem.route && subItem.items && subItem.items.length">
                      <h6 style="text-transform: uppercase; font-weight: lighter" class="mt-0 mb-1 mb-0">
                        <BaseCheckBox :label="subItem.title" :model-value="areAllSubItemsChecked(subItem.items)" @change="toggleAllSubItems(subItem.items, $event.target.checked)" />
                      </h6>
                      <div class="ms-3">
                        <div v-for="nestedItem in subItem.items" :key="nestedItem.name" class="form-check">
                          <BaseCheckBox v-if="nestedItem.route" :label="nestedItem.title" :name="'permissions.' + nestedItem.route" />
                        </div>
                      </div>
                    </template>
                    <template v-if="subItem.route">
                      <BaseCheckBox :label="subItem.title" :name="'permissions.' + subItem.route" />
                    </template>
                  </div>
                </div>
              </template>
            </div>
            <div tabindex="-1" class="dropdown-divider" style="border-color: white;" />
            <div class="ps-2 pt-2">
              <div v-for="routeItem in routeItems" :key="routeItem.name" class="form-check">
                <BaseCheckBox :label="routeItem.title" :name="'permissions.' + routeItem.name" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseForm>
</template>

<script setup lang="ts">

import {required} from '@vuelidate/validators';
import {RouteParamValue} from 'vue-router';
import menu, {MenuItem} from '~/utils/Menu';

const router = useRouter();
const routes = router.getRoutes();

const props = withDefaults(defineProps<{
  data: any,
  loading?: boolean,
  slug?: string|RouteParamValue[],
}>(), { loading: false, slug: undefined });

const rules = {
  name: { required },
};

const form = ref(null);
const goBack: Ref<boolean> = ref(false);


const toggleAllSubItems = (items: MenuItem[], checked: boolean) => {

  items.forEach((item: MenuItem) => {
    if (item.route) {
      console.log(item.route);
      props.data.permissions[item.route] = checked;
    }
    if (item.items && item.items.length) {
      toggleAllSubItems(item.items, checked);
    }
  });
};

const areAllSubItemsChecked = (items: MenuItem[]): boolean => {
  return items.every((item: MenuItem) => {
    if (item.route) {
      return props.data?.permissions[item.route];
    }
    if (item.items && item.items.length) {
      return areAllSubItemsChecked(item.items);
    }
    return false;
  });
};


const routeItems = [];

routes.map((route) => ({
  name: route.name,
  meta: route.meta,
  title: route.meta?.description || 'Nepojmenovaný modul (' + (route.name?.toString() ?? '') + ')',
})).forEach((route) => {
  if (route.name && props.data?.permissions[route.name] === undefined && !route.meta?.authorization && !route.name?.toString().includes('-')) {
    routeItems.push(route);
  }
});

function submit()
{
  form.value?.submit();
}

const $emit = defineEmits(['success']);
defineExpose({ submit } );

</script>