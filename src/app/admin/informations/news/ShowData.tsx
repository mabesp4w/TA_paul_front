/** @format */
"use client";
import PaginationDef from "@/components/pagination/PaginationDef";
import TableDef from "@/components/table/TableDef";
import useNews from "@/stores/crud/News";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};

type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: any) => void;
};
// news
const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  const { setNews, dtNews } = useNews();
  // state
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // search params
  const searchParams = useSearchParams();
  const sortby = searchParams.get("sortby") || "";
  const order = searchParams.get("order") || "";
  const search = searchParams.get("cari") || "";

  const fetchDataDosen = async () => {
    await setNews({
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
    "Gambar",
    "Tanggal",
    "Isi Berita",
    "Aksi",
  ];
  const tableBodies = ["title", "author", "img_news", "news_date", "content"];

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 flex-col max-w-full h-full overflow-auto">
        <div className="overflow-hidden">
          <div className="overflow-auto">
            <TableDef
              headTable={headTable}
              tableBodies={tableBodies}
              dataTable={dtNews?.data}
              page={page}
              limit={10}
              setEdit={setEdit}
              setDelete={setDelete}
            />
          </div>
          {dtNews?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDef
                currentPage={dtNews?.current_page}
                totalPages={dtNews?.last_page}
                setPage={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowData;
