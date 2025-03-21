/** @format */

import { Highlighter } from "lucide-react";

type Props = {
  annotations: any;
  currentAnnotation: any;
  onSelectAnnotation: any;
};

const AnnotationList = ({
  annotations,
  currentAnnotation,
  onSelectAnnotation,
}: Props) => {
  const getColorClass = (color: string) => {
    switch (color) {
      case "yellow":
        return "bg-amber-100 border-amber-400";
      case "green":
        return "bg-green-100 border-green-400";
      case "blue":
        return "bg-blue-100 border-blue-400";
      default:
        return "bg-amber-100 border-amber-400";
    }
  };

  if (!annotations || annotations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center p-4">
        <Highlighter size={24} className="opacity-20 mb-2" />
        <p className="text-sm text-base-content/70">
          Belum ada anotasi. Sorot teks saat membaca untuk menambahkan anotasi.
        </p>
      </div>
    );
  }

  return (
    <div className="p-0">
      {annotations.map((annotation: any) => (
        <div
          key={annotation.id}
          className={`border-b p-4 cursor-pointer ${
            annotation.id === currentAnnotation ? "bg-base-200" : ""
          }`}
          onClick={() => onSelectAnnotation(annotation.id)}
        >
          <div
            className={`${getColorClass(
              annotation.color
            )} border-l-4 p-2 rounded-r mb-2`}
          >
            <p className="text-sm">{annotation.text}</p>
          </div>
          {annotation.note && (
            <p className="text-xs opacity-70 pl-2">{annotation.note}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnnotationList;
