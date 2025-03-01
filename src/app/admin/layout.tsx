"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PATHS } from "@/constants";
import { ToastContainer, toast } from 'react-toastify';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const tabs = [
    {
      path: PATHS.admin,
      label: "Bảng điều khiển",
    },
    {
      path: PATHS.adminCategories,
      label: "Thể loại",
    },
    {
      path: PATHS.adminSounds,
      label: "Âm thanh",
    },
  ];

  const [activeTab, setActiveTab] = useState(pathname);

  return (
    <>
      <div className="flex justify-center gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            href={tab.path}
            className={`px-4 py-2 font-medium ${
              activeTab === tab.path
                ? "border-b-2 border-gray-800 text-gray-800"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab(tab.path)}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <div className="mt-4">{children}</div>
      <ToastContainer
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick
        theme="light"
      />
    </>
  );
}
