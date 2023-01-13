export interface HotStories {
  thumbnail: string;
  title: string;
  link: string;
  lastestChaper: string;
  updatedAt: string;
}

export interface NewlyUpdatedStories {
  thumbnail: string;
  views: string;
  likes: string;
  title: string;
  comments: number;
  link: string;
  shortDescription: string;
  details: {
    otherName?: string[];
    genres?: string[];
    status?: string;
  };
  updatedAt: string;
  isTrending: boolean;
  lastestChaper: number;
}
