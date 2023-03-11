<template>
  {{ data }}
  {{ $route }}
  <NuxtLink :to="{ name: 'products-id', params: { id: 123 }}">asdasd</NuxtLink>
aaa
  <p>There are {{ data?.ships?.length || 0 }} ships.</p>
</template>
<script lang="ts" setup>
const query = gql`
  query geShaaips($limit: Int!) {
    ships(limit: $limit) {
      id
      name
    }
  }
`
const variables = { limit: 5 }
const { data } = await useAsyncQuery(query, variables)
</script>