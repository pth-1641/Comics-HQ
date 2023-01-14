export interface Story {
  thumbnail: string;
  views: string;
  likes: string;
  title: string;
  comments: string;
  link: string;
  shortDescription: string;
  updatedAt: string;
  isTrending: boolean;
  lastestChapter: number;
  otherName?: string[];
  genres?: string[];
  status?: string;
}

export interface StoryDetails {
  title?: string;
  thumbnail?: string;
  otherNames?: string[];
  author?: string;
  status?: string;
  genres?: {
    label: string;
    link: string;
  }[];
  totalViews?: number;
  totalLikes?: number;
  totalRating?: number;
  rating?: number;
  shortDescription?: string;
  chapters?: {
    label: string;
    chapterLink: string;
    updatedAt: string;
    views: number;
  }[];
}
