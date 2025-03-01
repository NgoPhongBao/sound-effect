"use client";
import { useAppContext } from "@/AppContext";
import { useEffect } from "react";
import { redirect } from "next/navigation";
export default function AdminPage() {
  const { user } = useAppContext();

  // useEffect(() => {
  //   if (!user) {
  //     redirect("/login");
  //   }
  // }, [user]);

  return (
    <div>
      Xin chào: <span className="font-bold">{user?.email}</span>
    </div>
  );
}
