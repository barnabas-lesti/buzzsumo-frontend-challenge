type Query = {
  id: string;
  name: string;
  volume: number;
};

type Day = {
  date: string;
  volume: number;
};

type Sentiment = {
  negative: number;
  neutral: number;
  positive: number;
};

export type PageType = {
  blog: number;
  facebook: number;
  forum: number;
  general: number;
  image: number;
  news: number;
  review: number;
  twitter: number;
  video: number;
};

export type TopicSource = {
  id: string;
  label: string;
  volume: number;
  type: string;
  sentiment: Sentiment;
  sentimentScore: number;
  burst: number;
  days: Day[];
  pageType: PageType;
  queries: Query[];
};

export type Topic = {
  id: string;
  label: string;
  volume: number;
  sentiment: Sentiment;
  sentimentScore: number;
};
