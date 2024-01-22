export type ReviewStatus = 'pending' | 'good' | 'bad' | 'postponed';

export type ReviewItem = {
  path: string;
  status: ReviewStatus;
};
