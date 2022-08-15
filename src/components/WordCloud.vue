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
    <h1>My Topics Challenge</h1>

    <div v-if="topicsStore.isLoading" class="WordCloud__loaderContainer">
      <BaseLoader />
    </div>
    <div v-else class="WordCloud__content">
      <WordCloudDisplay
        :topics="topicsStore.topics"
        :selectedTopicId="topicsStore.selectedTopicId"
        @select="onSelect"
        class="WordCloud__display"
      />
      <WordCloudMetaData
        v-if="topicsStore.selectedTopic"
        :topic="topicsStore.selectedTopic"
        class="WordCloud__metadata"
      />
    </div>
  </div>
</template>

<style lang="scss">
.WordCloud {
  $metadataWidth: 350px;
  $gap: 1rem;
  $chartHeight: 400px;

  &__loaderContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $chartHeight;
  }

  &__display {
    margin-bottom: $gap;
  }

  @media only screen and (min-width: 768px) {
    &__content {
      display: flex;
      justify-content: space-between;
    }

    &__display {
      width: calc(100% - $metadataWidth - $gap);
    }

    &__metadata {
      width: $metadataWidth;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
