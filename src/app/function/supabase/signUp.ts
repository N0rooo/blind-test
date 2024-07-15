"use server"

import { createSupabaseAppServerClient } from "@/app/supabase/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const signUp = async (formData: FormData) => {
	const email = formData.get("email") as string
	const password = formData.get("password") as string
	const firstname = formData.get("firstname") as string
	const lastname = formData.get("lastname") as string
	const supabase = createSupabaseAppServerClient()
	const origin = headers().get("origin")

	console.log(email)


	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/auth/callback`,
			data: {
				firstname: firstname,
				lastname: lastname,
			},
		},
	})

	if (error) {
		if (error.message.includes("User already registered")) {
			return "Cet email est déjà utilisé."
		}
		if (error.message.includes('duplicate key value violates unique constraint "profiles_username_key"')) {
		return 'Ce nom d\'utilisateur est déjà utilisé.'
	}
}

	return redirect(`${origin}/auth/callback`)
}
