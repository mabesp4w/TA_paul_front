/** @format */

import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  book: any;
  showProgress?: boolean;
};

const BookCard = ({ book, showProgress = false }: Props) => {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
      {/* Book Cover */}
      <figure className="relative h-64">
        <Image
          src={book.cover || `/api/placeholder/240/320`}
          alt={`Cover buku ${book.title}`}
          fill
          className="object-cover"
        />
      </figure>

      <div className="card-body p-4">
        <h3 className="card-title text-base font-bold truncate">
          {book.title}
        </h3>
        <p className="text-sm opacity-70 truncate">{book.author}</p>

        {showProgress ? (
          // Show progress for books being read
          <div className="mt-2">
            <div className="flex justify-between items-center text-xs mb-1">
              <span>{book.progress}% selesai</span>
              <span>{book.format}</span>
            </div>
            <progress
              className="progress progress-primary w-full h-1.5"
              value={book.progress}
              max="100"
            ></progress>
          </div>
        ) : (
          // Show metadata for new books
          <div className="flex justify-between items-center text-xs mt-2 opacity-70">
            <span>{book.year}</span>
            <span>{book.category}</span>
          </div>
        )}

        {/* Actions */}
        <div className="card-actions justify-end mt-2">
          <Link href={`/baca/${book.id}`} className="btn btn-primary btn-sm">
            {showProgress ? "Lanjutkan" : "Baca"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
