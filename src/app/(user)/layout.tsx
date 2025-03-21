/** @format */

import UserSidebar from "@/components/sidebar/UserSidebar";
import React from "react";
import Auth from "../Auth";

type Props = {
  children: React.ReactNode;
};
const layout = ({ children }: Props) => {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Page content here */}
          <div className="w-full min-h-screen bg-base-100">{children}</div>
        </div>
        <UserSidebar />
        <Auth />
      </div>
    </>
  );
};

export default layout;
