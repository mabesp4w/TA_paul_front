/** @format */

import React from "react";
import Form from "./Form";
import Link from "next/link";

const InfoForm = () => {
  return (
    <section className="w-full h-full flex flex-col gap-y-4">
      <div>
        <p className=" text-warning mb-2">
          Kolom dengan bintang merah <span className="text-danger">*</span>{" "}
          wajib diisi.
        </p>
        <Link
          href="/informations/news"
          className="text-primary underline hover:no-underline"
        >
          Daftar Berita
        </Link>
      </div>
      <Form />
    </section>
  );
};

export default InfoForm;
