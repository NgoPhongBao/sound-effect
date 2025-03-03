'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClientServerSide } from '@/supabase/server'
import { PATHS } from '@/constants'


export async function login(prevState: any, formData: FormData) {
  const supabase = await createClientServerSide()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { message: 'Email hoặc mật khẩu không đúng' }
  }

  revalidatePath('/', 'layout')
  redirect(PATHS.admin)
}

export async function signup(formData: FormData) {
  const supabase = await createClientServerSide()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect(PATHS.admin)
}