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
    <span
      :class="[
        'WordCloudMetadataMention__count',
        props.type === 'positive'
          ? 'WordCloudMetadataMention__count--positive'
          : null,
        props.type === 'negative'
          ? 'WordCloudMetadataMention__count--negative'
          : null,
      ]"
    >
      {{ props.count || 0 }}
    </span>
  </div>
</template>

<style lang="scss">
.WordCloudMetadataMention {
  &__count {
    font-weight: bold;

    &--positive {
      color: green;
    }

    &--negative {
      color: red;
    }
  }
}
</style>
