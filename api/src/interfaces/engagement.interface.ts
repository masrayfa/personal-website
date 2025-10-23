export interface IEngagement {
  id: number;
  contentId: number;
  likes: number | null;
  claps: number | null;
}

export interface IEngagementCreate {
  contentId: number;
}

export interface IEngagementUpdate {
  likes?: number;
  claps?: number;
}
