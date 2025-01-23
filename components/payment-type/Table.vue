<script setup lang="ts">
const { settings } = useUser();
withDefaults(defineProps<{
  filters: object
  lang: string,
}>(), {  });

const url: string = '/eshop/payment-type';
const page = ref<number>(1);
const onPage = ref<number>(settings.value.defaultOnPage);
</script>

<template>
  <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters">
    <template #header>
      <tr>
        <BaseGridThSelect />
        <BaseGridTh />
        <BaseGridTh order-by="code">Kód</BaseGridTh>
        <BaseGridTh />
        <BaseGridTh order-by="name"><BaseFlag :lang="lang" /> Název</BaseGridTh>
        <BaseGridTh order-by="name">Celková cena (CZK)</BaseGridTh>
        <BaseGridTh class="minimal" order-by="priority">Priorita</BaseGridTh>
        <BaseGridTh class="minimal" order-by="recommended"><i class="fa fa-thumbs-o-up" /></BaseGridTh>
        <BaseGridTh class="minimal" order-by="hidden"><i class="fa fa-eye-slash" /></BaseGridTh>
        <BaseGridTh />
        <BaseGridTh><BaseGridThSettings /></BaseGridTh>
      </tr>
    </template>
    <template #body="{item, selected, deleteRow, updateRow}">
      <tr :class="{'inactive': item.hidden, 'active': selected}">
        <BaseGridTdSelect :id="item.uuid" />
        <td><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'payment-type-id', params: { id: item.uuid }})" /></td>
        <td>{{ item.code }}</td>
        <td><img height="20" :alt="item.code" :src="'https://www.abel.cz//userfiles/paymenttype_images/thumb/' + item.imageFileName"></td>
        <td>{{ item.name[lang] ?? '-' }}</td>
        <td class="minimal">{{ '-' }}</td>
        <td class="minimal"><BaseTextBox v-model="item.priority" type="number" class="form-control-xs" style="width: 50px;" @change="(e) => updateRow(parseInt(e.target.value), 'priority')" /></td>
        <td class="minimal"><BaseCheckBox v-model="item.recommended" @change="(e) => updateRow(e.target.checked, 'recommended')" /></td>
        <td class="minimal"><BaseCheckBox v-model="item.hidden" @change="(e) => updateRow(e.target.checked, 'hidden')" /></td>
        <td class="minimal"><BaseButton class="btn btn-outline-primary" @click="navigateTo({name: 'payment-type-pracelist'})">Ceník</BaseButton></td>
        <td class="minimal"><BaseButtonDelete class="btn-xs btn-danger" :confirmation="true" @confirm="deleteRow();" /></td>
      </tr>
    </template>
    <template #footer>
      <BaseGridPaginator wrap="flex-shrink-0" :url="url" :page="page" :on-page="onPage" :filters="filters" @change-page="page = $event" @change-on-page="onPage = $event; page = 1;" />
    </template>
  </BaseGrid>
</template>