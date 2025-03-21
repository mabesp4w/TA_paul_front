/** @format */

// components/Reader/TableOfContents.jsx

// props
interface Props {
  chapters: any[];
  currentChapter: number;
  onSelectChapter: (id: string) => void;
}

const TableOfContents = ({
  chapters,
  currentChapter,
  onSelectChapter,
}: Props) => {
  return (
    <ul className="menu p-0">
      {chapters.map((chapter) => (
        <li key={chapter.id}>
          <a
            className={`
              ${chapter.id === currentChapter ? "active" : ""}
              ${chapter.level === 1 ? "pl-8 text-sm" : ""}
              ${chapter.level === 2 ? "pl-12 text-xs opacity-70" : ""}
            `}
            onClick={() => onSelectChapter(chapter.id)}
          >
            {chapter.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default TableOfContents;
