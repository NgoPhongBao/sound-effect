import type { Metadata } from "next";
import "@/styles/globals.scss";
import Layout from "@/layout";

export const metadata: Metadata = {
  title: "Kho âm thanh miễn phí",
  description: "Kho âm thanh miễn phí",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
