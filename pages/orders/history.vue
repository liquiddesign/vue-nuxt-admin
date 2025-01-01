<template>
  <BaseCard>
    {{ permissions }}
    <br>
    <form class="" @submit.prevent="handleSubmit">
      <div v-for="item in menu" :key="item.name">
        <template v-if="!item.route && item.items && item.items.length">
          <h5 class="mt-3 mb-2" style="text-transform: uppercase; font-weight: lighter">
            <div class="form-check">
              <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`permission-group-${item.name}`"
                  :checked="areAllSubItemsChecked(item.items)"
                  @change="toggleAllSubItems(item.items, $event.target.checked)"
              />
              <label class="form-check-label" :for="`permission-group-${item.name}`">
                {{ item.title }}
              </label>
            </div>
          </h5>
          <div class="ms-3">
            <div v-for="subItem in item.items" :key="subItem.name" class="bg-light-subtle p-1">
              <template v-if="!subItem.route && subItem.items && subItem.items.length">
                <h6 style="text-transform: uppercase; font-weight: lighter" class="mt-2 mb-0">
                  <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        :id="`permission-subgroup-${subItem.name}`"
                        :checked="areAllSubItemsChecked(subItem.items)"
                        @change="toggleAllSubItems(subItem.items, $event.target.checked)"
                    />
                    <label class="form-check-label" :for="`permission-subgroup-${subItem.name}`">
                      {{ subItem.title }}
                    </label>
                  </div>
                </h6>
                <div class="ms-3">
                  <div v-for="nestedItem in subItem.items" :key="nestedItem.name">
                    <div class="form-check" v-if="nestedItem.route">
                      <input
                          class="form-check-input"
                          type="checkbox"
                          :id="`permission-${nestedItem.route}`"
                          v-model="permissions[nestedItem.route]"
                      />
                      <label class="form-check-label" :for="`permission-${nestedItem.route}`">
                        {{ nestedItem.title }}
                      </label>
                    </div>
                  </div>
                </div>
              </template>
              <template v-if="subItem.route">
                <div class="form-check">
                  <input
                      class="form-check-input"
                      type="checkbox"
                      :id="`permission-${subItem.route}`"
                      v-model="permissions[subItem.route]"
                  />
                  <label class="form-check-label" :for="`permission-${subItem.route}`">
                    {{ subItem.title }}
                  </label>
                </div>
              </template>
            </div>
          </div>
        </template>
        <template v-if="item.route">
          <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                :id="`permission-${item.route}`"
                v-model="permissions[item.route]"
            />
            <label class="form-check-label" :for="`permission-${item.route}`">
              {{ item.title }}
            </label>
          </div>
        </template>
      </div>
      <div tabindex="-1" class="dropdown-divider" />

      <template v-for="item in routePermissions">
        <div class="form-check">
          <input
              class="form-check-input"
              type="checkbox"
              :id="`permission-${item.name}`"
              v-model="permissions[item.name]"
          />
          <label class="form-check-label" :for="`permission-${item.name}`">
            {{ item.description }} ({{ item.name }})
          </label>
        </div>
      </template>

      <button type="submit" class="btn btn-primary mt-3">Uložit oprávnění</button>
    </form>

  </BaseCard>
</template>
<script setup lang="ts">

const permissions = ref({});
import menu from '~/utils/Menu';

const router = useRouter();
const routes = router.getRoutes();

// Získání popisů pro tabulku



const handleSubmit = () => {
  console.log('Permissions:', permissions.value);
  // Implement saving logic here
};

const processMenu = (menuItems) => {
  menuItems.forEach((item) => {
    if (item.route) {
      permissions.value[item.route] = false;
    }
    if (item.items && item.items.length) {
      processMenu(item.items);
    }
  });

};

const toggleAllSubItems = (items, checked) => {
  items.forEach((item) => {
    if (item.route) {
      permissions.value[item.route] = checked;
    }
    if (item.items && item.items.length) {
      toggleAllSubItems(item.items, checked);
    }
  });
};

const areAllSubItemsChecked = (items) => {
  return items.every((item) => {
    if (item.route) {
      return permissions.value[item.route];
    }
    if (item.items && item.items.length) {
      return areAllSubItemsChecked(item.items);
    }
    return false;
  });
};

processMenu(menu);

const routePermissions = [];

routes.map((route) => ({
  path: route.path,
  name: route.name,
  description: route.meta?.description || 'Popis není dostupný',
})).forEach((route) => {
  // skip public // skip nested
  if (permissions.value[route.name] === undefined) {
    permissions.value[route.name] = false;
    routePermissions.push(route);
  }
});


</script>