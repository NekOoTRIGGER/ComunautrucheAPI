export type Topic = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  user: {
    name: string;
  };
  topicTags: {
    name: string;
  }[];
};