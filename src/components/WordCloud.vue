<script setup lang="ts">
import BaseLoader from './BaseLoader.vue';
import WordCloudDisplay from './WordCloudDisplay.vue';
import WordCloudMetaData from './WordCloudMetadata.vue';

import { useTopicsStore } from '../stores/topics';

const topicsStore = useTopicsStore();
topicsStore.fetchTopics();

function onSelect(id: string) {
  topicsStore.selectTopic(id);
}
</script>

<template>
  <div class="WordCloud">
    <div v-if="topicsStore.isLoading" class="WordCloud__loaderContainer">
      <BaseLoader />
    </div>
    <div v-else class="WordCloud__content">
      <WordCloudDisplay
        :topics="topicsStore.topics"
        :selectedTopicId="topicsStore.selectedTopicId"
        @select="onSelect"
      />
      <WordCloudMetaData :topic="topicsStore.selectedTopic" />
    </div>
  </div>
</template>

<style lang="scss">
.WordCloud {
  &__loaderContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;
  }
}
</style>
