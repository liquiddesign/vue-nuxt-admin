<template>
  <div class="app-page-title">
    <div class="page-title-wrapper">
      <div class="page-title-heading">
        <div class="page-title-icon w-auto">
          <BaseIcon :icon-name="icon" :size="24" />
        </div>
        <div>
          {{ title }}
          <button type="button" class="p-0 btn btn-sm btn-secondary user-avatar" style="display: inline-flex; width: 20px; position: relative;" @click="$refs.allRoles.open();">
            <BaseIcon icon-name="LockKeyhole" :size="11" :stroke-width="2" />
          </button>
          <div v-if="description" class="page-title-subheading">{{ description }}</div>
        </div>
      </div>
      <div class="page-title-actions">
        <slot />
      </div>
    </div>
  </div>

  <BaseModal ref="allRoles" :title="`Nastevení přístupu k modulu ${title}`" :display-footer="false">
    <template #body>
      <div>
        <span>
          Vyberte role, které mají přístup k modulu
        </span>
        <br>
        <template v-if="error">
          <span class="text-danger">{{ error.message }}</span>
        </template>
        <template v-else>
          <div class="row mt-3">
            <div v-for="role in roles" :key="role.uuid">
              <h6 class=""><BaseCheckBox v-model="role.permissions[currentRoute]" :label="role.name" /></h6>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-lg-6">
              <BaseButton class="btn-success btn-lg me-1" @click="savePermissions(); $refs.allRoles.close();">Uložit</BaseButton>
            </div>
          </div>
        </template>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import {inject, ref} from 'vue';
import {ToastPluginApi, useToast} from 'vue-toast-notification';

const url = 'roles';
const router = useRouter();
const toast: ToastPluginApi = inject('toast', useToast());
const { data, pending, error } = useApiFetch(url);
const currentRoute = router.currentRoute.value.name ?? '';
const roles: Ref<any[]> = ref([]);

defineProps<{
  title: string
  description?: string
  icon: string
}>();


watch(data, (newData: any) => {
  roles.value = newData.items;
  setPermissionType();
});

function setPermissionType() {
  if (!error.value && roles?.value) {
    for (const uuid in roles.value) {
      const role: any = roles.value[uuid];
      if (!role?.permissions) {
        role.permissions = { [currentRoute] : false };
      } else if (role?.permissions && !role?.permissions?.[currentRoute]) {
        role.permissions[currentRoute] = false;
      }
    }
  }
}

function toggleAllRoles(checked: boolean) {
  for (const uuid in roles.value) {
    roles.value[uuid].permissions[currentRoute] = checked;
  }
}

const isAllRolesChecked = (): boolean => {
  for (const uuid in roles.value) {
    if (!roles.value[uuid].permissions[currentRoute]) {
      return false;
    }
  }
  return true;
};

function savePermissions() {
  apiFetch(url, {body: roles.value, method: 'PATCH'})
      .then(() => {
        toast.success('Uloženo');
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      })
      .finally(() => {
        pending.value = false;
      });
}
</script>