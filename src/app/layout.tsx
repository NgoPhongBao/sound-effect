import type { Metadata } from "next";
import "@/styles/globals.scss";
import Layout from "@/layout";
import { createClientServerSide } from "@/supabase/server";
import AppProvider from "@/AppContext";
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, DOMAIN } from "@/constants";


export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  robots: "noindex, nofollow",
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: DOMAIN,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: DEFAULT_TITLE,
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
