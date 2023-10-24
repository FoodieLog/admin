"use client";
import { useEffect, useState } from "react";
import { getReportList, patchReport } from "@/api/request";
import { REPORT_LIST_COLUMNS } from "@/constants/table";
import TableForm from "@/components/Table/TableForm";
import Buttom from "@/components/Buttom";
import Modal from "@/components/Modal";

function Report() {
  const [openModal, setOpenModal] = useState(false);
  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    getReportUsers();
  }, []);

  const getReportUsers = async () => {
    const { response } = await getReportList();
    setReportList(response.content);
    console.log(response.content);
  };

  // const patchReport = async () => {
  //   await patchReport({contentId, reportedId, userStatus});

  // }

  const onClickBtn = () => {
    setOpenModal(true);
  };

  return (
    <div className="flex flex-col">
      {openModal && (
        <Modal>
          <div></div>
        </Modal>
      )}
      <div className="mb-3 place-self-end">
        <Buttom onClick={onClickBtn} styles="bg-yellow-400" text="신고반려" />
        <Buttom onClick={onClickBtn} styles="ml-2 bg-red-500" text="신고승인" />
      </div>
      <TableForm data={reportList} columns={REPORT_LIST_COLUMNS} />
    </div>
  );
}

export default Report;
