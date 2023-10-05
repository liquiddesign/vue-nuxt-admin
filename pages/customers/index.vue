<template>
  <BasePageHeader title="Zákazníci" icon="pe-7s-users" description="Přehled zákazníků">
    <BaseButtonNew @click="navigateTo({ name: 'customers-new'})">Přidat zákazníka</BaseButtonNew>
  </BasePageHeader>
  <BaseCard>
    <template #header>
      <BaseFilter @cancel="resetFilter">
        <BaseTextBox v-model="filters.q" wrap="flex-shrink-0" placeholder="Název, kód, #id" type="text" />
      </BaseFilter>
    </template>
    <template #body>
      <BaseGrid url="customer" :page="page" :on-page=" onPage" :filters="filters">
        <template #header>
          <tr>
            <BaseGridThSelect />
            <th />
            <BaseGridTh>#</BaseGridTh>
            <th />
            <BaseGridTh order-by="company">Název</BaseGridTh>
            <BaseGridTh order-by="ic">IČ</BaseGridTh>
            <BaseGridTh>Pořadí</BaseGridTh>
            <BaseGridThSettings>Pořadí</BaseGridThSettings>
          </tr>
        </template>
        <template #body="{item, selected, deleteRow}">
          <tr :class="{'inactive': item.id === 5, 'active': selected}">
            <BaseGridTdSelect :id="item.uuid" />
            <th class="minimal"><button class="btn btn-outline-secondary btn-xs text-center" style="min-width: 20px;" @click="expanded = expanded ? null : item.ic;"><i :class="{'fa fa-caret-down': expanded === item.ic, 'fa fa-caret-right': expanded !== item.ic}" /></button></th>

            <td class="minimal">{{ item.id }}</td>
            <td class="minimal">
              <button class="btn btn-xs btn-success me-1" @click.stop="navigateTo({ name: 'customers-id', params: { id: item.uuid }})">
                <i class="fa fa-edit" />
                <slot />
              </button>
            </td>

            <td class="minimal">{{ item.ic ?? '-' }}</td>
            <td class="minimal">{{ item.ic ?? '-' }}</td>
            <td>{{ item.company }} <i v-if="item.id === 3" class="fa fa-lock" /></td>

            <td class="text-right">
              <Popper arrow placement="left">
                <button class="btn btn-sm btn-xs btn-danger"><i class="fa fa-trash-o" /></button>
                <template #content="{close}">
                  Opravdu smazat?<br>
                  <div class="text-center">
                    <button class="btn btn-success btn-xs" @click="close();deleteRow()">Ano</button>
                    <button class="btn btn-light btn-xs ms-2" @click="close">Ne</button>
                  </div>
                </template>
              </Popper>
            </td>
          </tr>
          <tr v-if="expanded === item.ic" />
        </template>
        <template #footer="{selectedNumber, selectAll, deleteRows, processing}">
          <div class="flex-shrink-0 me-1 ms-1">
            {{ processing }}
            <BaseGridSelectAll />
          </div>
          <div class="flex-shrink-0">
            <button type="button" title="" class="btn btn-xs btn-outline-success p-1 me-1" :disabled="!getSelectCount(selectAll, selectedNumber)" @click="delete filters.q">
              <i class="fa fa-edit" /> ({{ getSelectCount(selectAll, selectedNumber) }})
            </button>
          </div>
          <div class="flex-shrink-0">
            <button type="button" title="" style="padding: 4px 4px;" class="btn btn-xs btn-outline-alternate me-1" :disabled="!getSelectCount(selectAll, selectedNumber)" @click="delete filters.q">
              <i class="fa fa-download" /> ({{ getSelectCount(selectAll, selectedNumber) }})
            </button>
          </div>
          <div class="flex-shrink-0">
            <button type="button" title="" style="padding: 4px 4px;" class="btn btn-xs btn-outline-danger me-1" :disabled="!getSelectCount(selectAll, selectedNumber)" @click="deleteRows();">
              <i class="fa fa-trash-o" /> ({{ getSelectCount(selectAll, selectedNumber) }})
            </button>
          </div>
          <BaseGridPaginator ref="paginator" wrap="flex-shrink-0" :url="'customer'" :page="page" :on-page="onPage" :filters="filters" @change-page="page = $event" @change-on-page="onPage = $event; page = 1;" />
        </template>
      </BaseGrid>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">

const expanded: Ref<string|null> = ref(null);
const page = ref(1);
const onPage = ref(20);
const filters: any = ref({});

const paginator = ref(null);

watch(filters, () => {
  page.value = 1;
});

function getSelectCount(selectAll: boolean, selectedNumber: number): number {
  return selectAll ? paginator.value?.totalItems || 0 : selectedNumber;
}

function resetFilter()
{
  filters.value = {};
}


</script>