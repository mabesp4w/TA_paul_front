/** @format */

import InputFile from "@/components/input/InputFile";
import { BookFileType } from "@/types/BookFileType";
import { FC } from "react";
import { FieldErrors } from "react-hook-form";
// bookFile
type Props = {
  register: any;
  errors: FieldErrors<BookFileType>;
  dtEdit: BookFileType | null;
  control: any;
  watch: any;
  setValue: any;
  getValues: any;
};

const BodyForm: FC<Props> = ({ register, errors, setValue, watch, dtEdit }) => {
  return (
    <>
      <InputFile
        label={`File Buku`}
        name="file_book"
        register={register}
        addClass="col-span-8"
        setValue={setValue}
        errors={errors.file_book}
        fileEdit={dtEdit?.file_book}
        initialValue={dtEdit?.file_book || ""}
        watch={watch}
        accept={"application/pdf"}
        required
      />
    </>
  );
};

export default BodyForm;
