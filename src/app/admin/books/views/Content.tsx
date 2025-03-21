/** @format */
"use client";
import { BASE_URL } from "@/services/baseURL";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ReactReader } from "react-reader";

const Content = () => {
  const searchParams = useSearchParams();
  const file_nm = searchParams.get("file_nm") || "";
  //   state
  const [epupFile, setEpupFile] = useState("");
  const [location, setLocation] = useState(null);
  const locationChanged = (epubcifi: any) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi);
  };
  // effect
  useEffect(() => {
    const file_epub = BASE_URL + "/media/book_files/" + file_nm;
    setEpupFile(file_epub);
  }, [file_nm]);

  console.log({ file_nm });
  return (
    <div style={{ height: "100vh" }}>
      <ReactReader
        location={location}
        locationChanged={locationChanged}
        url={epupFile}
      />
    </div>
  );
};

export default Content;
