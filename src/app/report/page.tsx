"use client";
import { useEffect, useState } from "react";
import { getReportList } from "@/api/request";
import { REPORT_LIST_COLUMNS } from "@/constants/table";
import TableForm from "@/components/Table/TableForm";
import Buttom from "@/components/Buttom";

function Report() {
  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    getReportUsers();
  }, []);

  const getReportUsers = async () => {
    const { response } = await getReportList();
    setReportList(response.content);
  };

  const onClickBtn = () => {};

  return (
    <div className="flex flex-col">
      <div className="mb-3 place-self-end">
        <Buttom onClick={onClickBtn} styles="bg-yellow-400" text="신고반려" />
        <Buttom onClick={onClickBtn} styles="ml-2 bg-red-500" text="신고승인" />
      </div>
      <TableForm data={reportList} columns={REPORT_LIST_COLUMNS} />
    </div>
  );
}

export default Report;
