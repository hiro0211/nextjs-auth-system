import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import Email from '@/app/components/email'
import type { Database } from '@/lib/database.types'

const EmailPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies
  })
  const {
    data: {session} } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  return <Email email={session.user.email!} />

}

export default EmailPage

