import { userRequest, authRequest } from "@/api";

interface Login {
  email: string;
  password: string;
}

export const login = async (body: Login) => {
  const res = await authRequest.post("/admin/auth/login", body);

  return res.data;
};
