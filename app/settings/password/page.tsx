import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import Password from '@/app/components/password'
import type { Database } from '@/lib/database.types'


const PasswordPage = async () =>{
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッション取得
  const {
    data: { session},
  } = await supabase.auth.getSession()

  // 未認証の場合、リダイレクト
  if (!session) {
    redirect('/auth/login')
  }

  return <Password />
}

export default PasswordPage