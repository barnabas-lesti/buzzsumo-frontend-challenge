<script setup lang="ts"></script>

<template>
  <div class="BaseLoader">
    <span class="icon material-icons">sensors</span>
  </div>
</template>

<style scoped lang="scss">
.BaseLoader {
  display: flex;
  font-size: 0;

  .icon {
    font-size: 3rem;
    animation: rotating 1s linear infinite;

    @keyframes rotating {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
