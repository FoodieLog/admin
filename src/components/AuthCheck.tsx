"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthCheck: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();
  const expiryDateString = localStorage.getItem("admin-token-expiration");
  const expiryDate = Number(expiryDateString);

  useEffect(() => {
    const token = localStorage.getItem("admin-token");

    if (!token || expiryDate < Date.now()) {
      router.push("/login");
    }
  }, [expiryDate, router, pathName]);

  return null;
};

export default AuthCheck;
