"use client"
import React from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { signUpWithGoogle } from "@/app/function/supabase/providers/signInWithGoogle"
import { toast } from "sonner"
import { signIn } from "@/app/function/supabase/signIn"

export default function Login() {

	const handleSignIn = async (formData: FormData) => {
		const error = await signIn(formData)
		if (error) {
			if (error.includes("Invalid login credentials")) toast.error("Email ou mot de passe incorrect")
			else toast.error(error)
		} 
	}
	const connectWithGoogle = async () => {
		const error = await signUpWithGoogle()
		if (error) {
			console.error(error)
			toast.error("Erreur lors de la connexion avec Google")
		}
	}
	
	return (
		<form  action={handleSignIn} className="grid gap-4">
			<div className="grid gap-2">
				<Label htmlFor="email">Email</Label>
				<Input name="email" id="email" type="email" placeholder="blindtest@exemple.com" required />
			</div>
			<div className="grid gap-2">
				<div className="flex items-center">
					<Label htmlFor="password">Password</Label>
					{/* <Link href="#" className="ml-auto inline-block text-sm underline">
						Forgot password ?
					</Link> */}
				</div>
				<Input name="password" id="password" type="password" placeholder="••••••••••••••••" required />
			</div>
			<Button type="submit" className="w-full">
				Login
			</Button>
			<Button type="button" onClick={connectWithGoogle} variant="outline" className="w-full">
				Login with Google
			</Button>
		</form>
	)
}
