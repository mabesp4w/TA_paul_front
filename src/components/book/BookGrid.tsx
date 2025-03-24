/** @format */

// src/components/book/BookGrid.tsx
import { ReactNode } from "react";
import BookCard from "./BookCard";
import { BookType } from "@/types/BookType";

interface BookGridProps {
  books: BookType[];
  title?: string;
  emptyMessage?: string;
  header?: ReactNode;
}

const BookGrid = ({
  books,
  title,
  emptyMessage = "Tidak ada buku yang ditemukan",
  header,
}: BookGridProps) => {
  return (
    <div className="w-full">
      {header ||
        (title && <h2 className="text-2xl font-bold mb-4">{title}</h2>)}

      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              coverImage={book.cover_image}
              year={book.year as string}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-12 text-gray-500">
          <p>{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default BookGrid;
