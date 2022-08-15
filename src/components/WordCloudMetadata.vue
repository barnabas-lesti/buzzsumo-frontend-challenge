<script lang="ts">
import WordCloudMetadataMention from './WordCloudMetadataMention.vue';

import type Topic from '../types/Topic';
</script>

<script setup lang="ts">
const props = defineProps<{ topic: Topic }>();
</script>

<template>
  <div class="WordCloudMetadata">
    <div class="WordCloudMetadata__heading">
      Information on topic
      <span class="WordCloudMetadata__label">"{{ props.topic.label }}"</span>:
    </div>
    <WordCloudMetadataMention
      :count="props.topic.volume"
      label="Total Mentions"
      class="WordCloudMetadata__totalMentions"
    />
    <WordCloudMetadataMention
      :count="props.topic.sentiment.positive"
      label="Positive Mentions"
      type="positive"
    />
    <WordCloudMetadataMention
      :count="props.topic.sentiment.neutral"
      label="Neutral Mentions"
    />
    <WordCloudMetadataMention
      :count="props.topic.sentiment.negative"
      label="Negative Mentions"
      type="negative"
    />
  </div>
</template>

<style lang="scss">
.WordCloudMetadata {
  &__label {
    font-weight: bold;
  }

  &__heading,
  &__totalMentions {
    margin-bottom: 0.5rem;
  }
}
</style>
