/** @format */

import React from "react";
import Auth from "../Auth";
import Navbar from "@/components/navbar/NabarComp";
import Footer from "@/components/footer/FooterComp";

type Props = {
  children: React.ReactNode;
};
const layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
      <Auth />
    </div>
  );
};

export default layout;
