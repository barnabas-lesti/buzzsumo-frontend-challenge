import { beforeEach, describe, expect, it } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';

import WordCloudMetadata from './WordCloudMetadata.vue';
import type { Topic } from '../../stores/topics/types';

describe('WordCloudMetadata', () => {
  const topicMock: Topic = {
    label: 'labelMock',
    volume: 30,
    sentiment: {
      positive: 5,
      neutral: 10,
      negative: 15,
    },
    id: '',
    sentimentScore: 0,
  };

  let wrapper: VueWrapper;

  describe('When a valid topic is provided', () => {
    beforeEach(() => {
      wrapper = shallowMount(WordCloudMetadata, {
        props: {
          topic: topicMock,
        },
      });
    });

    it('Should render the container', () => {
      expect(WordCloudMetadata).toBeTruthy();
      expect(wrapper.classes()).toContain('WordCloudMetadata');
    });

    it('Should render the heading with the topic label', () => {
      expect(wrapper.find('.heading').text()).toEqual(
        `Information on topic "${topicMock.label}":`
      );
    });

    it('Should render WordCloudMetadataMention components with appropriate props', () => {
      const [
        totalMentionsStub,
        positiveMentionsStub,
        neutralMentionsStub,
        negativeMentionsStub,
      ] = wrapper.findAll('word-cloud-metadata-mention-stub');

      expect(totalMentionsStub.attributes()).toMatchObject({
        count: topicMock.volume.toString(),
        label: 'Total Mentions',
        class: 'totalMentions',
      });
      expect(positiveMentionsStub.attributes()).toMatchObject({
        count: topicMock.sentiment.positive.toString(),
        label: 'Positive Mentions',
        type: 'positive',
      });
      expect(neutralMentionsStub.attributes()).toMatchObject({
        count: topicMock.sentiment.neutral.toString(),
        label: 'Neutral Mentions',
      });
      expect(negativeMentionsStub.attributes()).toMatchObject({
        count: topicMock.sentiment.negative.toString(),
        label: 'Negative Mentions',
        type: 'negative',
      });
    });
  });
});
