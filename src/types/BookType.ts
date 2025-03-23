/** @format */

import { BookFileType } from "./BookFileType";
import { CategoryType } from "./CategoryType";

// book
export type BookType = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: number | string;
  cover_image: string;
  total_pages: number;
  categories: CategoryType[];
  files: BookFileType[];
};
