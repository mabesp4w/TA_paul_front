/** @format */

// src/components/book/BookCard.tsx
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  year: string;
}

const BookCard = ({ id, title, author, coverImage, year }: BookCardProps) => {
  return (
    <div className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      <figure className="h-60 relative bg-base-200">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <BookOpen size={48} className="opacity-30" />
          </div>
        )}
      </figure>
      <div className="card-body">
        <Link href={`/buku/${id}`}>
          <h2 className="card-title line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h2>
        </Link>
        <p className="text-sm opacity-70">{author}</p>
        <p className="text-xs opacity-60">{year}</p>
        <div className="card-actions justify-end mt-2">
          <Link href={`/buku/${id}`} className="btn btn-primary btn-sm">
            Baca
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
