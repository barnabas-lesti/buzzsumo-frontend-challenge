<script setup lang="ts">
/**
 * WordCloud topic metadata display controlled component.
 */

import type { PropType } from 'vue';
import type { Topic } from '@/stores/topics';
import WordCloudMetadataMention from './word-cloud-metadata-mention.vue';

const props = defineProps({
  /**
   * Topic to display the metadata for.
   * @required
   */
  topic: {
    required: true,
    type: Object as PropType<Topic>,
  },
});
</script>

<template>
  <div class="word-cloud-metadata">
    <div class="heading">
      {{ $t('components.wordCloudMetadata.info') }}
      <span class="label">"{{ props.topic.label }}"</span>:
    </div>
    <word-cloud-metadata-mention
      :count="props.topic.volume"
      label-key="components.wordCloudMetadata.mentions.total"
      class="total-mentions"
    />
    <word-cloud-metadata-mention
      :count="props.topic.sentiment.positive"
      label-key="components.wordCloudMetadata.mentions.positive"
      type="positive"
    />
    <word-cloud-metadata-mention
      :count="props.topic.sentiment.neutral"
      label-key="components.wordCloudMetadata.mentions.neutral"
    />
    <word-cloud-metadata-mention
      :count="props.topic.sentiment.negative"
      label-key="components.wordCloudMetadata.mentions.negative"
      type="negative"
    />
  </div>
</template>

<style scoped lang="scss">
.word-cloud-metadata {
  .label {
    font-weight: bold;
  }

  .heading,
  .total-mentions {
    margin-bottom: 0.5rem;
  }
}
</style>
