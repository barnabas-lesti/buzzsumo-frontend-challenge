import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { env, http } from '../utils';
import type { Topic, TopicSource } from './types';

/**
 * Topics store factory function.
 */
export const useTopicsStore = defineStore('topics', () => {
  /**
   * Loading state indicator of the topics.
   */
  const isLoading = ref(false);

  /**
   * ID of the selected topic.
   */
  const selectedTopicId = ref('');

  /**
   * Loaded topics array.
   */
  const topics = ref<Topic[]>([]);

  /**
   * Selected topics getter that filters the `topics` array using the `selectedTopicId`.
   * @param state Root state.
   */
  const selectedTopic = computed(
    () =>
      topics.value.filter((topic) => selectedTopicId.value === topic.id)[0] ||
      null
  );

  /**
   * Sets the `selectedTopicId` in the store.
   * @param topicId ID of the selected topic.
   */
  function selectTopic(topicId: string) {
    selectedTopicId.value = topicId;
  }

  /**
   * Asynchronously loads the topics from an external API based on the `CLIENT_TOPICS_API_URL` environment
   * variable and maps the `TopicSource`-s to `Topic`-s.
   */
  async function fetchTopics() {
    _startLoading();

    const { topics: topicSources } = await http.get<{
      topics: TopicSource[];
    }>(env.CLIENT_TOPICS_API_URL);
    const topics = _mapTopicSourcesToTopics(topicSources);
    _setTopics(topics);

    _stopLoading();
  }

  /**
   * Sets the `isLoading` flag to `true`.
   * @private
   */
  function _startLoading() {
    isLoading.value = true;
  }

  /**
   * Sets the `isLoading` flag to `false`.
   * @private
   */
  function _stopLoading() {
    isLoading.value = false;
  }

  /**
   * Sets the states `topics` array with the provided `newTopics` argument.
   * @param newTopics New topics array.
   * @private
   */
  function _setTopics(newTopics: Topic[]) {
    topics.value = newTopics;
  }

  /**
   * Converts a `TopicSource` array to a `Topic` array that only
   * has properties what is used on the client side.
   * @param topicSources `TopicSource` array.
   * @private
   */
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
    selectedTopicId,
    topics,
    selectedTopic,
    selectTopic,
    fetchTopics,
  };
});
