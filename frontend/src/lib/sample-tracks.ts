export interface FeaturedSong {
  id: string;
  title: string;
  prompt: string;
  thumbnailUrl: string | null;
  categories: Array<{ id: string; name: string }>;
  user: { name: string | null };
  likeCount: number;
}
