import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { setActivePinia, createPinia, type Store } from 'pinia';
import { useTopicsStore } from './topics';

import { http } from '../utils';
import type { TopicSource, PageType, Topic } from './types';

vi.mock('../utils', () => ({
  env: {},
  http: {
    get: vi.fn(),
  },
}));

describe('topics', () => {
  const httpGetMock = http.get as unknown as Mock;
  const topicMock: Topic = {
    id: 'topicMock',
    sentimentScore: 35,
    label: 'topicMock',
    volume: 30,
    sentiment: {
      positive: 5,
      neutral: 10,
      negative: 15,
    },
  };
  const topicSourceMock: TopicSource = {
    ...topicMock,
    type: 'type',
    burst: 10,
    days: [],
    pageType: {} as PageType,
    queries: [],
  };
  const topicSourcesMock = [topicSourceMock];

  beforeEach(async () => {
    createPinia();
    setActivePinia(createPinia());
    httpGetMock.mockResolvedValue({ topics: topicSourcesMock });
  });

  it('Should expose the useTopicsStore function', () => {
    const topicsStore = useTopicsStore();
    expect(topicsStore).toBeDefined();
  });

  it('Should be able to fetch and map topics', async () => {
    const topicsStore = useTopicsStore();

    expect(topicsStore.isLoading).toEqual(false);
    expect(topicsStore.topics).toEqual([]);

    await topicsStore.fetchTopics();
    expect(topicsStore.topics).toEqual([topicMock]);
  });

  describe('When selecting a topic', () => {
    it('Should be able to set a selected topic', async () => {
      const topicsStore = useTopicsStore();
      await topicsStore.fetchTopics();

      topicsStore.selectTopic(topicMock.id);

      expect(topicsStore.selectedTopicId).toBe(topicMock.id);
      expect(topicsStore.selectedTopic).toStrictEqual(topicMock);
    });

    it('Should set null if topic id is not found in the topics', () => {
      const topicsStore = useTopicsStore();
      topicsStore.selectTopic(topicMock.id);
      expect(topicsStore.selectedTopic).toStrictEqual(null);
    });
  });
});
