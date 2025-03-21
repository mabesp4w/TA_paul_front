/** @format */

import InputFile from "@/components/input/InputFile";
import InputText from "@/components/input/InputText";
import RichTextEditor from "@/components/input/RichTextEditor";
import { NewsType } from "@/types/NewsType";
import { FC } from "react";
import { FieldErrors } from "react-hook-form";

// news
type Props = {
  register: any;
  errors: FieldErrors<NewsType>;
  dtEdit: NewsType | null;
  control: any;
  watch: any;
  setValue: any;
};

// letters
const BodyForm: FC<Props> = ({
  register,
  errors,
  setValue,
  dtEdit,
  control,
  watch,
}) => {
  return (
    <>
      <InputText
        label={`Judul Berita`}
        name="title"
        register={register}
        addClass="col-span-8"
        required
        errors={errors.title}
      />

      <InputFile
        label={`Gambar Utama`}
        name="img_news"
        register={register}
        addClass="col-span-8"
        setValue={setValue}
        errors={errors.img_news}
        fileEdit={dtEdit?.img_news}
        initialValue={dtEdit?.img_news || ""}
        watch={watch}
        accept={"image/*"}
      />

      <InputText
        label={`Tanggal`}
        name="news_date"
        register={register}
        addClass="col-span-8"
        required
        errors={errors.news_date}
        type="date"
      />

      <RichTextEditor
        control={control}
        name="content"
        label="Isi Berita"
        addClass="col-span-8"
        required
        errors={errors.content}
        initialValue={dtEdit?.content || ""}
        setValue={setValue}
        folder="news"
      />
    </>
  );
};

export default BodyForm;
