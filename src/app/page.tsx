"use client";
import { useEffect, useState, ReactElement } from "react";
import { USER_LIST_COLUMNS } from "@/constants/table";
import { getUserList } from "@/api/request";
import TableForm from "@/components/Table/TableForm";
import Modal from "@/components/Modal";
import TextArea from "antd/es/input/TextArea";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    getUserListData();
  }, []);

  const getUserListData = async () => {
    try {
      const { response } = await getUserList();
      setData(response.content);
      console.log("유저데이터에러", response.content);
    } catch (err) {
      console.log("유저데이터에러", err);
    }
  };

  const onClickBtn = () => {
    setOpenModal(true);
  };

  return (
    <div className="flex flex-col gap-3">
      {openModal && (
        <Modal>
          <div>
            <h2>영구차단하시겠습니까?</h2>
            <p>영구차단 사유를 작성해 주세요.</p>
            <p>회원이 작성 사유를 확인할 수 있습니다.</p>
            <TextArea />
            <button type="button" onClick={() => setOpenModal(false)}>
              취소
            </button>
            <button type="button" onClick={() => setOpenModal(false)}>
              확인
            </button>
          </div>
        </Modal>
      )}
      <p className="text-lg">회원 목록 조회</p>
      <button
        type="button"
        onClick={onClickBtn}
        className="px-5 py-2 bg-red-500 text-white rounded-md place-self-end"
      >
        영구 차단
      </button>
      <TableForm columns={USER_LIST_COLUMNS} data={data} />
    </div>
  );
}
