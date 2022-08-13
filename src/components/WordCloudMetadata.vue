<script setup lang="ts">
import type Topic from '../types/Topic';

const props = defineProps<{ topic: Topic | null }>();
</script>

<template>
  <div class="WordCloudMetadata">
    {{ JSON.stringify(props.topic) }}
  </div>
</template>

<style lang="scss"></style>
