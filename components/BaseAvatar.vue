<template>
  <div v-if="!user" class="user-avatar bg-secondary bg-heavy-rain">
    <span class="initials" title="Neznámý uživatel">?</span>
  </div>
  <div v-else-if="!user.imageName" class="bg-gradient user-avatar" :class="generateColor(user.uuid)">
    <span class="initials" :title="user.surname + ' ' + user.name">{{ user.nickname }}</span>
  </div>
  <div v-else class="user-avatar">
    <img :src="config.public.userFilesURL + '/avatars/' + user.imageName" :alt="user.nickname" :title="user.surname + ' ' + user.name">
  </div>
</template>

<script setup lang="ts">

const { $user } = useNuxtApp();
const config = useRuntimeConfig();

const props = defineProps<{
  userId: string|null,
}>();

const user = computed(() => {
  if (!props.userId) {
    return null;
  }

  return $user.identity.administrators[props.userId] ?? null;
});

const colors = [
  "bg-happy-green",
  "bg-premium-dark",
  "bg-love-kiss",
  "bg-grow-early",
  "bg-strong-bliss",
  "bg-warm-flame",
  "bg-tempting-azure",
  "bg-sunny-morning",
  "bg-mean-fruit",
  "bg-night-fade",
  "bg-heavy-rain",
  "bg-amy-crisp",
  "bg-malibu-beach",
  "bg-deep-blue",
  "bg-mixed-hopes",
  "bg-happy-itmeo",
  "bg-happy-fisher",
  "bg-arielle-smile",
  "bg-ripe-malin",
  "bg-vicious-stance",
  "bg-midnight-bloom",
  "bg-night-sky",
  "bg-slick-carbon",
  "bg-royal",
  "bg-asteroid",
];

function generateColor(uuid) {
  // Vypočítá hash z UUID
  const hash = hashCode(uuid);
  // Index v seznamu barev
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Převod na 32bitové číslo
  }
  return hash;
}

</script>