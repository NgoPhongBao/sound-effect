import type { Metadata } from "next";
import "@/styles/globals.scss";
import Layout from "@/layout";
import { createClientServerSide } from "@/supabase/server";
import AppProvider from "@/AppContext";

export const metadata: Metadata = {
  title: "Kho âm thanh miễn phí",
  description: "Kho âm thanh miễn phí",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClientServerSide();
  const [{ data: { user } }, { data: categories }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from("categories").select("*").order("priority", { ascending: false })
  ]);

  return (
    <html lang="en">
      <body className="container">
        <AppProvider user={user} categories={categories}>
          <Layout>{children}</Layout>
        </AppProvider>
      </body>
    </html>
  );
}
