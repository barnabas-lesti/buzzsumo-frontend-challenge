import type { RouteRecordRaw } from 'vue-router';
import { WordCloud } from '@/components/word-cloud';

export default [
  { name: 'word-cloud', path: '/wordcloud', component: WordCloud },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: { name: 'word-cloud' },
  },
] as RouteRecordRaw[];
