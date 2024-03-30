"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthCheck: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();
  let expiryDate: number | null = null;

  if (typeof window !== "undefined") {
    const expiryDateString = localStorage.getItem("admin-token-expiration");
    expiryDate = expiryDateString ? Number(expiryDateString) : null;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin-token");

      if (!token || expiryDate === null || expiryDate < Date.now()) {
        router.push("/login");
      }
    }
  }, [expiryDate, router, pathName]);

  return null;
};

export default AuthCheck;
