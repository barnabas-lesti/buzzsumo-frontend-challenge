/**
 * Topic model containing only properties that are used on the client side.
 */
export interface Topic {
  id: string;
  label: string;
  volume: number;
  sentiment: Sentiment;
  sentimentScore: number;
}

/**
 * Full topic model loaded from the API, containing all properties of a Topic.
 */
export interface TopicSource extends Topic {
  type: string;
  burst: number;
  days: Day[];
  pageType: PageType;
  queries: Query[];
}

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

type PageType = {
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
