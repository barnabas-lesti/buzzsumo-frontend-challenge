import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from 'vitest';
import { mount, shallowMount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useTopicsStore } from '../../stores/topics';
import { topicMock } from '../../stores/topics/topics.mock';
import WordCloud from './WordCloud.vue';
import WordCloudChart from './WordCloudChart.vue';
import WordCloudMetadata from './WordCloudMetadata.vue';

vi.mock('../../stores/topics', () => ({
  useTopicsStore: vi.fn(() => ({
    fetchTopics: vi.fn(),
    isLoading: false,
    topics: [],
    selectedTopicId: '',
  })),
}));

describe('WordCloud', () => {
  const useTopicsStoreMock = useTopicsStore as unknown as Mock;
  const wrapperOptionsMock = {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })],
    },
  };
  const selectedTopicMock = topicMock;
  const topicsMock = [topicMock];

  let wrapper: VueWrapper;

  describe('When component is mounted', () => {
    const fetchTopicsMock = vi.fn();

    beforeEach(() => {
      useTopicsStoreMock.mockReturnValue({
        fetchTopics: fetchTopicsMock,
        selectedTopic: selectedTopicMock,
        selectedTopicId: selectedTopicMock.id,
        topics: topicsMock,
        isLoading: false,
      });

      wrapper = mount(WordCloud, wrapperOptionsMock);
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('Should render the component', () => {
      expect(WordCloud).toBeTruthy();
      expect(wrapper.classes()).toContain('WordCloud');
      expect(wrapper.find('h1').text()).toContain('My Topics Challenge');
    });

    it('Should fetch the topics', () => {
      expect(fetchTopicsMock).toHaveBeenCalledOnce();
    });

    it('Should render the WordCloud components', () => {
      const wordCloudChartComponent = wrapper.findComponent(WordCloudChart);
      expect(wordCloudChartComponent.exists()).toBeTruthy();
      expect(wordCloudChartComponent.props()).toMatchObject({
        topics: topicsMock,
        selectedTopicId: selectedTopicMock.id,
      });

      const wordCloudMetadataComponent =
        wrapper.findComponent(WordCloudMetadata);
      expect(wordCloudMetadataComponent.exists()).toBeTruthy();
      expect(wordCloudMetadataComponent.props()).toMatchObject({
        topic: topicMock,
      });
    });

    describe('When loading is in progress', () => {
      it('Should render the BaseLoader', () => {
        useTopicsStoreMock.mockReturnValue({
          ...useTopicsStoreMock(),
          isLoading: true,
        });
        wrapper = shallowMount(WordCloud, wrapperOptionsMock);
        expect(
          wrapper.find('.loaderContainer base-loader-stub').exists()
        ).toBeTruthy();
      });
    });

    describe('When topics array is empty', () => {
      it('Should render no topics text', () => {
        useTopicsStoreMock.mockReturnValue({
          ...useTopicsStoreMock(),
          topics: [],
        });
        wrapper = shallowMount(WordCloud, wrapperOptionsMock);
        expect(wrapper.find('.noTopicsContainer').text()).toContain(
          'No Topics to display'
        );
      });
    });

    describe('When the onSelect method is called', () => {
      it('Should select a topic in the store', () => {
        const selectTopicSpy = vi
          .spyOn(WordCloud.methods, 'selectTopic' as never)
          .mockReturnValue({});
        WordCloud.methods?.onSelect(topicMock.id);
        expect(selectTopicSpy).toHaveBeenCalledWith(topicMock.id);
      });
    });
  });
});
