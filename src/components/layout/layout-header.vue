<script setup lang="ts"></script>

<template>
  <header class="layout-header">
    <div class="brand">{{ $t('components.layoutHeader.brand') }}</div>
  </header>
</template>

<style scoped lang="scss">
.layout-header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 800;
  width: 100vw;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;

  .brand {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0.5rem 1rem;
  }
}
</style>
