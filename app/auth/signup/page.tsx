import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import type { Database } from "@/lib/database.types";
import { Signup } from "@/app/components/signup";

export const SignupPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // セッションを取得
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Failed to fetch session:", error.message);
  }

  if (session) {
    redirect("/");
  }

  return <Signup/>;
};

export default SignupPage;
