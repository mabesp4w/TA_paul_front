/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import { UserType } from "@/types/UserType";
import useLogin from "../auth/login";
// store user
type Props = {
  page?: number;
  limit?: number;
  search?: string;
  sortby?: string;
  order?: string;
};

type Store = {
  dtUser: {
    last_page: number;
    current_page: number;
    data: UserType[];
  };

  showUser: UserType | null;

  setUser: ({ page, limit, search, sortby, order }: Props) => Promise<{
    status: string;
    data?: object;
    error?: object;
  }>;

  removeData: (
    id: number | string
  ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useUser = create(
  devtools<Store>((set, get) => ({
    dtUser: {
      last_page: 0,
      current_page: 0,
      data: [],
    },
    showUser: null,
    setUser: async ({ page = 1, limit = 10, search, sortby, order }) => {
      const token = await useLogin.getState().setToken();
      try {
        const response = await api({
          method: "get",
          url: `/users/`,
          headers: { Authorization: `Bearer ${token}` },
          params: {
            limit,
            page,
            search,
            sortby,
            order,
          },
        });
        set((state) => ({
          ...state,
          dtUser: response.data.results,
        }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response?.data,
        };
      }
    },
    removeData: async (id) => {
      const token = await useLogin.getState().setToken();
      try {
        const res = await api({
          method: "delete",
          url: `/users/${id}/`,
          headers: { Authorization: `Bearer ${token}` },
        });
        // call setUser
        await get().setUser({ page: 1 });
        return {
          status: "berhasil hapus",
          data: res.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
  }))
);

export default useUser;
