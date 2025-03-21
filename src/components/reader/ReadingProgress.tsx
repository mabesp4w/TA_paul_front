/** @format */
// type
interface Props {
  currentPage: number;
  totalPages: number;
}

const ReadingProgress = ({ currentPage, totalPages }: Props) => {
  const progressPercentage = Math.round((currentPage / totalPages) * 100);

  return (
    <div className="flex items-center gap-3 text-sm opacity-70">
      <span>
        Halaman {currentPage} dari {totalPages}
      </span>
      <div className="flex-1 max-w-32">
        <div className="h-1.5 w-full bg-base-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      <span>{progressPercentage}%</span>
    </div>
  );
};

export default ReadingProgress;
