"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import redirectHard from "../function/hard-refresh"
import { signUpWithGoogle } from "../function/supabase/providers/signInWithGoogle"
import { toast } from "sonner"
import { signUp } from "../function/supabase/signUp"

export default function Page() {

	const handleClick = async () => {
		await redirectHard("/login")
	}

	const connectWithGoogle = async () => {
		const error = await signUpWithGoogle()
		if (error) {
			console.error(error)
			toast.error("Erreur lors de la connexion avec Google")
		}
	}

	const handleSignUp = async (formData: FormData) => {
		const error = await signUp(formData)
		if (error) {
			toast.error(error)
		}
		
	}
	

	return (
		<div className="w-full lg:grid lg:min-h-[600px] h-full xl:min-h-[800px]">
			<div className="flex items-center justify-center py-12 h-full">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Sign up</h1>
						<p className="text-balance text-muted-foreground">Enter your information below to create an account</p>
					</div>
					<form action={handleSignUp} className="grid gap-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label  htmlFor="first-name"> Firstname</Label>
								<Input name="firstname" id="first-name" placeholder="Alex" required />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="last-name">Lastname</Label>
								<Input name="lastname" id="last-name" placeholder="Dupont" required />
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" name="email" type="email" placeholder="blindtest@example.com" required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" name="password" type="password" placeholder="••••••••••••••••" required />
						</div>
						<Button type="submit" className="w-full">
							Sign up
						</Button>
						<Button onClick={connectWithGoogle} variant="outline" className="w-full">
							Sign up with Google
						</Button>
					</form>
					<div className="mt-4 text-center text-sm">
						Already have an account ?
						<Button onClick={handleClick} variant={"link"} className="underline px-2">
							Login
						</Button>
					</div>{" "}
				</div>
			</div>
		</div>
	)
}
