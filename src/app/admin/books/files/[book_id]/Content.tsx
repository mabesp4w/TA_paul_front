/** @format */

"use client";
import { Suspense, useEffect, useState } from "react";

import ShowData from "./ShowData";
import Form from "./form/Form";
import { Toaster } from "react-hot-toast";
import toastShow from "@/utils/toast-show";
import { showModal } from "@/utils/modalHelper";
import { useWelcomeContext } from "@/context/WelcomeContext";
import DeleteModal from "@/components/modal/DeleteModal";
import useBookFile from "@/stores/crud/BookFile";
import useBook from "@/stores/crud/Book";

const halaman = "File";

// type setDelete
type Delete = {
  id?: number | string;
  isDelete: boolean;
};

interface Props {
  book_id: string;
}
// bookFile
const Content = ({ book_id }: Props) => {
  const { setWelcome } = useWelcomeContext();
  // effect welcome
  useEffect(() => {
    setWelcome(`Halaman ` + halaman);

    return () => {};
  }, []);

  // store
  const { removeData } = useBookFile();
  const { setShowBook, showDtBook } = useBook();
  // state
  const [idDel, setIdDel] = useState<number | string>();
  const [dtEdit, setDtEdit] = useState<any>();

  // useEffect
  useEffect(() => {
    setShowBook(book_id);
  }, [book_id, setShowBook]);

  const handleTambah = () => {
    showModal("add_bookFile");
    setDtEdit(null);
  };

  const setEdit = (row: any) => {
    showModal("add_bookFile");
    setDtEdit(row);
  };

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
        <Form dtEdit={dtEdit} halaman={halaman} book_id={book_id} />
        <DeleteModal setDelete={setDelete} />
        <div className="mb-4 flex justify-between">
          <p>
            Silahkan Mengolah data {halaman} buku {showDtBook?.title}.
          </p>

          <button className="btn btn-primary" onClick={handleTambah}>
            Tambah Data
          </button>
        </div>
      </div>

      <Suspense>
        <ShowData setDelete={setDelete} setEdit={setEdit} book_id={book_id} />
      </Suspense>
    </div>
  );
};

export default Content;
