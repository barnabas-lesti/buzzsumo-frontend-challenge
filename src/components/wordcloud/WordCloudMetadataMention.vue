<script setup lang="ts">
/**
 * WordCloud topic metadata mention display controlled component.
 */

import type { PropType } from 'vue';

const props = defineProps({
  /**
   * Label key for the label to display for the topic.
   * @required
   */
  labelKey: {
    required: true,
    type: String,
  },

  /**
   * Mention count of the topic to display.
   */
  count: {
    type: Number,
  },

  /**
   * Type of the mention, `positive` or `negative`.
   */
  type: {
    type: String as PropType<'positive' | 'negative'>,
  },
});
</script>

<template>
  <div class="WordCloudMetadataMention">
    {{ $t(props.labelKey) }}:
    <span :class="['count', props.type]">{{ props.count || 0 }}</span>
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
