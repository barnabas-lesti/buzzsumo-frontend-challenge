<script lang="ts">
import { ref, onMounted } from 'vue';
import * as Highcharts from 'highcharts';
import WordCloud from 'highcharts/modules/wordcloud';

import type { Topic } from '../../stores/topics/types';

interface TopicPoint extends Highcharts.Point {
  id: string;
}

enum TopicColor {
  GREY = 'grey',
  RED = 'red',
  GREEN = 'green',
}

enum WordCloudEvent {
  SELECT = 'select',
}
</script>

<script setup lang="ts">
const props = defineProps<{ selectedTopicId: string; topics: Topic[] }>();
const chartElement = ref<HTMLElement>();
const emit = defineEmits<{ (e: WordCloudEvent.SELECT, id: string): void }>();

/**
 * Returns with the appropriate color for a topic based on the sentiment score provided.
 * @param sentimentScore Sentiment score of a topic.
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
 */
function convertTopicsToChartData(
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
        states: {
          select: {
            color: '',
          },
        },
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
        data,
        events: {
          click(event) {
            const { id } = event.point as TopicPoint;
            emit(WordCloudEvent.SELECT, props.selectedTopicId !== id ? id : '');
          },
        },
      },
    ],
  });
}

onMounted(() => {
  const data = convertTopicsToChartData(props.topics, props.selectedTopicId);
  createWordCloud(chartElement.value as HTMLElement, data);
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
