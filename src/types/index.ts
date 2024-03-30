import type { ColumnsType } from "antd/es/table";
import { ReactElement } from "react";

export interface DataType {
  approveCount: number;
  createdAt: string;
  email: string;
  feedCount: number;
  flag: string;
  nickName: string;
  replyCount: 0;
  userId: number;
  userStatus: string;
}

export interface TableProps {
  columns: ColumnsType<any>;
  data: any[];
  page: "user" | "report";
  expand?: boolean;
}

export interface ModalProps {
  children: JSX.Element;
}

export interface PatchReportBody {
  contentId: number;
  reportedId: number;
  status: string;
}

export interface BlockBody {
  reason: string;
  userId: number;
}

export interface ReportDataType {
  createdAt: string;
  detail: {
    content: string;
    feedId: number;
    feedImages: string[];
  };
  reason: string;
  reportId: number;
  reported: {
    id: number;
    email: string;
    nickName: string;
  };
  reporter: {
    id: number;
    email: string;
    nickName: string;
  };
  status: string;
  type: string;
  updatedAt: string;
}
