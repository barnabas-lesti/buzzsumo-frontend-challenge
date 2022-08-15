<script setup lang="ts">
const props = defineProps<{
  label: string;
  count?: number;
  type?: 'positive' | 'negative';
}>();
</script>

<template>
  <div class="WordCloudMetadataMention">
    {{ props.label }}:
    <span :class="['count', props.type]">
      {{ props.count || 0 }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.WordCloudMetadataMention {
  .count {
    font-weight: bold;
  }

  .positive {
    color: #008000;
  }

  .negative {
    color: #ff0000;
  }
}
</style>
