<template>
  <BaseCardHeader title="Zákazníci" icon="pe-7s-users" description="Přehled zákazníků">
    <BaseButtonNew @click="navigateTo({ name: 'customers-new'})">Přidat zákazníka</BaseButtonNew>
  </BaseCardHeader>
  <BaseCard>
    <template #header>
      <BaseFilter @cancel="filters.q = null;">
        <BaseInput wrap="flex-shrink-0" placeholder="Název, kód, #id" v-model="filters.q" type="text" />
      </BaseFilter>
      <div class="d-flex align-items-center flex-wrap gap-1 grid-filter">
        
        <div class="flex-shrink-0">
          <input class="form-control-sm form-control" placeholder="Název, kód, #id" v-model="filters.q" type="text" />
        </div>

        <div class="flex-shrink-0">
          <button @click="filters.q = null;" type="button" class="btn btn-sm btn-outline-dark me-2" data-original-title="Example Tooltip">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
    </template>
    <template #body>
      <BaseGrid url="customer" :page="page" :on-page="onPage" :filters="filters">
        <template #header="{orderBy, orderByValue, orderByAsc}">
          <tr>
            <BaseGridThSelect />
            <th></th>
            <th>#</th>
            <th></th>
            <th @click="orderBy('ic')" style="cursor:pointer;">IČ <i class="fa" :class="{'fa-sort' : orderByValue !== 'ic', 'fa-sort-down' : orderByValue === 'ic' && !orderByAsc, 'fa-sort-up' : orderByValue === 'ic' && orderByAsc}"></i></th>
            <th @click="orderBy('company')" style="cursor:pointer;">Název <i class="fa" :class="{'fa-sort' : orderByValue !== 'company', 'fa-sort-down' : orderByValue === 'company' && !orderByAsc, 'fa-sort-up' : orderByValue === 'company' && orderByAsc}"></i></th>
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
        <template #body="{item, selected}">
          <tr :class="{'inactive': item.id === 5, 'active': selected}" @click="expanded = item.ic;">

            <BaseGridTdSelect :id="item.uuid" />
            <th class="minimal"><button class="btn btn-outline-secondary btn-xs text-center" style="min-width: 20px;"><i :class="{'fa fa-caret-down': expanded === item.ic, 'fa fa-caret-right': expanded !== item.ic}"></i></button></th>
            <td class="minimal">{{ item.id }}</td>
            <td class="minimal"><button class="btn btn-xs btn-success me-1" @click.stop="navigateTo({ name: 'customers-id', params: { id: item.uuid }})">
              <i class="fa fa-edit" />
              <slot />
            </button></td>

            <td class="minimal">{{ item.ic ?? '-' }}</td>
            <td>{{ item.company }} <i v-if="item.id === 3" class="fa fa-lock"></i></td>
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
          <tr v-if="expanded === item.ic">
            <td colspan="10" class="p-0" style="background-color: white !important;"><div class="px-4 py-2 bg-white" style="border: 10px solid #f8f8f8;">
              <div class="row">
                <div class="col-lg-6">
              <table class="mb-2 table table-sm">
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Petr Marek</td>
                  <td>marek@lqd.cz</td>
                  <td>   <button class="btn btn-xs btn-outline-success me-1"><i class="fa fa-pencil"></i></button><button class="btn btn-xs btn-outline-primary"><i class="fa fa-sign-in"></i></button></td>
                </tr>

                <tr>
                  <th scope="row"></th>
                  <td></td>
                  <td></td>
                  <td><button class="btn btn-xs btn-outline-success"><i class="fa fa-plus"></i></button></td>
                </tr>
                </tbody>
              </table></div>
                <div class="col-lg-6">
                  <ul v-if="0" class="list-group list-group-flush" >
                    <li class="bg-transparent list-group-item pt-0">
                      <div class="widget-content p-0">
                        <div class="widget-content-outer">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left">
                              <div class="widget-heading">Total Orders</div>
                              <div class="widget-subheading">Last year expenses</div>
                            </div>
                            <div class="widget-content-right">
                              <div class="widget-numbers text-success" style="font-size: 1.2rem;">1896</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="bg-transparent list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-outer">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left">
                              <div class="widget-heading">Clients</div>
                              <div class="widget-subheading">Total Clients Profit</div>
                            </div>
                            <div class="widget-content-right" >
                              <div class="widget-numbers text-primary" style="font-size: 1.3rem;">$12.6k</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>

                  <div v-if="1" class="pt-0 pb-0">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item pt-0">
                        <div class="widget-content p-0">
                          <div class="widget-content-outer">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left">

                                <div class="widget-heading">Objednávka: <a href="">E2324324 <i class="fa fa-external-link"></i></a></div>
                                <div class="widget-subheading">18.12 2022 22:11</div>
                              </div>

                              <div class="widget-content-right">

                                <div class="widget-numbers text-lqd"  style="font-size: 1.4rem;">1896 Kč</div>
                              </div>
                            </div>
                            <div class="widget-progress-wrapper">
                              <div class="progress-bar-sm progress-bar-animated-alt progress" style="height: 4px;">
                                <div class="progress-bar bg-primary" role="progressbar" aria-valuenow="43" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                                </div>
                              </div>
                              <div class="progress-sub-label">
                                <div class="sub-label-left">marek@lqd.cz</div>
                                <div class="sub-label-right">Expedováno</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div></td>
          </tr>
        </template>
        <template #footer="{selectedNumber, selectAll}">
          <div class="flex-shrink-0 me-1 ms-1">
            <BaseGridSelectAll />
          </div>
          <div class="flex-shrink-0">
            <button @click="delete filters.q" type="button" data-toggle="tooltip" title="" data-placement="bottom" style="padding: 4px 4px;" class="btn btn-xs btn-outline-success me-1" data-original-title="Example Tooltip" :disabled="!getSelectCount(selectAll, selectedNumber)">
              <i class="fa fa-edit"></i> ({{ getSelectCount(selectAll, selectedNumber) }})
            </button>
          </div>
          <div class="flex-shrink-0">
            <button @click="delete filters.q" type="button" data-toggle="tooltip" title="" data-placement="bottom" style="padding: 4px 4px;" class="btn btn-xs btn-outline-alternate me-1" data-original-title="Example Tooltip" :disabled="!getSelectCount(selectAll, selectedNumber)">
              <i class="fa fa-download"></i> ({{ getSelectCount(selectAll, selectedNumber) }})
            </button>
          </div>
          <div class="flex-shrink-0">
            <button @click="delete filters.q" type="button" data-toggle="tooltip" title="" data-placement="bottom" style="padding: 4px 4px;" class="btn btn-xs btn-outline-danger me-1" data-original-title="Example Tooltip" :disabled="!getSelectCount(selectAll, selectedNumber)">
              <i class="fa fa-trash-o"></i> ({{ getSelectCount(selectAll, selectedNumber) }})
            </button>
          </div>
          <div class="flex-shrink-0">
            <BaseGridPaginator ref="paginator" :url="'customer'" :page="page" :on-page="onPage" :filters="filters" @change-page="page = $event" @change-on-page="onPage = $event; page = 1;"/>
          </div>
        </template>
      </BaseGrid>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
const expanded: Ref<string|null> = ref(null);
const page = ref(1);
const onPage = ref(20);
const filters: any = reactive({});
const paginator = ref(null);

watch(filters, (value) => {
  page.value = 1;
})

function getSelectCount(selectAll: boolean, selectedNumber: number): number {
  return selectAll ? paginator.value?.totalItems || 0 : selectedNumber;
}


</script>