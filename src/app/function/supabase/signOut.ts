"use server"

import { createSupabaseAppServerClient } from "@/app/supabase/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const signOut = async () => {
  const origin = headers().get("origin")

	const supabase = createSupabaseAppServerClient()
	await supabase.auth.signOut()

  return redirect(`${origin}/`)

	
}
