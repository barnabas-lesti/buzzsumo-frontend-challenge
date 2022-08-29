<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';

import { useTopicsStore } from '../../stores/topics';
import BaseLoader from '../base/BaseLoader.vue';
import WordCloudChart from './WordCloudChart.vue';
import WordCloudMetadata from './WordCloudMetadata.vue';

/**
 * WordCloud main component. Displays topics from the application store in a word cloud.
 */
export default defineComponent({
  components: {
    BaseLoader,
    WordCloudChart,
    WordCloudMetadata,
  },

  computed: {
    ...mapState(useTopicsStore, [
      'isLoading',
      'topics',
      'selectedTopicId',
      'selectedTopic',
    ]),
  },

  methods: {
    ...mapActions(useTopicsStore, ['selectTopic', 'fetchTopics']),

    /**
     * Handles the topic selection event.
     * @param topicId ID of the selected topic.
     */
    onSelect(topicId: string) {
      this.selectTopic(topicId);
    },
  },

  mounted() {
    this.fetchTopics();
  },
});
</script>

<template>
  <div class="WordCloud">
    <h1>{{ $t('wordcloud.title') }}</h1>

    <div v-if="isLoading" class="loaderContainer">
      <BaseLoader />
    </div>
    <div v-else-if="!topics.length" class="noTopicsContainer">
      {{ $t('wordcloud.noTopics') }}
    </div>
    <div v-else class="content">
      <WordCloudChart
        :topics="topics"
        :selectedTopicId="selectedTopicId"
        @select="onSelect"
        class="chart"
      />
      <WordCloudMetadata
        v-if="selectedTopic"
        :topic="selectedTopic"
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
