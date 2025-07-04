/** @format */

import React, { Suspense } from "react";
import Content from "./Content";

const BookLists = () => {
  return (
    <section className="flex flex-col h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>
    </section>
  );
};

export default BookLists;
