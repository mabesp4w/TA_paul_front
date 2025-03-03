/**
 * eslint-disable @typescript-eslint/no-empty-object-type
 *
 * @format
 */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import { CategoryType } from "@/types/CategoryType";
// api category

type Store = {
  dtCategory: CategoryType[];
  showCategory?: CategoryType;
  setCategory: () => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setCategoryAll: () => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setShowCategory: (id: string) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useCategoryApi = create(
  devtools<Store>((set) => ({
    dtCategory: [],
    setCategory: async () => {
      try {
        const response = await api({
          method: "get",
          url: `/categories`,
        });
        set((state) => ({
          ...state,
          dtCategory: response.data,
        }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
    setCategoryAll: async () => {
      try {
        const response = await api({
          method: "get",
          url: `/categories/all`,
        });
        set((state) => ({
          ...state,
          dtCategory: response.data.data,
        }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
    setShowCategory: async (id) => {
      try {
        const response = await api({
          method: "get",
          url: `/categories/${id}`,
        });
        set((state) => ({
          ...state,
          showCategory: response.data.data,
        }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
  }))
);

export default useCategoryApi;
