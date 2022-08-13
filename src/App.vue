<script setup lang="ts">
import { useTopicsStore } from './stores/topics';
const topicsStore = useTopicsStore();

console.log('topicsStore.topics', topicsStore.topics);
</script>

<template>
  <div class="App">
    Topics:
    <pre>{{ JSON.stringify(topicsStore.topics) }}</pre>
  </div>
</template>

<style lang="scss"></style>
