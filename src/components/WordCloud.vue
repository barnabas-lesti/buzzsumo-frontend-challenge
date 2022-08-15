<script setup lang="ts">
import BaseLoader from './BaseLoader.vue';
import WordCloudChart from './WordCloudChart.vue';
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

    <div v-if="topicsStore.isLoading" class="loaderContainer">
      <BaseLoader />
    </div>
    <div v-else class="content">
      <WordCloudChart
        :topics="topicsStore.topics"
        :selectedTopicId="topicsStore.selectedTopicId"
        @select="onSelect"
        class="chart"
      />
      <WordCloudMetaData
        v-if="topicsStore.selectedTopic"
        :topic="topicsStore.selectedTopic"
        class="metadata"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.WordCloud {
  $chartHeight: 400px;
  $metadataWidth: 350px;
  $gap: 1rem;

  .loaderContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $chartHeight;
  }

  .chart {
    margin-bottom: $gap;
  }

  @media only screen and (min-width: 768px) {
    .content {
      display: flex;
      justify-content: space-between;
    }

    .chart {
      width: calc(100% - $metadataWidth - $gap);
    }

    .metadata {
      width: $metadataWidth;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
