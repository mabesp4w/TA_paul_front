/** @format */

"use client";
import { Suspense, useEffect, useState } from "react";
import ShowData from "./ShowData";
import { Toaster } from "react-hot-toast";
import { useWelcomeContext } from "@/context/WelcomeContext";
import useUser from "@/stores/crud/User";
import { showModal } from "@/utils/modalHelper";
import toastShow from "@/utils/toast-show";
import DeleteModal from "@/components/modal/DeleteModal";

const halaman = "Pengguna";

// type setDelete
type Delete = {
  id?: number | string;
  isDelete: boolean;
};

// user
const Content = () => {
  const { setWelcome } = useWelcomeContext();
  // effect welcome
  useEffect(() => {
    setWelcome(`Halaman ` + halaman);

    return () => {};
  }, []);

  // store
  const { removeData } = useUser();
  // state
  const [idDel, setIdDel] = useState<number | string>();

  const setDelete = async ({ id, isDelete }: Delete) => {
    console.log({ id });
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
          <p>Daftar Pengguna yang terdaftar</p>
        </div>
      </div>

      <Suspense>
        <ShowData setDelete={setDelete} />
      </Suspense>
    </div>
  );
};

export default Content;
