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
  columns: ColumnsType<DataType>;
  data: DataType[];
  expand?: boolean;
}

export interface TableProps {
  columns: ColumnsType<DataType>;
  data: DataType[];
  expand?: boolean;
}
export interface ModalProps {
  children: JSX.Element;
}

export interface BlockBody {
  reason: string;
  userId: number;
}
