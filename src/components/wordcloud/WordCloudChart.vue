<script setup lang="ts">
/**
 * WordCloud chart display controlled component.
 */

import { onMounted, ref, type PropType } from 'vue';
import * as Highcharts from 'highcharts';
import WordCloud from 'highcharts/modules/wordcloud';
import type { Topic } from '../../stores/topics';

interface TopicPoint extends Highcharts.Point {
  id: string;
}

enum TopicColor {
  GREY = 'grey',
  RED = 'red',
  GREEN = 'green',
}

const chartElement = ref<HTMLElement | null>(null);

const props = defineProps({
  /**
   * Selected topics ID.
   * @required
   */
  selectedTopicId: {
    required: true,
    type: String,
  },

  /**
   * Topics to display in the word cloud.
   * @required
   */
  topics: {
    required: true,
    type: Array as PropType<Topic[]>,
  },
});

const emit = defineEmits({
  /**
   * Emits the `select` event when a word is selected (clicked) in the word cloud.
   * @param topicId Selected topics ID.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  select: (topicId: string) => true,
});

/**
 * Returns with the appropriate color for a topic based on the sentiment score provided.
 * @param sentimentScore Sentiment score of a topic.
 * @returns Color of the topic.
 */
function getTopicColor(sentimentScore: number): TopicColor {
  if (sentimentScore > 60) {
    return TopicColor.GREEN;
  }
  if (sentimentScore < 40) {
    return TopicColor.RED;
  }
  return TopicColor.GREY;
}

/**
 * Maps the fields of topics to the required fields of the chart data points.
 * @param topics Topics to map to chart data points.
 * @param selectedTopicId The currently selected topic.
 * @returns Word cloud compatible data points.
 */
function mapTopicsToChartData(
  topics: Topic[],
  selectedTopicId: string
): Highcharts.PointOptionsObject[] {
  return topics.map((topic) => ({
    name: topic.label,
    id: topic.id,
    weight: topic.volume,
    selected: topic.id === selectedTopicId,
    color: getTopicColor(topic.sentimentScore),
  }));
}

/**
 * Handles word click events and emits the `select` event with the topic ID.
 * @param event Event passed to the handler by highcharts.
 */
function onWordClick(event: Highcharts.SeriesClickEventObject) {
  const { id } = event.point as TopicPoint;
  emit('select', props.selectedTopicId !== id ? id : '');
}

/**
 * Configures and renders the wordcloud chart.
 * @param container Element used to render the wordcloud.
 * @param data Data points of the wordcloud chart.
 */
function createWordCloud(
  container: HTMLElement,
  data: Highcharts.PointOptionsObject[]
): void {
  WordCloud(Highcharts);
  Highcharts.chart(container, {
    accessibility: { enabled: false },
    title: { text: '' },
    tooltip: { enabled: false },
    series: [
      {
        states: { select: { color: '' } },
        rotation: { from: 0, to: 0 },
        animation: false,
        allowPointSelect: true,
        cursor: 'pointer',
        type: 'wordcloud',
        minFontSize: 15,
        maxFontSize: 20,
        style: { fontFamily: `'Nunito', sans-serif`, fontWeight: '500' },
        data,
        events: { click: onWordClick },
      },
    ],
  });
}

onMounted(() => {
  const chartData = mapTopicsToChartData(props.topics, props.selectedTopicId);
  createWordCloud(chartElement.value as HTMLElement, chartData);
});
</script>

<template>
  <div class="WordCloudChart" ref="chartElement"></div>
</template>

<style scoped lang="scss">
.WordCloudChart {
  &:deep(.highcharts-point-select) {
    text-decoration: underline;
  }
}
</style>
