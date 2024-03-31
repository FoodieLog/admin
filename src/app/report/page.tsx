"use client";
import { REPORT_LIST_COLUMNS } from "@/constants/table";
import TableForm from "@/components/Table/TableForm";
import Button from "@/components/Button";
import useReportStore from "@/store/useReportStore";
import useGetReportQuery from "@/queries/useGetReportQuery";
import usePostReportMutation from "@/queries/usePostReportMutation";
import { useEffect, useState } from "react";

function Report() {
  const [pageNumber, setPageNumber] = useState(1);
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
        columns={REPORT_LIST_COLUMNS}
        data={data?.response.content}
        page="report"
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}

export default Report;
