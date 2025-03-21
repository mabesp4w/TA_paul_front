/** @format */
"use client";
import PaginationDef from "@/components/pagination/PaginationDef";
import TableDef from "@/components/table/TableDef";
import useAnnouncement from "@/stores/crud/Announcement";
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
// announcement
const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  const { setAnnouncement, dtAnnouncement } = useAnnouncement();
  // state
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // search params
  const searchParams = useSearchParams();
  const sortby = searchParams.get("sortby") || "";
  const order = searchParams.get("order") || "";
  const search = searchParams.get("cari") || "";

  const fetchDataDosen = async () => {
    await setAnnouncement({
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
  const headTable = ["No", "Prodi", "Judul", "Tanggal", "Isi", "Aksi"];
  const tableBodies = [
    "prodi.nm_prodi",
    "title",
    "announcement_date",
    "content",
  ];

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
              dataTable={dtAnnouncement?.data}
              page={page}
              limit={10}
              setEdit={setEdit}
              setDelete={setDelete}
            />
          </div>
          {dtAnnouncement?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDef
                currentPage={dtAnnouncement?.current_page}
                totalPages={dtAnnouncement?.last_page}
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
