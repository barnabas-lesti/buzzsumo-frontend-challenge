<script setup lang="ts">
/**
 * Main application component.
 */

import { BaseLoader } from './components/base';
import { LayoutFooter, LayoutHeader } from './components/layout';
import { WordCloud } from './components/word-cloud';
</script>

<template>
  <div class="app">
    <layout-header />
    <div class="content">
      <suspense>
        <word-cloud />

        <template #fallback>
          <base-loader class="loader" />
        </template>
      </suspense>
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

  .loader {
    justify-content: center;
    margin-top: 2rem;
  }
}
</style>
