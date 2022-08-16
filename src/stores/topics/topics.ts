import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { env, http } from '../utils';
import type { Topic, TopicSource } from './types';

export const useTopicsStore = defineStore('topics', () => {
  const isLoading = ref<boolean>(false);
  const selectedTopicId = ref<string>('');
  const topics = ref<Topic[]>([]);

  const selectedTopic = computed<Topic | null>(
    () =>
      topics.value.filter((topic) => selectedTopicId.value === topic.id)[0] ||
      null
  );

  function selectTopic(topicId: string): void {
    selectedTopicId.value = topicId;
  }

  async function fetchTopics(): Promise<void> {
    _startLoading();
    const { topics: topicSources } = await http.get<{ topics: TopicSource[] }>(
      env.CLIENT_TOPICS_API_URL
    );
    const topics = _mapTopicSourcesToTopics(topicSources);
    _setTopics(topics);
    _stopLoading();
  }

  function _startLoading(): void {
    isLoading.value = true;
  }

  function _stopLoading(): void {
    isLoading.value = false;
  }

  function _setTopics(newTopics: Topic[]): void {
    topics.value = newTopics;
  }

  function _mapTopicSourcesToTopics(topicSources: TopicSource[]): Topic[] {
    return topicSources.map(
      ({ id, label, volume, sentiment, sentimentScore }) => ({
        id,
        label,
        volume,
        sentiment,
        sentimentScore,
      })
    );
  }

  return {
    isLoading,
    topics,
    selectedTopic,
    selectedTopicId,
    selectTopic,
    fetchTopics,
  };
});
