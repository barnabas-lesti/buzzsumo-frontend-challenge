<script setup lang="ts">
/**
 * WordCloud main component. Displays topics from the application store in a word cloud.
 */

import { onMounted } from 'vue';
import { useTopicsStore } from '../../stores/topics';
import BaseLoader from '../base/BaseLoader.vue';
import WordCloudChart from './WordCloudChart.vue';
import WordCloudMetadata from './WordCloudMetadata.vue';

const topicsStore = useTopicsStore();

/**
 * Handles the topic selection event.
 * @param topicId ID of the selected topic.
 */
function onSelect(topicId: string) {
  topicsStore.selectTopic(topicId);
}

onMounted(() => {
  topicsStore.fetchTopics();
});
</script>

<template>
  <div class="WordCloud">
    <h1>{{ $t('wordcloud.title') }}</h1>

    <div v-if="topicsStore.isLoading" class="loaderContainer">
      <BaseLoader />
    </div>
    <div v-else-if="!topicsStore.topics.length" class="noTopicsContainer">
      {{ $t('wordcloud.noTopics') }}
    </div>
    <div v-else class="content">
      <WordCloudChart
        :topics="topicsStore.topics"
        :selectedTopicId="topicsStore.selectedTopicId"
        @select="onSelect"
        class="chart"
      />
      <WordCloudMetadata
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

  .loaderContainer,
  .noTopicsContainer {
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
