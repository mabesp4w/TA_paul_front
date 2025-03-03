/** @format */
"use client";
import toastShow from "@/utils/toast-show";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BodyForm from "./BodyForm";
import submitData from "@/services/submitData";
import InputText from "@/components/input/InputText";
import { BookFileType } from "@/types/BookFileType";
import ModalDef from "@/components/modal/ModalDef";
import useBookFile from "@/stores/crud/BookFile";

type Props = {
  dtEdit: BookFileType | null;
  halaman: string;
  book_id: string;
};
// bookFile
const Form = ({ dtEdit, halaman, book_id }: Props) => {
  // store
  const { addData, updateData } = useBookFile();
  // state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");

  // hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
    getValues,
  } = useForm<BookFileType>();

  // reset form
  const resetForm = () => {
    setValue("id", "");
    setValue("book_id", book_id);
    setValue("file_type", "PDF");
    setValue("is_original", true);
    setValue("file_book", "");
  };

  // data edit
  useEffect(() => {
    if (dtEdit) {
      setValue("id", dtEdit.id);
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dtEdit]);
  // simpan data
  const onSubmit: SubmitHandler<BookFileType> = async (row) => {
    try {
      // Mulai proses loading
      setIsLoading(true);
      setLoadingMessage("Mempersiapkan data...");
      setLoadingProgress(10);

      // Tampilkan progress uploading
      setTimeout(() => {
        if (isLoading) {
          setLoadingMessage("Mengunggah file...");
          setLoadingProgress(30);
        }
      }, 500);

      // Jalankan submitData asli dengan wrapping Promise
      const submitPromise = new Promise<void>((resolve) => {
        submitData({
          row,
          dtEdit,
          setIsLoading: (loading) => {
            // Kita tidak set isLoading di sini karena kita mengelolanya sendiri
            if (!loading) {
              resolve(); // Resolve Promise ketika submitData selesai
            }
          },
          addData,
          updateData,
          resetForm,
          toastShow,
        });
      });

      // Tampilkan progress processing
      setTimeout(() => {
        if (isLoading) {
          setLoadingMessage("Memproses data...");
          setLoadingProgress(60);
        }
      }, 1000);

      // Tunggu submitData selesai
      await submitPromise;

      // Tampilkan progress finishing
      setLoadingMessage("Menyelesaikan...");
      setLoadingProgress(90);

      // Selesaikan proses
      setTimeout(() => {
        setLoadingProgress(100);
        setIsLoading(false);

        // Tutup modal
        const modalElement = document.getElementById(
          "add_bookFile"
        ) as HTMLDialogElement;
        if (modalElement) {
          modalElement.close();
        }
      }, 500);
    } catch (error) {
      // Tangani kesalahan
      setIsLoading(false);
      toastShow({
        event: {
          message: `Terjadi kesalahan: ${error}`,
          type: "error",
        },
      });
    }
  };

  return (
    <ModalDef id="add_bookFile" title={`Form ${halaman}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText name="id" register={register} type="hidden" />
        <div className="grid grid-cols-8 gap-2 mb-4">
          <BodyForm
            register={register}
            errors={errors}
            dtEdit={dtEdit}
            control={control}
            watch={watch}
            setValue={setValue}
            getValues={getValues}
          />
        </div>
        <div>
          {isLoading ? (
            <div className="flex flex-col items-center w-full gap-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-accent h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{loadingMessage}</p>
              <span className="loading loading-dots loading-md text-primary mt-2" />
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={handleSubmit(onSubmit)}
              type="submit"
            >
              Simpan
            </button>
          )}
        </div>
      </form>
    </ModalDef>
  );
};

export default Form;
