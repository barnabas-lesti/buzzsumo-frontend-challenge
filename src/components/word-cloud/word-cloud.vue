<script setup lang="ts">
/**
 * WordCloud main component. Displays topics from the application store in a word cloud.
 */

import { onMounted } from 'vue';
import { useTopicsStore } from '@/stores/topics';
import BaseLoader from '../base/base-loader.vue';
import WordCloudChart from './word-cloud-chart.vue';
import WordCloudMetadata from './word-cloud-metadata.vue';

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
  <div class="word-cloud">
    <h1>{{ $t('components.wordCloud.title') }}</h1>

    <div v-if="topicsStore.isLoading" class="loader-container">
      <base-loader />
    </div>
    <div v-else-if="!topicsStore.topics.length" class="no-topics-container">
      {{ $t('components.wordCloud.noTopics') }}
    </div>
    <div v-else class="content">
      <word-cloud-chart
        :topics="topicsStore.topics"
        :selected-topic-id="topicsStore.selectedTopicId"
        @select="onSelect"
        class="chart"
      />
      <word-cloud-metadata
        v-if="topicsStore.selectedTopic"
        :topic="topicsStore.selectedTopic"
        class="metadata"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.word-cloud {
  $chartHeight: 400px;
  $metadataWidth: 350px;
  $gap: 1rem;

  .loader-container,
  .no-topics-container {
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
