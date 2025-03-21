/** @format */
"use client";
import PaginationDef from "@/components/pagination/PaginationDef";
import TableDef from "@/components/table/TableDef";
import useBook from "@/stores/crud/Book";
import { BookType } from "@/types/BookType";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};

type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: any) => void;
};

// book

const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  const { setBook, dtBook } = useBook();
  // state
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // search params
  const searchParams = useSearchParams();
  const sortby = searchParams.get("sortby") || "";
  const order = searchParams.get("order") || "";
  const search = searchParams.get("cari") || "";
  const router = useRouter();

  const fetchDataDosen = async () => {
    await setBook({
      page,
      search,
      sortby,
      order,
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
  const headTable = [
    "No",
    "Judul",
    "Penulis",
    "Penerbit",
    "Tahun",
    "Kategori",
    "Cover",
    "Aksi",
  ];
  const tableBodies = [
    "title",
    "author",
    "publisher",
    "year",
    "categories.category_nm",
    "cover_image",
  ];

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const onClick = (row: BookType) => {
    router.push(`/books/files/${row.id}`);
  };

  return (
    <div className="flex-1 flex-col max-w-full h-full overflow-auto">
      <div className="overflow-hidden h-full flex flex-col ">
        <div className="overflow-auto grow">
          <TableDef
            headTable={headTable}
            tableBodies={tableBodies}
            dataTable={dtBook?.data}
            page={page}
            limit={10}
            setEdit={setEdit}
            setDelete={setDelete}
            onClick={onClick}
          />
        </div>
        {dtBook?.last_page > 1 && (
          <div className="mt-4">
            <PaginationDef
              currentPage={dtBook?.current_page}
              totalPages={dtBook?.last_page}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowData;
