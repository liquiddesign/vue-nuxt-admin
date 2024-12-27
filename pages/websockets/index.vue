<template>
  <button @click="test">test</button>

  {{ isConnected }}
  {{ connectionId }}
</template>

<script setup lang="ts">



const { sendMessage, isConnected, connectionId } = useWebSocket();

function test() {
  sendMessage('delete');
}

</script>