"use client";
import TableForm from "@/components/Table/TableForm";
import Button from "@/components/Button";
import useReportStore from "@/store/useReportStore";
import useGetReportQuery from "@/queries/useGetReportQuery";
import usePostReportMutation from "@/queries/usePostReportMutation";
import { useEffect, useState } from "react";
import { ReportDataType } from "@/types";
import { ColumnsType } from "antd/es/table";
import { formatDate } from "@/util";
import Modal from "@/components/Modal";

function Report() {
  const [pageNumber, setPageNumber] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ReportDataType>();
  const { reportData } = useReportStore();
  const { data, prefetchNextPage } = useGetReportQuery(pageNumber - 1);
  const reportBody = {
    contentId: reportData?.detail.feedId ?? 0,
    reportedId: reportData?.reported.id ?? 0,
  };

  const { rejectReportMutation, approveReportMutation } = usePostReportMutation(
    reportBody,
    pageNumber - 1
  );

  useEffect(() => {
    prefetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const { isLoading: rejecting, mutate: reject } = rejectReportMutation;
  const { isLoading: approving, mutate: approve } = approveReportMutation;

  const onClickBtn = (status: string) => {
    if (status === "APPROVED") {
      approve();
    } else {
      reject();
    }
  };

  const REPORT_LIST_COLUMNS: ColumnsType<ReportDataType> = [
    {
      title: "보기",
      dataIndex: "type",
      key: "type",
      render: (text, record) => (
        <button
          className="border border-red-200 px-1 py-0.5 rounded-md w-20 hover:bg-red-200 transition-all duration-100"
          onClick={() => {
            setModalOpen(true);
            setModalData(record);
          }}
        >
          {text}
        </button>
      ),
    },
    {
      title: "피신고자",
      dataIndex: ["reported", "nickName"],
      key: "reported",
    },
    {
      title: "신고자",
      dataIndex: ["reporter", "nickName"],
      key: "reporter",
    },
    {
      title: "신고이유",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "신고시간",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => formatDate(text),
    },
    {
      title: "처리시간",
      dataIndex: "updatedAt",
      render: (text: string) => formatDate(text),
    },
    {
      title: "상태",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="mb-3 place-self-end">
        <Button
          onClick={() => {
            onClickBtn("REJECTED");
          }}
          styles={`ml-2 ${
            approving || rejecting ? "bg-gray-200" : "bg-yellow-400"
          }`}
          disabled={approving || rejecting}
          text={rejecting ? "진행중..." : "신고반려"}
        />
        <Button
          onClick={() => {
            onClickBtn("APPROVED");
          }}
          styles={`ml-2 ${
            approving || rejecting ? "bg-gray-200" : "bg-red-500"
          }`}
          disabled={approving || rejecting}
          text={approving ? "진행중..." : "신고승인"}
        />
      </div>
      <TableForm
        totalPage={data?.response.totalPage}
        columns={REPORT_LIST_COLUMNS}
        data={data?.response.content}
        page="report"
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
      {modalOpen && (
        <Modal>
          <>
            <div>{modalData?.detail.content}</div>
            <button
              className="border border-red-200 py-1 px-3 rounded-md hover:bg-red-200 transition-all duration-100 justify-self-end"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              닫기
            </button>
          </>
        </Modal>
      )}
    </div>
  );
}

export default Report;
