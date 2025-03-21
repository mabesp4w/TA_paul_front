/**
 * eslint-disable @typescript-eslint/no-empty-object-type
 *
 * @format
 */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import { MajorType } from "@/types/MajorType";
// api major

type Store = {
  dtMajor: MajorType[];
  showCategory?: MajorType;
  setMajor: () => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setMajorAll: () => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setShowMajor: (id: string) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useMajorApi = create(
  devtools<Store>((set) => ({
    dtMajor: [],
    setMajor: async () => {
      try {
        const response = await api({
          method: "get",
          url: `/majors`,
        });
        set((state) => ({
          ...state,
          dtMajor: response.data.data,
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
    setMajorAll: async () => {
      try {
        const response = await api({
          method: "get",
          url: `/majors/all`,
        });
        set((state) => ({
          ...state,
          dtMajor: response.data.data,
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
    setShowMajor: async (id) => {
      try {
        const response = await api({
          method: "get",
          url: `/majors/${id}`,
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

export default useMajorApi;
