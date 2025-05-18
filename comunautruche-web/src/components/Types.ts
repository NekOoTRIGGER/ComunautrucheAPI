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
  email: string;
  pseudo: string;
};


export type Post = {
  id: number;
  content: string;
  postedAt: string; // ISO 8601 date string
  title: string;
  image: string;
  topicId: number;
  topic: {
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

  userId: number;
  user: {
    id: number;
    pseudo: string;
  };

  votes: {
    id: number;
    userId: number;
    value: number; // +1 or -1 typically
  }[];
};