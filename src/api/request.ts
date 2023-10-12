import { userRequest, authRequest } from "@/api";

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
