/** @format */

// types/index.ts

// User Types
export interface User {
  id: string;
  first_name: string;
  email: string;
  last_login?: string;
  username: string;
  show_password: string;
}

// Book Types
export interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
  publisher?: string;
  description?: string;
  coverImage?: string;
  categories?: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface BookWithProgress extends Book {
  progress: number;
  format: string;
  lastRead?: string;
  status?: "Aktif" | "Selesai";
}

export interface BookFile {
  id: string;
  bookId: string;
  fileType: string;
  filePath: string;
  isOriginal: boolean;
  createdAt: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  bookCount?: number;
}

// Collection Types
export interface Collection {
  id: string;
  name: string;
  description?: string;
  bookCount: number;
  lastUpdated: string;
  coverImages?: string[];
  createdAt: string;
  userId: string;
}

// ReadingProgress Types
export interface ReadingProgress {
  id: string;
  userId: string;
  bookId: string;
  fileType: string;
  currentLocation?: string;
  completionPercentage: number;
  lastRead: string;
}

// Bookmark Types
export interface Bookmark {
  id: string;
  userId: string;
  bookId: string;
  fileType: string;
  location: string;
  title?: string;
  createdAt: string;
  book?: Book;
}

// Annotation Types
export interface Annotation {
  id: string;
  userId: string;
  bookId: string;
  fileType: string;
  location: string;
  text: string;
  note?: string | null;
  color: string;
  createdAt?: string;
  book?: Book;
}

// Reading Content Types
export interface BookChapter {
  id: number;
  title: string;
  level: number;
  active?: boolean;
}

export interface BookContentSection {
  title?: string;
  paragraphs: string[];
}

// Statistics
export interface ReadingStats {
  icon: React.ReactNode;
  label: string;
  value: number;
  change?: string;
  positive?: boolean | null;
}

// Filter Options
export interface SortOption {
  value: string;
  label: string;
}

// Component Props Types
export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export interface BookCardProps {
  book: Book | BookWithProgress;
  showProgress?: boolean;
}

export interface StatCardProps {
  title: string;
  value: number;
  change?: string;
  positive?: boolean | null;
}

export interface ReadingHistoryTableProps {
  history: BookWithProgress[];
}

export interface TableOfContentsProps {
  chapters: BookChapter[];
  currentChapter: number | null;
  onSelectChapter: (id: number) => void;
}

export interface BookmarkListProps {
  bookmarks: Bookmark[];
  currentBookmark: string | null;
  onSelectBookmark: (id: string) => void;
}

export interface AnnotationListProps {
  annotations: Annotation[];
  currentAnnotation: string | null;
  onSelectAnnotation: (id: string) => void;
}

export interface BookContentProps {
  content: BookContentSection[];
  fontSize: string;
}

export interface ReadingProgressProps {
  currentPage: number;
  totalPages: number;
}

export interface HighlightMenuProps {
  onHighlight?: (color: string) => void;
  onAddNote?: () => void;
  onClose?: () => void;
}

export interface ReaderSidebarProps {
  book: Book;
  onClose: () => void;
  activeTab?: "contents" | "bookmarks" | "annotations";
  onChangeTab?: (tab: "contents" | "bookmarks" | "annotations") => void;
}
