"use client";
import { useEffect, useState } from "react";
import TableForm from "@/components/Table/TableForm";
import { getReportList } from "@/api/request";
import { REPORT_LIST_COLUMNS } from "@/constants/table";

function Report() {
  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    getReportUsers();
  }, []);

  const getReportUsers = async () => {
    const { response } = await getReportList();
    setReportList(response.content);
  };

  return <TableForm data={reportList} columns={REPORT_LIST_COLUMNS} />;
}

export default Report;
