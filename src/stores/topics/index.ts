import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import http from '../utils/http';
import type { Topic } from './types';

const TOPICS_API_URL = 'TODO';

export const useTopicsStore = defineStore('topics', () => {
  const isLoading = ref<boolean>(false);
  const selectedTopicId = ref<string>('');
  const topics = ref<Topic[]>([]);

  const selectedTopic = computed<Topic | null>(
    () =>
      topics.value.filter((topic) => selectedTopicId.value === topic.id)[0] ||
      null
  );

  function startLoading(): void {
    isLoading.value = true;
  }

  function stopLoading(): void {
    isLoading.value = false;
  }

  function selectTopic(topicId: string): void {
    selectedTopicId.value = topicId;
  }

  function setTopics(newTopics: Topic[]): void {
    topics.value = newTopics;
  }

  async function fetchTopics(): Promise<void> {
    startLoading();
    const topics = await http.get<Topic[]>(TOPICS_API_URL);
    setTopics(topics);
    stopLoading();
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
