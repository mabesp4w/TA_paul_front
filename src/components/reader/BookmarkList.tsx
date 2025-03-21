/** @format */

import { Bookmark } from "lucide-react";

type Props = {
  bookmarks: any[];
  currentBookmark: string | null;
  onSelectBookmark: (id: string) => void;
};

const BookmarkList = ({
  bookmarks,
  currentBookmark,
  onSelectBookmark,
}: Props) => {
  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center p-4">
        <Bookmark size={24} className="opacity-20 mb-2" />
        <p className="text-sm text-base-content/70">
          Belum ada bookmark. Tandai halaman saat membaca untuk menambahkannya
          di sini.
        </p>
      </div>
    );
  }

  return (
    <ul className="menu p-0">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}>
          <a
            className={`py-3 ${
              bookmark.id === currentBookmark ? "active" : ""
            }`}
            onClick={() => onSelectBookmark(bookmark.id)}
          >
            <div>
              <div className="font-medium">{bookmark.title}</div>
              <div className="text-xs opacity-70">{bookmark.location}</div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default BookmarkList;
