import { userRequest, authRequest } from "@/api";
import { BlockBody } from "@/types";

// 로그인
interface Login {
  email: string;
  password: string;
}

export const login = async (body: Login) => {
  const res = await authRequest.post("/admin/auth/login", body);

  return res.data;
};

// 회원 목록 조회
export const getUserList = async () => {
  const res = await userRequest.get("/admin/member/list");

  return res.data;
};

// 신고 목록 조회
export const getReportList = async () => {
  const res = await userRequest.get("/admin/report/list");

  return res.data;
};

// 영구 정지
export const postBlockMember = async (body: BlockBody) => {
  const res = await userRequest.post("/admin/member/block", body);

  return res.data;
};
