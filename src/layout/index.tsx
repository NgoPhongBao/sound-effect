"use client";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="container min-h-[calc(100vh-64px-193px)] bg-gray-100 px-4 py-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
