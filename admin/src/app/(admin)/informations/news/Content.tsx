/** @format */

"use client";
import { Suspense, useEffect, useState } from "react";

import ShowData from "./ShowData";
import { Toaster } from "react-hot-toast";
import toastShow from "@/utils/toast-show";
import useNews from "@/stores/crud/News";
import { showModal } from "@/utils/modalHelper";
import { useWelcomeContext } from "@/context/WelcomeContext";
import DeleteModal from "@/components/modal/DeleteModal";
import { useRouter } from "next/navigation";

const halaman = "Berita";

// type setDelete
type Delete = {
  id?: number | string;
  isDelete: boolean;
};
// news
const Content = () => {
  // context
  const { setWelcome } = useWelcomeContext();
  // route
  const router = useRouter();
  // effect welcome
  useEffect(() => {
    setWelcome(`Halaman ` + halaman);

    return () => {};
  }, []);
  // tambah data
  const handleTambah = () => {
    // go to form
    router.push("/informations/news/form");
  };
  // edit data
  const setEdit = (row: any) => {
    // go to form
    router.push("/informations/news/form?id=" + row.id);
  };

  // store
  const { removeData } = useNews();
  // state
  const [idDel, setIdDel] = useState<number | string>();

  const setDelete = async ({ id, isDelete }: Delete) => {
    setIdDel(id);
    showModal("modal_delete");
    if (isDelete) {
      const { data } = await removeData(idDel as string);
      toastShow({
        event: data,
      });
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div>
        <Toaster />
        <DeleteModal setDelete={setDelete} />
        <div className="mb-4 flex justify-between">
          <p>Silahkan Mengolah data news</p>

          <button className="btn btn-primary" onClick={handleTambah}>
            Tambah Data
          </button>
        </div>
      </div>

      <Suspense>
        <ShowData setDelete={setDelete} setEdit={setEdit} />
      </Suspense>
    </div>
  );
};

export default Content;
