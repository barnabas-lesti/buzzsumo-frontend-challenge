import type { Topic, TopicSource } from './types';

export const topicMock: Topic = {
  id: 'topicMock',
  sentimentScore: 35,
  label: 'topicMock',
  volume: 30,
  sentiment: {
    positive: 5,
    neutral: 10,
    negative: 15,
  },
};

export const redTopicMock: Topic = {
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

export const greyTopicMock: Topic = {
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

export const greenTopicMock: Topic = {
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

export const topicSourceMock: TopicSource = {
  ...topicMock,
  type: 'type',
  burst: 10,
  days: [],
  pageType: {
    blog: 32,
    facebook: 23,
    forum: 23,
    general: 54,
    image: 43,
    news: 3,
    review: 2,
    twitter: 54,
    video: 2,
  },
  queries: [],
};

export const topicSourcesMock = [topicSourceMock];
