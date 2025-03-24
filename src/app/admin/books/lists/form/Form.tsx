/** @format */
"use client";
import toastShow from "@/utils/toast-show";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BodyForm from "./BodyForm";
import submitData from "@/services/submitData";
import InputText from "@/components/input/InputText";
import { BookType } from "@/types/BookType";
import ModalDef from "@/components/modal/ModalDef";
import useBook from "@/stores/crud/Book";

type Props = {
  dtEdit: BookType | null;
  halaman: string;
};
// book
const Form = ({ dtEdit, halaman }: Props) => {
  // store
  const { addData, updateData } = useBook();
  // state
  const [isLoading, setIsLoading] = useState(false);

  // hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
    getValues,
  } = useForm<BookType>();

  // reset form
  const resetForm = () => {
    setValue("id", "");
    setValue("title", "");
    setValue("author", "");
    setValue("cover_image", "");
    setValue("publisher", "");
    setValue("year", "");
    setValue("categories", []);
    setValue("description", "");
  };

  // data edit
  useEffect(() => {
    if (dtEdit) {
      setValue("id", dtEdit.id);
      setValue("title", dtEdit.title);
      setValue("author", dtEdit.author);
      setValue("publisher", dtEdit.publisher);
      setValue("year", parseInt(dtEdit.year as string));
      setValue("categories", dtEdit.categories);
      setValue("description", dtEdit.description);
      setValue("cover_image", dtEdit.cover_image);
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dtEdit]);
  // simpan data
  const onSubmit: SubmitHandler<BookType> = async (row) => {
    //  submit data
    console.log({ row });
    // return;
    submitData({
      row,
      dtEdit,
      setIsLoading,
      addData,
      updateData,
      resetForm,
      toastShow,
    });
  };

  return (
    <ModalDef id="add_book" title={`Form ${halaman}`}>
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
            <span className="loading loading-dots loading-md" />
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
