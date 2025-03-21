/** @format */

import React from "react";
import Form from "./Form";
import Link from "next/link";

const InfoForm = () => {
  return (
    <section className="w-full h-full flex flex-col gap-y-4">
      <div>
        <p className=" text-warning mb-2">
          Kosongkan kolom program studi jika pengumuman berlaku untuk seluruh
          program studi atau fakultas.
        </p>
        <Link
          href="/informations/announcements"
          className="text-primary underline hover:no-underline"
        >
          Daftar Pengumuman
        </Link>
      </div>
      <Form />
    </section>
  );
};

export default InfoForm;
