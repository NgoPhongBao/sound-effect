import AccountForm from "./account-form";
import { createClientServerSide } from "@/supabase/server";

export default async function Account() {
  const supabase = await createClientServerSide();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AccountForm user={user} />;
}
