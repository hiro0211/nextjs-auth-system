import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"
import type { Database } from "@/lib/database.types"
import Profile from "@/app/components/profile"


const ProfilePage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies
  })
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect("/auth/login")
  }
  
  return <Profile  />
}

export default ProfilePage

