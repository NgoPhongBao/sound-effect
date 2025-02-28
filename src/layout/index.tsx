import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { createClientServerSide } from "@/supabase/server";
import AppProvider from "@/AppContext";

export default async function Layout({ children }: { children: ReactNode }) {
  const supabase = await createClientServerSide();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <AppProvider user={user}>
      <Header />
      <main className="container min-h-[calc(100vh-64px-193px)] bg-gray-100 px-4 py-4">
        {children}
      </main>
      <Footer />
    </AppProvider>
  );
}
