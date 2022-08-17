<script lang="ts">
import { defineComponent, type PropType } from 'vue';

/**
 * WordCloud topic metadata mention display controlled component.
 */
export default defineComponent({
  props: {
    /**
     * Label to display for the topic.
     * @required
     */
    label: {
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
  },
});
</script>

<template>
  <div class="WordCloudMetadataMention">
    {{ label }}: <span :class="['count', type]">{{ count || 0 }}</span>
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
