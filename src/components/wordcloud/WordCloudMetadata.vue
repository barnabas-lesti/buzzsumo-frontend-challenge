<script setup lang="ts">
/**
 * WordCloud topic metadata display controlled component.
 */

import type { PropType } from 'vue';
import type { Topic } from '../../stores/topics';
import WordCloudMetadataMention from './WordCloudMetadataMention.vue';

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
  <div class="WordCloudMetadata">
    <div class="heading">
      {{ $t('wordcloud.metadata.info') }}
      <span class="label">"{{ props.topic.label }}"</span>:
    </div>
    <WordCloudMetadataMention
      :count="props.topic.volume"
      labelKey="wordcloud.metadata.mentions.total"
      class="totalMentions"
    />
    <WordCloudMetadataMention
      :count="props.topic.sentiment.positive"
      labelKey="wordcloud.metadata.mentions.positive"
      type="positive"
    />
    <WordCloudMetadataMention
      :count="props.topic.sentiment.neutral"
      labelKey="wordcloud.metadata.mentions.neutral"
    />
    <WordCloudMetadataMention
      :count="props.topic.sentiment.negative"
      labelKey="wordcloud.metadata.mentions.negative"
      type="negative"
    />
  </div>
</template>

<style scoped lang="scss">
.WordCloudMetadata {
  .label {
    font-weight: bold;
  }

  .heading,
  .totalMentions {
    margin-bottom: 0.5rem;
  }
}
</style>
