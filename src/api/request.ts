import { userRequest, authRequest } from "@/api";
import { BlockBody, PatchReportBody } from "@/types";

// 로그인
interface Login {
  email: string;
  password: string;
}

export const login = async (body: Login) => {
  const { data } = await authRequest.post("/admin/auth/login", body);

  return data;
};

// 회원 목록 조회
export const getUserList = async (pageNum: number) => {
  const { data } = await userRequest.get(`/admin/member/list?page=${pageNum}`);

  return data;
};

// 신고 목록 조회
export const getReportList = async (pageNum: number) => {
  const { data } = await userRequest.get(`/admin/report/list?page=${pageNum}`);

  return data;
};

// 신고 처리
export const patchReport = async (body: PatchReportBody) => {
  const { data } = await userRequest.patch("/admin/report/process", body);
  return data;
};

// 영구 정지
export const postBlockMember = async (body: BlockBody) => {
  const { data } = await userRequest.post("/admin/member/block", body);

  return data;
};

// 탈퇴 회원 조회
export const getWithdrawerList = async (
  badge: string,
  pageNum: number,
  nickName?: string
) => {
  const { data } = await userRequest.get(
    `/admin/member/withdraw/list?page=${pageNum}&badge=${badge}${
      nickName ? `&nickName=${nickName}` : ""
    }`
  );

  return data;
};

// 탈퇴 회원 복구
export const patchRestoreWithdrawer = async (withdrawId: string) => {
  const { data } = await userRequest.patch(
    `/admin/member/withdraw/restore?withdrawId=${withdrawId}`
  );

  return data;
};

// 뱃지 처리 현황 조회
export const getBadgeList = async (
  processedStatus: string,
  pageNum: number,
  nickName?: string
) => {
  const { data } = await userRequest.get(
    `/admin/member/badge/list?page=${pageNum}&processedStatus=${processedStatus}${
      nickName ? `&nickName=${nickName}` : ""
    }`
  );
  return data;
};

// 뱃지 승인 반려 처리
export const patchBadgeStatus = async (
  badgeApplyId: number,
  process: string
) => {
  const { data } = await userRequest.patch(
    `/admin/member/badge/${process}?badgeApplyId=${badgeApplyId}`
  );
  return data;
};
