<script setup lang="ts">
import type Topic from '../types/Topic';

const props = defineProps<{ topics: Topic[] | null }>();
</script>

<template>
  <div class="WordCloudDisplay">
    {{ JSON.stringify(props.topics) }}
  </div>
</template>

<style lang="scss"></style>
