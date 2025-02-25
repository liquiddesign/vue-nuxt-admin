<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="router.back();" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <template #headerRight>
      <BaseButtonExternalLink v-if="0" class="me-1" />
      <BaseLiveUsers class="me-2" />
      <BaseButtonRefresh class="btn-sm me-1" @click="refresh();" />
      <BaseDropdown class="btn-outline-primary me-1" icon-name="Zap">
        <BaseDropdownItem @click="makeCopy()">Vytvořit kopii</BaseDropdownItem>
      </BaseDropdown>
      <BaseButtonDelete :confirmation="true" :outline="true" class="btn-sm btn-danger" @confirm="deleteItem()" />
    </template>
    <template #body>
      <BaseLiveAlert :record-id="route.params.id.toString()" @refresh="refresh" />
      <RolesForm ref="form" :data="data" :slug="route.params.id" :loading="pending" @success="redirect">
        <template #top><h5 class="card-title">Role #{{ data?.id }}</h5></template>
      </RolesForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const {data, pending, refresh} = useApiFetch('roles/' + route.params.id);

const {deleteItem, makeCopy, redirect} = useDetailMethods('roles', 'roles');

</script>