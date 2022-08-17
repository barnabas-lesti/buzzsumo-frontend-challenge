<script lang="ts">
import { defineComponent } from 'vue';

import WordCloud from './components/wordcloud/WordCloud.vue';

/**
 * Main application component.
 */
export default defineComponent({
  components: {
    WordCloud,
  },
});
</script>

<template>
  <div class="App">
    <WordCloud />
  </div>
</template>
