"use client";
import { useState } from "react";
import { USER_LIST_COLUMNS } from "@/constants/table";
import TableForm from "@/components/Table/TableForm";
import Modal from "@/components/Modal";
import TextArea from "antd/es/input/TextArea";
import Button from "@/components/Button";
import useUserStore from "@/store/useUserStore";
import useGetUserListQuery from "@/queries/useGetUserListQuery";
import usePostBlockMemberMutation from "@/queries/usePostBlockMemberMutation";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [reason, setReason] = useState("");
  const { userId, setUserId, nickName, setNickName, status } = useUserStore();

  const {
    data,
    isLoading,
    isError: isGetUserListError,
    error: getUserListError,
  } = useGetUserListQuery();

  const { mutate, isLoading: blockLoading } = usePostBlockMemberMutation({
    userId,
    reason,
  });

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

  const onClickConfirm = () => {
    if (!reason) {
      return alert("사유를 입력해 주세요.");
    }
    mutate();
    setOpenModal(false);
  };

  const onClickCancle = () => {
    setOpenModal(false);
    setUserId(0);
    setNickName("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isGetUserListError) {
    console.error(getUserListError);
  }

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
              <Button
                text="취소"
                onClick={onClickCancle}
                styles="bg-gray-400"
              />
              <Button
                text="확인"
                onClick={onClickConfirm}
                styles="bg-red-400"
              />
            </div>
          </div>
        </Modal>
      )}
      <p className="text-lg">회원 목록 조회</p>
      <Button
        onClick={onClickBtn}
        styles="bg-red-500 place-self-end"
        text={blockLoading ? "진행중..." : "영구차단"}
        disabled={blockLoading}
      />
      <TableForm
        columns={USER_LIST_COLUMNS}
        data={data?.response.content}
        page="user"
      />
    </div>
  );
}
