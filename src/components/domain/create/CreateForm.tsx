"use client";

import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

export default function CreateForm() {
  const { user, logout } = useUser();
  console.log(user);

  useEffect(() => {
    if (user!.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
      handleLogout();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">제품 생성하기</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold"
      >
        로그아웃
      </button>
    </div>
  );
}
