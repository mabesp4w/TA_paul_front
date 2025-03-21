/** @format */

import React from "react";
import Content from "./Content";

const BookFiles = ({ params }: { params: { book_id: string } }) => {
  return (
    <section className="flex flex-col h-full">
      <Content book_id={params.book_id} />
    </section>
  );
};

export default BookFiles;
