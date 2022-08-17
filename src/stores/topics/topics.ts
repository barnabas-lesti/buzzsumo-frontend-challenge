import { defineStore } from 'pinia';

import { env, http } from '../utils';
import type { Topic, TopicSource } from './types';

/**
 * Topics store factory function.
 */
export const useTopicsStore = defineStore('topics', {
  state: () => ({
    /**
     * Loading state indicator of the topics.
     */
    isLoading: false,

    /**
     * ID of the selected topic.
     */
    selectedTopicId: '',

    /**
     * Loaded topics array.
     */
    topics: [] as Topic[],
  }),

  getters: {
    /**
     * Selected topics getter that filters the `topics` array using the `selectedTopicId`.
     * @param state Root state.
     */
    selectedTopic: (state) =>
      state.topics.filter((topic) => state.selectedTopicId === topic.id)[0] ||
      null,
  },

  actions: {
    /**
     * Sets the `selectedTopicId` in the store.
     * @param topicId ID of the selected topic.
     */
    selectTopic(topicId: string) {
      this.selectedTopicId = topicId;
    },

    /**
     * Asynchronously loads the topics from an external API based on the `CLIENT_TOPICS_API_URL` environment
     * variable and maps the `TopicSource`-s to `Topic`-s.
     */
    async fetchTopics() {
      this._startLoading();

      const { topics: topicSources } = await http.get<{
        topics: TopicSource[];
      }>(env.CLIENT_TOPICS_API_URL);
      const topics = this._mapTopicSourcesToTopics(topicSources);
      this._setTopics(topics);

      this._stopLoading();
    },

    /**
     * Sets the `isLoading` flag to `true`.
     * @private
     */
    _startLoading() {
      this.isLoading = true;
    },

    /**
     * Sets the `isLoading` flag to `false`.
     * @private
     */
    _stopLoading() {
      this.isLoading = false;
    },

    /**
     * Sets the states `topics` array with the provided `newTopics` argument.
     * @param newTopics New topics array.
     * @private
     */
    _setTopics(newTopics: Topic[]) {
      this.topics = newTopics;
    },

    /**
     * Converts a `TopicSource` array to a `Topic` array that only
     * has properties what is used on the client side.
     * @param topicSources `TopicSource` array.
     * @private
     */
    _mapTopicSourcesToTopics(topicSources: TopicSource[]): Topic[] {
      return topicSources.map(
        ({ id, label, volume, sentiment, sentimentScore }) => ({
          id,
          label,
          volume,
          sentiment,
          sentimentScore,
        })
      );
    },
  },
});
