/** @format */

import InputFile from "@/components/input/InputFile";
import InputTag from "@/components/input/InputTag";
import InputText from "@/components/input/InputText";
import SelectDef from "@/components/select/SelectDef";
import useCategoryApi from "@/stores/api/Category";
import { BookType } from "@/types/BookType";
import { FC, useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";
// book
type Props = {
  register: any;
  errors: FieldErrors<BookType>;
  dtEdit: BookType | null;
  control: any;
  watch: any;
  setValue: any;
  getValues: any;
};

const yearNow = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, index) => yearNow - index);

const optionYears = years.map((year) => ({
  value: year,
  label: year,
}));

const BodyForm: FC<Props> = ({
  register,
  errors,
  setValue,
  watch,
  dtEdit,
  control,
}) => {
  // state
  const [IsLoading, setIsLoading] = useState(true);
  const { setCategory, dtCategory } = useCategoryApi();

  useEffect(() => {
    setIsLoading(true);
    setCategory();
    setIsLoading(false);
  }, []);

  return (
    <>
      <InputText
        label={`Judul`}
        name="title"
        register={register}
        addClass="col-span-8"
        required
        errors={errors.title}
      />

      <InputText
        label={`Penulis`}
        name="author"
        register={register}
        addClass="col-span-8"
        required
        errors={errors.author}
      />

      <InputText
        label={`Penerbit`}
        name="publisher"
        register={register}
        addClass="col-span-8"
        required
        errors={errors.publisher}
      />

      <SelectDef
        label="Tahun Terbit"
        name="year"
        control={control}
        addClass="col-span-8"
        required
        errors={errors.year}
        placeholder="Pilih Tahun"
        options={optionYears}
        menuPosition="absolute"
      />

      {!IsLoading && dtCategory && (
        <InputTag
          label="Kategori"
          name="categories"
          register={register}
          setValue={setValue}
          addClass="col-span-12 md:col-span-8"
          placeholder="Tambahkan skill..."
          maxTags={5}
          errors={errors}
          dataTag={dtCategory}
          displayKey="category_nm"
          valueKey="category_nm"
          required
        />
      )}

      <InputFile
        label={`Cover Buku`}
        name="cover_image"
        register={register}
        addClass="col-span-8"
        setValue={setValue}
        errors={errors.cover_image}
        fileEdit={dtEdit?.cover_image}
        initialValue={dtEdit?.cover_image || ""}
        watch={watch}
        accept={"image/*"}
        required
      />
    </>
  );
};

export default BodyForm;
