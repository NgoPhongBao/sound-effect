import LoginForm from "./login-form";
import { createClientServerSide } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
export default async function Account() {
  const supabase = await createClientServerSide();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/account");
  }

  return <LoginForm />;
}
