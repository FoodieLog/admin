// WithdrawnMembers.tsx
"use client";
import { useState } from "react";
import { getWithdrawerList, patchRestoreWithdrawer } from "@/api/request";
import { Radio, Input, Button, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import CustomButton from "@/components/Button";
import { formatDate } from "@/util";
import useGetWithdrawQuery from "@/queries/useGetWithdrawQuery";
import useWithdrawMutation from "@/queries/useWithdrawMutation";

const { Option } = Select;

interface WithdrawnMember {
  withdrawId: number;
  nickName: string;
  email: string;
  flag: string;
  feedCount: number;
  replyCount: number;
  createdAt: string;
  withDrawAt: string;
  withdrawReason: string;
}

const WithdrawnMembers = () => {
  const [badge, setBadge] = useState<string>("N"); // Default '일반'
  const [searchType, setSearchType] = useState<string>("all");
  const [nickName, setNickName] = useState<string>("");
  const [nickNameData, setNickNameData] = useState<string>("");
  const [withdrawerId, setWithdrawerId] = useState<string>("");
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 20;
  const restoreWithdraw = useWithdrawMutation(badge, pageNum, withdrawerId);
  const { data } = useGetWithdrawQuery(badge, pageNum - 1, nickNameData);

  const columns: ColumnsType<WithdrawnMember> = [
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
      render: (text: string) => (text === "Y" ? "우수회원" : "일반회원"),
    },
    {
      title: "게시글",
      dataIndex: "feedCount",
      key: "feedCount",
    },
    {
      title: "댓글",
      dataIndex: "replyCount",
      key: "replyCount",
    },
    {
      title: "가입시기",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => formatDate(text),
    },
    {
      title: "탈퇴시기",
      dataIndex: "withDrawAt",
      key: "withDrawAt",
      render: (text: string) => formatDate(text),
    },
    {
      title: "탈퇴사유",
      dataIndex: "withdrawReason",
      key: "withdrawReason",
    },
    {
      title: "탈퇴 복구",
      key: "restore",
      render: (text, record) => (
        <Button
          type="default"
          size="small"
          danger
          onClick={() => {
            setWithdrawerId(record.withdrawId.toString());
            if (withdrawerId) {
              restoreWithdraw.mutate();
            }
          }}
        >
          복구 승인
        </Button>
      ),
    },
  ];

  const handleSelectChange = (value: string) => {
    setBadge(value);
  };

  const handleRadioChange = (e: any) => {
    setSearchType(e.target.value);
  };

  const handleNickNameChange = (e: any) => {
    setNickName(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="text-lg mb-2">탈퇴 회원 목록</div>
      <div className="mb-3 flex items-center">
        <Radio.Group onChange={handleRadioChange} value={searchType}>
          <Radio value={"all"}>전체 조회</Radio>
          <Radio value={"nickname"}>닉네임으로 조회</Radio>
        </Radio.Group>
        {searchType === "nickname" && (
          <Input
            placeholder="닉네임"
            style={{ width: "150px" }}
            onChange={handleNickNameChange}
          />
        )}
        <span className="ml-3 mr-1">등급</span>
        <Select
          defaultValue="N"
          style={{ width: 120 }}
          onChange={handleSelectChange}
        >
          <Option value="N">일반회원</Option>
          <Option value="Y">우수회원</Option>
        </Select>
        <span className="mr-4"></span>
        {searchType === "nickname" && (
          <CustomButton
            onClick={() => {
              setNickNameData(nickName);
            }}
            styles="bg-red-500 place-self-end text-sm"
            text="검색"
          />
        )}
      </div>
      <Table
        size="small"
        style={{ whiteSpace: "nowrap" }}
        columns={columns}
        dataSource={data?.response.content}
        rowKey={(record) => record.withdrawId}
        pagination={{
          total: data?.response.totalPage * pageSize,
          current: pageNum,
          pageSize,
          onChange: (page) => {
            setPageNum(page);
          },
        }}
      />
    </div>
  );
};

export default WithdrawnMembers;
