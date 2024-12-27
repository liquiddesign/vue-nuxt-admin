<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="router.back();" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <template #headerRight>
      <div style="display: inline-block" class="me-4">
        <span title="Lukáš Knotek"><img width="30" class="rounded-circle me-2" style="border: 2px solid #ff6464;" src="https://api.dokonalynajemnik.cz/userfiles/administrators/63b6c8c71357a00154123794/thumbs/Knotek.jpeg" alt=""><!----><!----></span>
        <span title="Lukáš Knotek"><img width="30" class="rounded-circle" style="border: 2px solid #0b0c0d;" src="https://api.dokonalynajemnik.cz/userfiles/administrators/63b6c8c71357a00154123794/thumbs/Knotek.jpeg" alt=""><!----><!----></span>
      </div>

      <BaseButtonExternalLink v-if="0" class="me-1" />
      <BaseButtonRefresh class="btn-sm me-1" @click="refresh();" />
      <BaseDropdown class="btn-outline-primary me-1" icon="fa-bolt">
        <BaseDropdownItem @click="makeCopy()">Vytvořit kopii</BaseDropdownItem>
      </BaseDropdown>
      <BaseButtonDelete :confirmation="true" :outline="true" class="btn-sm" @confirm="deleteItem()" />
    </template>
    <template #body>
      <div class="alert alert-dismissible fade show alert-primary py-2" style="display: flex" role="alert">Záznam byl změněn. Chcete jej znovu načíst? <button class="btn btn-outline-secondary btn-xs ms-2 btn"><!--v-if--><i class="fa fa-refresh" /> </button></div>
      <div class="alert alert-dismissible fade show alert-danger py-2" style="display: flex" role="alert">Záznam byl smazán</div>
      <div class="alert alert-dismissible fade show alert-alternate py-2" style="display: flex" role="alert">
        <div style=" display: flex;"> Záznam je právě editován</div>
        <div class="typing-indicator ms-3 pt-1">
          <span class="dot" />
          <span class="dot" />
          <span class="dot" />
        </div>
      </div>


      <div class="user-avatar bg-warning">
        <span class="initials">AB</span>
      </div>

      <div class="user-avatar bg-alternate">
        <span class="initials">OP</span>
      </div>

      <div class="user-avatar bg-heavy-rain">
        <span class="initials">OP</span>
      </div>

      <div class="user-avatar bg-heavy-rain">
        <span class="initials">?</span>
      </div>

      <AdministratorsForm ref="form" :data="data" :slug="route.params.id" :loading="pending" @success="redirect">
        <template #top><h5 class="card-title">Administrátor #{{ data?.id }}</h5></template>
      </AdministratorsForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

const {data, pending, refresh} = useFetch(config.public.baseURL + 'administrators/' + route.params.id);
const {deleteItem, makeCopy, redirect} = useDetailMethods('administrators', 'administrators');

</script>