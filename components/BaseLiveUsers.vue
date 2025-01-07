<template>
  <div style="display: inline-flex;">
    <span v-if="filteredAvatars.length" style="font-weight: normal; top: 4px; position: relative;" class="pe-2">Pracující:</span>
    <template v-for="(meta, id) in filteredAvatars" :key="id">
      <BaseAvatar :user-id="meta.user" class="me-1" />
    </template>
  </div>
</template>
<script setup lang="ts">
const { identity } = useUser();
const route = useRoute();
const { liveTable } = useLiveFeed();

// Computed property to filter avatars
const filteredAvatars = computed(() => {
  return Object.values(liveTable.value).filter(
      (meta: any) => route.path === meta.routePath && meta.user !== identity.value?.uuid
  );
});

</script>