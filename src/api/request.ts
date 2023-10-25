import { userRequest, authRequest } from "@/api"
import { BlockBody, PatchReportBody } from "@/types"

// 로그인
interface Login {
  email: string
  password: string
}

export const login = async (body: Login) => {
  const res = await authRequest.post("/admin/auth/login", body)

  return res.data
}

// 회원 목록 조회
export const getUserList = async () => {
  const res = await userRequest.get("/admin/member/list")

  return res.data
}

// 신고 목록 조회
export const getReportList = async () => {
  const res = await userRequest.get("/admin/report/list")

  return res.data
}

// 신고 처리
export const patchReport = async (body: PatchReportBody) => {
  const res = await userRequest.patch("/admin/report/process", body)
  return res.data
}

// 영구 정지
export const postBlockMember = async (body: BlockBody) => {
  const res = await userRequest.post("/admin/member/block", body)

  return res.data
}

// 탈퇴 회원 조회
export const getWithdrawerList = async (badge: string, nickName?: string) => {
  const res = await userRequest.get(
    `/admin/member/withdraw/list?badge=${badge}${
      nickName ? `&nickName=${nickName}` : ""
    }`
  )

  return res.data
}

// 탈퇴 회원 복구
export const patchRestoreWithdrawer = async (withdrawId: string) => {
  const res = await userRequest.patch(
    `/admin/member/withdraw/restore?withdrawId=${withdrawId}`
  )

  return res.data
}

// 뱃지 처리 현황 조회
export const getBadgeList = async (processedStatus: string) => {
  const res = await userRequest.get(`/admin/member/badge/list?processedStatus=${processedStatus}`)
  return res.data
}

// 뱃지 승인 반려 처리
export const patchBadgeStatus = async (badgeApplyId: number, process: string) => {
  const res = await userRequest.patch(`/admin/member/badge/${process}?badgeApplyId=${badgeApplyId}`);
  return res.data;
};