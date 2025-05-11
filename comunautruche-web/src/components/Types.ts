export type Topic = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  user: {
    id: number;
    pseudo: string;
  };
  topicTags: {
    id: number;
    name: string;
  }[];
};

export type AuthenticatedUser = {
  username: string;
  pseudo: string;
};
