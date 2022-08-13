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
  const topics = ref<Topic[]>([]);

  function setTopics(newTopics: Topic[]) {
    topics.value = newTopics;
  }

  async function fetchTopics() {
    const topics = await http.get<Topic[]>(TOPICS_API_URL);
    setTopics(topics);
  }

  return { topics, setTopics, fetchTopics };
});
