"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/api/request";

function Login() {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdmin({
      ...admin,
      [name]: value,
    });
  };

  const onSubminHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { response } = await login({
        email: admin.email,
        password: admin.password,
      });
      localStorage.setItem("admin-token", response.accessToken);
      router.replace("/");
    } catch (err) {
      console.log("관리자 로그인 실패", err);
    }
  };

  return (
    <>
      <p>로그인</p>
      <form onSubmit={onSubminHandler}>
        <input
          name="email"
          type="text"
          value={admin.email}
          onChange={onChangeHandler}
          className="border border-slate-800"
        />
        <input
          name="password"
          type="password"
          value={admin.password}
          onChange={onChangeHandler}
          className="border border-slate-800"
        />
        <button type="submit">로그인</button>
      </form>
    </>
  );
}

export default Login;
