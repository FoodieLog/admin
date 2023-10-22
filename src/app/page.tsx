"use client";
import { useEffect, useState, ReactElement } from "react";
import { USER_LIST_COLUMNS } from "@/constants/table";
import { getUserList, postBlockMember } from "@/api/request";
import TableForm from "@/components/Table/TableForm";
import Modal from "@/components/Modal";
import TextArea from "antd/es/input/TextArea";
import Buttom from "@/components/Buttom";
import useUserStore from "@/store/useUserStore";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [reason, setReason] = useState("");
  const [reload, setReload] = useState(false);
  const { userId, setUserId, nickName, setNickName, status, setStatus } =
    useUserStore();

  useEffect(() => {
    getUserListData();
  }, [reload]);

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
    if (!userId && !nickName) {
      return alert("회원을 선택해 주세요.");
    }
    if (status === "BLOCK") {
      return alert("이미 영구차단된 회원입니다.");
    }
    if (nickName === "관리자") {
      return alert("관리자는 차단할 수 없습니다.");
    }
    setOpenModal(true);
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setReason(e.target.value.trim());
  };

  const onClickConfirm = async () => {
    if (!reason) {
      return alert("사유를 입력해 주세요.");
    }

    try {
      await postBlockMember({ userId, reason });
      setReload(!reload);
      setOpenModal(false);
      setUserId(0);
      setNickName("");
    } catch (err) {
      console.log("영구정지 실패", err);
    }
  };

  const onClickCancle = () => {
    setOpenModal(false);
    setUserId(0);
    setNickName("");
  };

  return (
    <div className="flex flex-col gap-3">
      {openModal && (
        <Modal>
          <div>
            <h2 className="text-xl mb-3">
              <strong>{nickName}</strong>님을 영구차단하시겠습니까?
            </h2>
            <p>영구차단 사유를 작성해 주세요.</p>
            <p className="mb-3">회원이 작성 사유를 확인할 수 있습니다.</p>
            <TextArea onChange={onChangeTextArea} className="mb-3" />
            <div className="w-full flex justify-center gap-3">
              <Buttom
                text="취소"
                onClick={onClickCancle}
                styles="bg-gray-400"
              />
              <Buttom
                text="확인"
                onClick={onClickConfirm}
                styles="bg-red-400"
              />
            </div>
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
