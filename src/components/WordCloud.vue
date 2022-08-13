<script setup lang="ts">
import BaseLoader from './BaseLoader.vue';
import WordCloudDisplay from './WordCloudDisplay.vue';
import WordCloudMetaData from './WordCloudMetaData.vue';

import { useTopicsStore } from '../stores/topics';

const topicsStore = useTopicsStore();
topicsStore.fetchTopics();
</script>

<template>
  <div class="WordCloud">
    <div v-if="topicsStore.isLoading" class="WordCloud__loaderContainer">
      <BaseLoader />
    </div>
    <div v-else class="WordCloud__content">
      <WordCloudDisplay :topics="topicsStore.topics" />
      <WordCloudMetaData :topic="topicsStore.selectedTopic" />
    </div>
  </div>
</template>

<style lang="scss"></style>
