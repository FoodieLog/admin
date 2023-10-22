"use client";
import { useEffect, useState, ReactElement } from "react";
import { USER_LIST_COLUMNS } from "@/constants/table";
import { getUserList, postBlockMember } from "@/api/request";
import TableForm from "@/components/Table/TableForm";
import Modal from "@/components/Modal";
import TextArea from "antd/es/input/TextArea";
import Buttom from "@/components/Buttom";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [reason, setReason] = useState("");
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
  const onClickConfirm = async () => {
    try {
      await postBlockMember({ userId, reason });
    } catch (err) {}
    setOpenModal(false);
  };
  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (e.target.value.trim()) {
      setReason(e.target.value.trim());
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {openModal && (
        <Modal>
          <div>
            <h2>영구차단하시겠습니까?</h2>
            <p>영구차단 사유를 작성해 주세요.</p>
            <p>회원이 작성 사유를 확인할 수 있습니다.</p>
            <TextArea onChange={onChangeTextArea} />
            <button type="button" onClick={() => setOpenModal(false)}>
              취소
            </button>
            <button type="button" onClick={onClickConfirm}>
              확인
            </button>
          </div>
        </Modal>
      )}
      <p className="text-lg">회원 목록 조회</p>
      <Buttom
        onClick={onClickBtn}
        styles="bg-red-500 place-self-end"
        text="영구차단"
      />
      <TableForm columns={USER_LIST_COLUMNS} data={data} />
    </div>
  );
}
