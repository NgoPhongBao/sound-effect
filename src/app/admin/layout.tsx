"use client";
import { useState } from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    {
      id: "/admin",
      label: "Bảng điều khiển",
    },
    {
      id: "/admin/categories",
      label: "Thể loại",
    },
    {
      id: "/admin/sounds",
      label: "Âm thanh",
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <>
      <div className="flex justify-center gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.id}
            className={`px-4 py-2 font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-gray-800 text-gray-800"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <div className="mt-4">{children}</div>
    </>
  );
}
