/** @format */

import MenuType from "@/types/MenuType";
import { BsBook, BsHouseDoor, BsInfoLg } from "react-icons/bs";

const createUrl = (path: string) => `${path}`;

const setAdminMenus = () => {
  const ListMenu: MenuType[] = [
    {
      name: "Dashboard",
      href: createUrl("/dashboard"),
      icon: <BsHouseDoor />,
    },
    {
      name: "Kategori",
      href: createUrl("/categories"),
      icon: <BsInfoLg />,
    },
    {
      name: "Buku",
      href: createUrl("/books/lists"),
      icon: <BsBook />,
    },
  ];

  return ListMenu;
};

export { setAdminMenus };
