/** @format */

// components/Reader/BookContent.jsx
import { BookOpenText } from "lucide-react";

type Props = {
  content: any;
  fontSize: string;
};

const BookContent = ({ content, fontSize }: Props) => {
  // This component would handle the rendering of the actual book content
  // In a real implementation, this would probably parse EPUB or handle PDF display
  // Here we just show a simplified text content example

  if (!content || content.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <BookOpenText size={48} className="opacity-20 mb-4" />
        <h3 className="text-lg font-medium mb-2">Konten buku tidak tersedia</h3>
        <p className="text-base-content/70 max-w-md">
          Maaf, konten buku tidak dapat dimuat. Pastikan format file didukung
          dan coba muat ulang halaman.
        </p>
      </div>
    );
  }

  return (
    <div className={`book-content ${fontSize}`}>
      {content.map((section: any, index: number) => (
        <div key={index} className="mb-8">
          {section.title && (
            <h2 className="text-xl font-bold mb-4">{section.title}</h2>
          )}
          {section.paragraphs.map((paragraph: string, pIndex: number) => (
            <p key={pIndex} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BookContent;
