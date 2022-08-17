<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Base component to display a loading animation.
 */
export default defineComponent({});
</script>

<template>
  <div class="BaseLoader">
    <span class="material-icons">sensors</span>
  </div>
</template>

<style scoped lang="scss">
.BaseLoader {
  display: flex;
  font-size: 0;

  .material-icons {
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
