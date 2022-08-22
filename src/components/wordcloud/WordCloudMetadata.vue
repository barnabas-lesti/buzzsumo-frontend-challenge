<script lang="ts">
import { defineComponent, type PropType } from 'vue';

import type { Topic } from '../../stores/topics';
import WordCloudMetadataMention from './WordCloudMetadataMention.vue';

/**
 * WordCloud topic metadata display controlled component.
 */
export default defineComponent({
  components: {
    WordCloudMetadataMention,
  },

  props: {
    /**
     * Topic to display the metadata for.
     * @required
     */
    topic: {
      required: true,
      type: Object as PropType<Topic>,
    },
  },
});
</script>

<template>
  <div class="WordCloudMetadata">
    <div class="heading">
      {{ $t('wordcloud.metadata.info') }}
      <span class="label">"{{ topic.label }}"</span>:
    </div>
    <WordCloudMetadataMention
      :count="topic.volume"
      :label="$t('wordcloud.metadata.mentions.total')"
      class="totalMentions"
    />
    <WordCloudMetadataMention
      :count="topic.sentiment.positive"
      :label="$t('wordcloud.metadata.mentions.positive')"
      label="Positive Mentions"
      type="positive"
    />
    <WordCloudMetadataMention
      :count="topic.sentiment.neutral"
      :label="$t('wordcloud.metadata.mentions.neutral')"
      label="Neutral Mentions"
    />
    <WordCloudMetadataMention
      :count="topic.sentiment.negative"
      :label="$t('wordcloud.metadata.mentions.negative')"
      label="Negative Mentions"
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
