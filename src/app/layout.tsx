import type { Metadata } from "next";
import "@/styles/globals.scss";
import Layout from "@/layout";
import { createClientServerSide } from "@/supabase/server";
import AppProvider from "@/AppContext";

export const metadata: Metadata = {
  title: "KhoÂmThanh.com - Kho âm thanh & Sound Effect miễn phí",
  description: "Chia sẻ kho âm thanh, sound effect miễn phí cho dự án làm phim, edit video của bạn. Các file MP3 tại KhoÂmThanh.com là: ✓ Miễn phí bản quyền ✓ Không cần ghi nguồn",
  robots: "noindex, nofollow",
  openGraph: {
    title: "KhoÂmThanh.com - Kho âm thanh & Sound Effect miễn phí",
    description: "Chia sẻ kho âm thanh, sound effect miễn phí cho dự án làm phim, edit video của bạn. Các file MP3 tại KhoÂmThanh.com là: ✓ Miễn phí bản quyền ✓ Không cần ghi nguồn",
    url: "https://khoamthanh.com",
    images: [
      {
        url: "https://khoamthanh.com/khoamthanh.com.png",
        alt: "KhoÂmThanh.com - Kho âm thanh & Sound Effect miễn phí",
      },
    ],
    type: 'website',
  },
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
