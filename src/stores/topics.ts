import { ref } from 'vue';
import { defineStore } from 'pinia';

import http from './utils/http';

type Query = {
  id: string;
  name: string;
  volume: number;
};

type PageType = {
  blog: number;
  facebook: number;
  forum: number;
  general: number;
  image: number;
  news: number;
  review: number;
  twitter: number;
  video: number;
};

type Day = {
  date: string;
  volume: number;
};

type Sentiment = {
  negative: number;
  neutral: number;
  positive: number;
};

type Topic = {
  id: string;
  label: string;
  volume: number;
  type: string;
  sentiment: Sentiment;
  sentimentScore: 65;
  burst: number;
  days: Day[];
  pageType: PageType;
  queries: Query[];
};

const TOPICS_API_URL = 'TODO';

export const useTopicsStore = defineStore('topics', () => {
  const isLoading = ref<boolean>(false);
  const topics = ref<Topic[]>([]);

  function startLoading() {
    isLoading.value = true;
  }

  function stopLoading() {
    isLoading.value = false;
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

  return { topics, isLoading, fetchTopics };
});
