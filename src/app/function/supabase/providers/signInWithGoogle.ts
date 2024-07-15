'use server';
import { createSupabaseAppServerClient } from "@/app/supabase/server"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpWithGoogle = async () => {
	const supabase = createSupabaseAppServerClient()
  const origin = headers().get("origin")

  const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
    options: {
      skipBrowserRedirect: true,
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  
  if (data.url) {
    redirect(data.url) 
  }
}
