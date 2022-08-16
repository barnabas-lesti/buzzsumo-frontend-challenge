import { beforeEach, describe, expect, it, vi, type SpyInstance } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import * as Highcharts from 'highcharts';

vi.mock('highcharts', () => ({
  chart: vi.fn(),
}));

vi.mock('highcharts/modules/wordcloud', () => ({
  default: vi.fn(),
}));

import WordCloudChart from './WordCloudChart.vue';
import type { Topic } from '../../stores/topics/types';

describe('WordCloudChart', () => {
  const redTopicMock: Topic = {
    sentimentScore: 35,
    label: 'redTopicMock',
    volume: 30,
    sentiment: {
      positive: 5,
      neutral: 10,
      negative: 15,
    },
    id: 'redTopicMockId',
  };
  const greyTopicMock: Topic = {
    sentimentScore: 50,
    label: 'greyTopicMock',
    volume: 30,
    sentiment: {
      positive: 5,
      neutral: 10,
      negative: 15,
    },
    id: 'greyTopicMockId',
  };
  const greenTopicMock: Topic = {
    sentimentScore: 70,
    label: 'greenTopicMock',
    volume: 30,
    sentiment: {
      positive: 5,
      neutral: 10,
      negative: 15,
    },
    id: 'greenTopicMockId',
  };
  const topicsMock: Topic[] = [redTopicMock, greyTopicMock, greenTopicMock];
  const selectedTopicIdMock = redTopicMock.id;

  let wrapper: VueWrapper;
  let chartSpy: SpyInstance;

  describe('When a valid topic is provided', () => {
    beforeEach(() => {
      chartSpy = vi.spyOn(Highcharts, 'chart');
      wrapper = mount(WordCloudChart, {
        props: {
          selectedTopicId: selectedTopicIdMock,
          topics: topicsMock,
        },
      });
    });

    it('Should render the container', () => {
      expect(WordCloudChart).toBeTruthy();
      expect(wrapper.classes()).toContain('WordCloudChart');
    });

    it('Should initialize Highcharts', () => {
      expect(chartSpy).toHaveBeenCalledWith(wrapper.element, {
        accessibility: {
          enabled: false,
        },
        title: {
          text: '',
        },
        tooltip: {
          enabled: false,
        },
        series: [
          {
            rotation: {
              from: 0,
              to: 0,
            },
            animation: false,
            allowPointSelect: true,
            cursor: 'pointer',
            type: 'wordcloud',
            minFontSize: 14,
            maxFontSize: 20,
            style: { fontFamily: `'Nunito', sans-serif`, fontWeight: '500' },
            data: [
              expect.objectContaining({ color: 'red', selected: true }),
              expect.objectContaining({ color: 'grey', selected: false }),
              expect.objectContaining({ color: 'green', selected: false }),
            ],
            events: expect.anything(),
          },
        ],
      });
    });
  });
});
