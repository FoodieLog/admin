import { ReportDataType } from "@/types";
import { create } from "zustand";

interface useReportStore {
  reportData: ReportDataType | null;
  setReportData: (data: ReportDataType) => void;
}

const useReportStore = create<useReportStore>((set) => ({
  reportData: null,
  setReportData: (data) => set({ reportData: data }),
}));

export default useReportStore;
