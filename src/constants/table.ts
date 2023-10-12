import type { ColumnsType } from "antd/es/table";
import { DataType } from "@/types";

export const USER_COLUMNS = [
  "보기",
  "피신고자",
  "신고자",
  "신고사유",
  "신고시간",
  "처리시간",
  "상태",
];

export interface TableColumns {
  [key: string]: unknown;
}

export const USER_LIST_COLUMNS: ColumnsType<DataType> = [
  {
    title: "닉네임",
    dataIndex: "nickName",
    key: "nickName",
  },
  {
    title: "이메일",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "등급",
    dataIndex: "flag",
    key: "flag",
  },
  {
    title: "게시글",
    dataIndex: "feedCount",
    key: "feedCount",
    sorter: (a: any, b: any) => b.feedCount - a.feedCount,
  },
  {
    title: "댓글",
    dataIndex: "replyCount",
    key: "replyCount",
    sorter: (a: any, b: any) => b.replyCount - a.replyCount,
  },
  {
    title: "가입시기",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "신고승인횟수",
    dataIndex: "approveCount",
    key: "approveCount",
    sorter: (a: any, b: any) => b.approveCount - a.approveCount,
  },
  {
    title: "상태",
    dataIndex: "userStatus",
    key: "userStatus",
  },
];
