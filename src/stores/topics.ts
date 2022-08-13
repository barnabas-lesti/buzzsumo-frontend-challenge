import { ref } from 'vue';
import { defineStore } from 'pinia';

import type Topic from '../types/Topic';
import http from './utils/http';

const TOPICS_API_URL = 'TODO';

export const useTopicsStore = defineStore('topics', () => {
  const isLoading = ref<boolean>(false);
  const topics = ref<Topic[] | null>(null);
  const selectedTopic = ref<Topic | null>(null);

  function startLoading() {
    isLoading.value = true;
  }

  function stopLoading() {
    isLoading.value = false;
  }

  function selectTopic(topic: Topic) {
    selectedTopic.value = topic;
  }

  function setTopics(newTopics: Topic[]) {
    topics.value = newTopics;
  }

  async function fetchTopics() {
    startLoading();
    const topics = await http.get<Topic[]>(TOPICS_API_URL);
    setTopics(topics);
    stopLoading();
  }

  return { isLoading, topics, selectedTopic, selectTopic, fetchTopics };
});
