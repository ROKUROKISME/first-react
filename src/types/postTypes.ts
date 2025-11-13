import type { Category } from "./categoryTypes";

export interface Post {
  id: number;
  category: Category,
  title: string;
  slug: string;
  content: string;
  image: string;
  status: string;
  published_at: string;
}

export interface PostFormData {
  category?: number | null;
  title: string;
  slug?: string | null;
  content: string;
  image: string;
  status?: string | null;
  published_at?: string | null;
}
