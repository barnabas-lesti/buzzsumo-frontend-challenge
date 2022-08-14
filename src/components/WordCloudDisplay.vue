<script setup lang="ts">
import { onMounted } from 'vue';
import * as Highcharts from 'highcharts';
import WordCloud from 'highcharts/modules/wordcloud';

import type Topic from '../types/Topic';

type WorldCloudData = ([string | number] | Highcharts.PointOptionsObject)[];

WordCloud(Highcharts);

const props = defineProps<{ uid: string; topics: Topic[] }>();
const containerId = `wordclooud_container_${props.uid}`;

function convertTopicsToChartData(topics: Topic[]): WorldCloudData {
  return topics.map((topic) => ({
    name: topic.label,
    id: topic.id,
  }));
}

function createWordCloud(data: WorldCloudData) {
  return Highcharts.chart(containerId, {
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
        name: 'Topics',
        animation: false,
        allowPointSelect: true,
        centerInCategory: true,
        cursor: 'pointer',
        type: 'wordcloud',
        data,
      },
    ],
  });
}

function listenToTopicSelect(worldCloud: Highcharts.Chart) {
  document.getElementById(containerId)?.addEventListener('click', () => {
    console.log(worldCloud.getSelectedPoints()[0]);
  });
}

onMounted(() => {
  const data = convertTopicsToChartData(props.topics);
  const worldCloud = createWordCloud(data);
  listenToTopicSelect(worldCloud);
});
</script>

<template>
  <div class="WordCloudDisplay">
    {{ JSON.stringify(props.topics) }}

    <div :id="containerId" class="WordCloudDisplay__chart"></div>
  </div>
</template>

<style lang="scss"></style>
