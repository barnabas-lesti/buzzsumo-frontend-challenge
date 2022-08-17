import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type SpyInstance,
} from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import * as Highcharts from 'highcharts';

import {
  greenTopicMock,
  greyTopicMock,
  redTopicMock,
} from '../../stores/topics/topics.mock';
import WordCloudChart from './WordCloudChart.vue';

vi.mock('highcharts', () => ({
  chart: vi.fn(),
}));

vi.mock('highcharts/modules/wordcloud', () => ({
  default: vi.fn(),
}));

describe('WordCloudChart', () => {
  const topicsMock = [redTopicMock, greyTopicMock, greenTopicMock];
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

    afterEach(() => {
      vi.clearAllMocks();
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
            events: {
              click: expect.any(Function),
            },
          },
        ],
      });
    });
  });
});
