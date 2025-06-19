/** @format */

// types/DashboardTypes.ts

export interface DashboardStats {
  total_books: number;
  total_book_files: number;
  total_categories: number;
  total_collections: number;
  file_type_distribution: Record<string, number>;
}

export interface RecentBook {
  id: string;
  title: string;
  author: string;
  year: string;
  publisher?: string;
  cover_image?: string;
  file_types: string[];
  categories: string[];
  created_at: string;
}

export interface PopularCategory {
  id: string;
  category_nm: string;
  book_count: number;
}

export interface ReadingProgressSummary {
  id: string;
  book_title: string;
  book_author: string;
  book_cover?: string;
  file_type: string;
  completion_percentage: number;
  last_read: string;
}

export interface RecentActivity {
  type: "bookmark" | "annotation" | "reading";
  title: string;
  book_title: string;
  timestamp: string;
  details: Record<string, any>;
}

export interface UserStats {
  collections_count: number;
  bookmarks_count: number;
  annotations_count: number;
  avg_completion_percentage: number;
  books_in_progress: number;
  books_completed: number;
}

export interface UserCollection {
  id: string;
  name: string;
  description?: string;
  book_count: number;
  created_at: string;
}

export interface ReadingStats {
  books_read_this_month: number;
  reading_target: number;
  target_progress: number;
}

export interface DashboardData {
  // General stats
  total_books: number;
  total_book_files: number;
  total_categories: number;
  total_collections: number;
  file_type_distribution: Record<string, number>;

  // Recent data
  recent_books: RecentBook[];
  popular_categories: PopularCategory[];

  // User-specific data (optional)
  user_stats?: UserStats;
  reading_progress?: ReadingProgressSummary[];
  recent_activities?: RecentActivity[];
}

export interface UserDashboardData {
  user_collections: UserCollection[];
  books_in_progress: ReadingProgressSummary[];
  books_completed_this_month: ReadingProgressSummary[];
  reading_stats: ReadingStats;
}

export interface DashboardResponse {
  status: string;
  message: string;
  data: DashboardData;
  cached?: boolean;
}

export interface UserDashboardResponse {
  status: string;
  message: string;
  data: UserDashboardData;
}
