/** @format */

import InputText from "@/components/input/InputText";
import RichTextEditor from "@/components/input/RichTextEditor";
import SelectFromDb from "@/components/select/SelectFromDB";
import useMajorApi from "@/stores/api/Major";
import { AnnouncementType } from "@/types/AnnouncementType";
import { FC, useCallback, useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";

// announcement
type Props = {
  register: any;
  errors: FieldErrors<AnnouncementType>;
  dtEdit: AnnouncementType | null;
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
}) => {
  // store
  const { setMajor, dtMajor } = useMajorApi();
  // state
  const [loadingOption, setLoadingOption] = useState(false);

  const fetchOption = useCallback(async () => {
    setLoadingOption(true);
    await setMajor();
    setLoadingOption(false);
  }, [setMajor]);

  useEffect(() => {
    fetchOption();
  }, [fetchOption]);

  return (
    <>
      <InputText
        label={`Judul Pengumuman`}
        name="title"
        register={register}
        addClass="col-span-8"
        required
        errors={errors.title}
      />
      <InputText
        label={`Tanggal Pengumuman`}
        name="announcement_date"
        register={register}
        addClass="col-span-8"
        required
        errors={errors.announcement_date}
        type="date"
      />
      {!loadingOption && dtMajor && (
        <SelectFromDb
          label={`Prodi`}
          placeholder="Pilih Prodi"
          name="major_id"
          dataDb={dtMajor}
          body={["id", "nm_prodi"]}
          control={control}
          errors={errors.major_id}
          addClass={`col-span-8`}
        />
      )}

      <RichTextEditor
        control={control}
        name="content"
        label="Pengumuman"
        addClass="col-span-8"
        required
        errors={errors.content}
        initialValue={dtEdit?.content || ""}
        setValue={setValue}
        folder="announcements"
      />
    </>
  );
};

export default BodyForm;
