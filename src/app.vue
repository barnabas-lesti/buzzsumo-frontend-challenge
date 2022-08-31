<script setup lang="ts">
/**
 * Main application component.
 */

import { LayoutFooter, LayoutHeader } from './components/layout';
import { WordCloud } from './components/word-cloud';
</script>

<template>
  <div class="app">
    <layout-header />
    <div class="content">
      <word-cloud />
    </div>
    <layout-footer />
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  height: 100%;

  .content {
    flex: 1 0 auto;
    padding: 0 1rem;
  }
}
</style>
