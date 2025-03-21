/** @format */
"use client";
import InputText from "@/components/input/InputText";
import { FC } from "react";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  control: Control<FormInputs>;
  watch: UseFormWatch<FormInputs>;
  setValue: UseFormSetValue<FormInputs>;
};

const FormRegister: FC<Props> = ({ register, errors }) => {
  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Nama</span>
        </label>
        <InputText
          name="name"
          type="text"
          placeholder="Masukkan nama lengkap"
          register={register}
          required={true}
          errors={errors}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <InputText
          name="email"
          type="email"
          placeholder="Masukkan email anda"
          register={register}
          required={true}
          errors={errors}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <InputText
          name="password"
          type="password"
          placeholder="Masukkan password"
          register={register}
          required={true}
          errors={errors}
          minLength={6}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Konfirmasi Password</span>
        </label>
        <InputText
          name="confirmPassword"
          type="password"
          placeholder="Konfirmasi password anda"
          register={register}
          required={true}
          errors={errors}
          minLength={6}
        />
      </div>
    </>
  );
};

export default FormRegister;
