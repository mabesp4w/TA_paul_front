/** @format */
"use client";
import toastShow from "@/utils/toast-show";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BodyForm from "./BodyForm";
import submitData from "@/services/submitData";
import useNews from "@/stores/crud/News";
import InputText from "@/components/input/InputText";
import { NewsType } from "@/types/NewsType";
import { useWelcomeContext } from "@/context/WelcomeContext";
import { useRouter, useSearchParams } from "next/navigation";

// news
const Form = () => {
  const { setWelcome } = useWelcomeContext();
  // store
  const { addData, updateData, setShowNews, dtShowNews } = useNews();
  // state
  const [isLoading, setIsLoading] = useState(false);
  const [dtEdit, setDtEdit] = useState<NewsType | null>(null);
  // search params
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  // router
  const router = useRouter();

  // get show news
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      setShowNews(id);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // set data edit
  useEffect(() => {
    if (id && dtShowNews) {
      setDtEdit(dtShowNews);
    } else {
      setDtEdit(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dtShowNews]);
  // hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<NewsType>();

  // set welcome
  useEffect(() => {
    setWelcome(`${dtEdit ? "Edit" : "Tambah"} Pengumuman`);
  }, [dtEdit, setWelcome]);

  // reset form
  const resetForm = () => {
    setValue("id", "");
    setValue("title", "");
    setValue("author", "");
    setValue("slug", "");
    setValue("content", "");
    setValue("news_date", "");
    setValue("img_news", "");
  };

  // data edit
  useEffect(() => {
    if (id && dtEdit) {
      setValue("id", dtEdit.id);
      setValue("title", dtEdit.title);
      setValue("author", dtEdit.author);
      setValue("slug", dtEdit.slug);
      setValue("content", dtEdit.content);
      setValue("news_date", dtEdit.news_date);
      setValue("img_news", "");
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dtEdit]);

  const goTo = () => {
    router.push("/informations/news");
  };

  // simpan data
  const onSubmit: SubmitHandler<NewsType> = async (row) => {
    //  submit data
    // return;
    submitData({
      row,
      dtEdit,
      setIsLoading,
      addData,
      updateData,
      resetForm,
      toastShow,
      goTo,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-md" />
      </div>
    );
  }

  return (
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
  );
};

export default Form;
