/** @format */
"use client";
import toastShow from "@/utils/toast-show";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BodyForm from "./BodyForm";
import submitData from "@/services/submitData";
import useAnnouncement from "@/stores/crud/Announcement";
import InputText from "@/components/input/InputText";
import { AnnouncementType } from "@/types/AnnouncementType";
import { useWelcomeContext } from "@/context/WelcomeContext";
import { useRouter, useSearchParams } from "next/navigation";

// announcement
const Form = () => {
  const { setWelcome } = useWelcomeContext();
  // store
  const { addData, updateData, setShowAnnouncement, dtShowAnnouncement } =
    useAnnouncement();
  // state
  const [isLoading, setIsLoading] = useState(false);
  const [dtEdit, setDtEdit] = useState<AnnouncementType | null>(null);
  // search params
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  // router
  const router = useRouter();

  // get show announcement
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      setShowAnnouncement(id);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // set data edit
  useEffect(() => {
    if (id && dtShowAnnouncement) {
      setDtEdit(dtShowAnnouncement);
    } else {
      setDtEdit(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dtShowAnnouncement]);
  // hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<AnnouncementType>();

  // set welcome
  useEffect(() => {
    setWelcome(`${dtEdit ? "Edit" : "Tambah"} Pengumuman`);
  }, [dtEdit, setWelcome]);

  // reset form
  const resetForm = () => {
    setValue("id", "");
    setValue("title", "");
    setValue("major_id", "");
    setValue("slug", "");
    setValue("content", "");
    setValue("announcement_date", "");
  };

  // data edit
  useEffect(() => {
    if (id && dtEdit) {
      setValue("id", dtEdit.id);
      setValue("title", dtEdit.title);
      setValue("major_id", parseInt(dtEdit.major_id));
      setValue("slug", dtEdit.slug);
      setValue("announcement_date", dtEdit.announcement_date);
      setValue("content", dtEdit.content);
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dtEdit]);

  const goTo = () => {
    router.push("/informations/announcements");
  };

  // simpan data
  const onSubmit: SubmitHandler<AnnouncementType> = async (row) => {
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
