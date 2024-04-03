"use client";
import { useState } from "react";
import { getBadgeList, patchBadgeStatus } from "@/api/request";
import { Radio, Input, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import CustomButton from "@/components/Button";
import { formatDate } from "@/util";
import useGetBadgeQuery from "@/queries/useGetBadgeQuery";
import useBadgeMutation from "@/queries/useBadgeMutation";

const { Option } = Select;

interface BadgeApplication {
  badgeApplyId: number;
  nickName: string;
  email: string;
  feedCount: number;
  replyCount: number;
  followerCount: number;
  applyAt: string;
  processedStatus: string;
}

const BadgeManagement = () => {
  const [nickName, setNickName] = useState<string>("");
  const [nickNameData, setNickNameData] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("all");
  const [processedStatus, setProcessedStatus] = useState<string>("UNPROCESSED");
  const [selectedBadgeApplyId, setSelectedBadgeApplyId] = useState<
    number | null
  >(null);
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 20;

  const { data } = useGetBadgeQuery(processedStatus, pageNum - 1, nickNameData);
  const { rejectBadgeMutation, approveBadgeMutation } = useBadgeMutation(
    processedStatus,
    pageNum - 1,
    selectedBadgeApplyId,
    nickNameData
  );

  const columns: ColumnsType<BadgeApplication> = [
    {
      title: "",
      dataIndex: "badgeApplyId",
      render: (text: any, record: any) => (
        <Radio
          onChange={() => setSelectedBadgeApplyId(record.badgeApplyId)}
          checked={selectedBadgeApplyId === record.badgeApplyId}
        />
      ),
    },
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
      title: "팔로워 수",
      dataIndex: "followerCount",
      key: "followerCount",
    },
    {
      title: "신청시기",
      dataIndex: "applyAt",
      key: "applyAt",
      render: (text: string) => formatDate(text),
    },
    {
      title: "처리 상태",
      dataIndex: "processedStatus",
      key: "processedStatus",
    },
  ];

  return (
    <div>
      <div className="text-lg mb-2">뱃지 신청 관리</div>
      <div className="mb-3">
        {" "}
        {/* 이 div는 검색 관련 요소를 담습니다 */}
        <div className="flex items-center">
          <Radio.Group
            onChange={(e) => setSearchType(e.target.value)}
            value={searchType}
          >
            <Radio value={"all"}>전체 조회</Radio>
            <Radio value={"nickname"}>닉네임으로 조회</Radio>
          </Radio.Group>
          {searchType === "nickname" && (
            <Input
              placeholder="닉네임"
              style={{ width: "100px" }}
              onChange={(e) => setNickName(e.target.value)}
            />
          )}
          <div className="ml-1">
            <Select
              defaultValue="UNPROCESSED"
              style={{ width: 90 }}
              onChange={(value) => setProcessedStatus(value)}
            >
              <Option value="UNPROCESSED">미처리</Option>
              <Option value="APPROVED">승인</Option>
              <Option value="REJECTED">반려</Option>
            </Select>
          </div>
          {searchType === "nickname" && (
            <div className="ml-4">
              <CustomButton
                onClick={() => {
                  setNickNameData(nickName);
                }}
                styles="bg-red-500 place-self-end text-sm"
                text="검색"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end mb-3">
        {" "}
        {/* 이 div는 뱃지 버튼을 담고 오른쪽 정렬합니다 */}
        <CustomButton
          text="뱃지 반려"
          styles="bg-orange-500 place-self-end mr-2 text-sm"
          onClick={() => {
            if (selectedBadgeApplyId !== null) {
              rejectBadgeMutation.mutate();
            }
          }}
        />
        <CustomButton
          text="뱃지 승인"
          styles="bg-blue-500 place-self-end mr-2 text-sm"
          onClick={() => {
            if (selectedBadgeApplyId !== null) {
              approveBadgeMutation.mutate();
            }
          }}
        />
      </div>
      <Table
        size="small"
        style={{ whiteSpace: "nowrap" }}
        columns={columns}
        dataSource={data?.response.content}
        rowKey={(record) => record.badgeApplyId}
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

export default BadgeManagement;
