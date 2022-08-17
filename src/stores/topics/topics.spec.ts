import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { http } from '../utils';
import { useTopicsStore } from './topics';
import { topicMock, topicSourcesMock } from './topics.mock';

vi.mock('../utils', () => ({
  env: {},
  http: {
    get: vi.fn(),
  },
}));

describe('topics', () => {
  const httpGetMock = http.get as unknown as Mock;

  beforeEach(async () => {
    createPinia();
    setActivePinia(createPinia());
    httpGetMock.mockResolvedValue({ topics: topicSourcesMock });
  });

  afterEach(() => {
    vi.resetAllMocks();
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
