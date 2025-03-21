/** @format */
"use client";
import PaginationDef from "@/components/pagination/PaginationDef";
import TableDef from "@/components/table/TableDef";
import useBookFile from "@/stores/crud/BookFile";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};

type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: any) => void;
  book_id: string;
};

// bookFile

const ShowData: FC<Props> = ({ setDelete, setEdit, book_id }) => {
  const { setBookFile, dtBookFile } = useBookFile();
  // state
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // search params
  const searchParams = useSearchParams();
  const sortby = searchParams.get("sortby") || "";
  const order = searchParams.get("order") || "";
  const search = searchParams.get("cari") || "";

  const fetchDataDosen = async () => {
    await setBookFile({
      page,
      search,
      sortby,
      order,
      book_id,
    });
    setIsLoading(false);
  };
  useEffect(() => {
    fetchDataDosen();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  // ketika search berubah
  useEffect(() => {
    setPage(1);
    fetchDataDosen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortby, order]);

  // table
  const headTable = ["No", "Tipe File", "File", "Asli", "Aksi"];
  const tableBodies = ["file_type", "file_book", "is_original"];

  console.log({ dtBookFile });

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex-col max-w-full h-full overflow-auto">
      <div className="overflow-hidden h-full flex flex-col ">
        <div className="overflow-auto grow">
          <TableDef
            headTable={headTable}
            tableBodies={tableBodies}
            dataTable={dtBookFile?.data}
            page={page}
            limit={10}
            setEdit={setEdit}
            setDelete={setDelete}
            ubah={false}
          />
        </div>
        {dtBookFile?.last_page > 1 && (
          <div className="mt-4">
            <PaginationDef
              currentPage={dtBookFile?.current_page}
              totalPages={dtBookFile?.last_page}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowData;
