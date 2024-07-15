"use server"

import { createSupabaseAppServerClient } from "@/app/supabase/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const signIn = async (formData: FormData) => {
	const email = formData.get("email") as string
	const password = formData.get("password") as string
	const supabase = createSupabaseAppServerClient()
	const origin = headers().get("origin")

	
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,

	})

	if (error) {
		return error.message
	}

	return redirect(`${origin}/app`)

	

	
}

