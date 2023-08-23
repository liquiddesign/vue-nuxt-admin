<template>
  <BaseCardHeader title="Výrobci" icon="pe-7s-ticket" description="Přehled a správa výrobců zboží">

    <button type="button" class="me-2 btn btn-sm btn-outline-secondary">
      <i class="fa fa-life-saver"></i>
    </button>
    <button type="button" class="me-2 btn btn-sm btn-outline-alternate">
      <i class="fa fa-image"></i>
    </button>
    <button type="button" class="me-2 btn btn-sm btn-outline-alternate">
      <i class="fa fa-upload"></i>
    </button>

    <BaseButtonNew @click="navigateTo({ name: 'producers-new'})">Přidat výrobce</BaseButtonNew>
  </BaseCardHeader>
  <BaseCard>
    <template #header>
      <button @click="navigateTo({ name: 'products-new'})"> EMPTY</button>
      <button @click="test()"> ERROR</button>
      FILTR -> pokrocily (at muzu davat % -> LIKE, #sadasdasd -> exactni hodnota)

      <div class="d-flex align-items-center flex-wrap gap-1 grid-filter">
      <div class="flex-shrink-0">
        <div class="dropdown d-inline-block">
        <a class="dropdown-toggle btn btn-sm btn-outline-secondary me-1" data-bs-toggle="dropdown" data-bs-boundary="body" data-boundary="body"> <flag iso="it" /></a>
        <div class="dropdown-menu dropdown-menu-right pt-2  ps-2" tabindex="-1" style="min-width: 76px;" role="menu" aria-hidden="true">
          <div class="d-flex align-items-center flex-wrap gap-1">
          <div class="flex-shrink-0">
            <a class="btn btn-xs btn-outline-dark me-1" ><img class="mutation-flag" style="top: -2px; position: relative;" height="10" alt="cs" title="cs" src="http://localhost/levior-b2b/public/node_modules/flag-icon-css/flags/4x3/cz.svg"></a>
          </div>
            <div class="flex-shrink-0">
              <a class="btn btn-xs btn-outline-dark me-1" ><img class="mutation-flag" style="top: -2px; position: relative;" height="10" alt="cs" title="cs" src="http://localhost/levior-b2b/public/node_modules/flag-icon-css/flags/4x3/cz.svg"></a>
            </div>

          </div>
        </div>
        </div>
      </div>
      <div class="flex-shrink-0">
      <input class="form-control-sm form-control" placeholder="Název, kód, #id" v-model="filters.q" type="text" />
      </div>
        <div class="flex-shrink-0">
          <button type="button" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-sm btn-outline-alternate disabled" data-original-title="Example Tooltip">
            <i class="fa fa-filter"></i> (0)
          </button>
        </div>
        <div class="flex-shrink-0">
          <button @click="delete filters.q" type="button" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-sm btn-outline-dark me-2" data-original-title="Example Tooltip">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
    </template>
    <template #body>
      <BaseGrid url="http://localhost/levior-b2b/api/producer" :page="page" :on-page="onPage" :filters="filters">
        <template #header>
          <tr>
            <BaseGridThSelect />
            <th>#</th>
            <th></th>
            <th></th>
            <th>Kód</th>
            <th>Název  <a style="position: relative; top: -2px;" class="dropdown-toggle btn btn-xs btn-outline-dark me-1" @click.prevent="toast.info('Editujete českou mutaci')"><span style="font-size: 10px; top: -1px; position: relative"><flag iso="gb" /></span></a>
            </th>
            <th>Pořadí</th>
            <th class="minimal"><i title="Doporučeno" class="fa fa-thumbs-o-up"></i></th>
            <th class="minimal"><i title="Skryto" class="fa fa-eye-slash"></i></th>
            <th class="minimal">
              <button type="button" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-xs btn-outline-secondary me-1" data-original-title="Example Tooltip">
                <i class="fa fa-refresh"></i>
              </button>
                 <button type="button" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-xs btn-secondary" data-original-title="Example Tooltip">
              <i class="fa fa-cogs"></i>
            </button>
            </th>
          </tr>
        </template>
        <template #body="{item}">
          <tr :class="{'inactive': item.id === 5}">
            <BaseGridTdSelect :id="item.uuid" />
            <td class="minimal">{{ item.id }}</td>
            <td class="minimal"><button class="btn btn-xs btn-success me-1" @click="navigateTo({ name: 'producers-id', params: { id: item.uuid }})">
              <i class="fa fa-edit" />
              <slot />
            </button></td>

            <td class="minimal"><img src="https://www.festa.tools/public/img/festa-logo.png" style="max-width: 40px; max-height: 20px;"></td>
            <td class="minimal">{{ item.code ?? '-' }}</td>
            <td>{{ item.name.cs }} <i v-if="item.id === 3" class="fa fa-lock"></i></td>
            <td class="minimal">
              <div class="input-group" style=" width: 90px;">
                  <input class="form-control-xs form-control" type="number" />
                <div class="input-group-append" style="position:relative; top: -1px">
                  <button type="button" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-xs btn-outline-dark" data-original-title="Example Tooltip">
                    <i class="fa fa-level-up"></i>
                  </button>
                  <button type="button" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-xs btn-outline-dark" data-original-title="Example Tooltip">
                    <i class="fa fa-level-down"></i>
                  </button>
                </div>
              </div>
            </td>
            <td>
              <input class="form-check-input" type="checkbox" />
            </td>
            <td>
              <input class="form-check-input" type="checkbox" />
            </td>
            <td style="text-align: right">  <button class="btn btn-sm btn-xs btn-danger">
               <i class="fa fa-trash-o" />
            </button></td>
          </tr>
        </template>
      </BaseGrid>
      <div class="d-flex align-items-center flex-wrap gap-1">
        <div class="flex-shrink-0">
      <button @click="delete filters.q" type="button" data-toggle="tooltip" title="" data-placement="bottom" style="padding: 4px 4px;" class="btn btn-xs btn-outline-success me-2" data-original-title="Example Tooltip">
        <i class="fa fa-edit"></i> (10)
      </button>
        </div>
        <div class="flex-shrink-0">
          <button @click="delete filters.q" type="button" data-toggle="tooltip" title="" data-placement="bottom" style="padding: 4px 4px;" class="btn btn-xs btn-outline-alternate me-2" data-original-title="Example Tooltip">
            <i class="fa fa-download"></i> (10)
          </button>
        </div>
        <div class="flex-shrink-0">
      <button @click="delete filters.q" type="button" data-toggle="tooltip" title="" data-placement="bottom" style="padding: 4px 4px;" class="btn btn-xs btn-outline-danger me-2" data-original-title="Example Tooltip">
        <i class="fa fa-trash-o"></i> (10)
      </button>
        </div>
        <div class="flex-shrink-0">
      <BaseGridPaginator :url="'http://localhost/levior-b2b/api/producer'" :page="page" :on-page="onPage" @change-page="page = $event"/>
        </div>
      </div>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">

import {onActivated, onMounted} from "vue";


const counter = ref(0);
const page = ref(1);
const onPage = ref(20);
const filters: any = reactive({});




onActivated(() => {
  console.log('activated');

});

onMounted(() => {
  console.log('mounted');
});


function test() {
  //throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  //showError("😱 Oh no, an error has been thrown.")
 //showError({ statusCode: 403, statusMessage: "Page Not Found" })
}

</script>