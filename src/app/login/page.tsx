"use client"
import Login from "@/components/auth/login"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import React from "react"

export default function Page() {
	const router = useRouter()

	return (
		<div className="w-full  lg:grid lg:min-h-[600px] xl:min-h-[800px] h-full">
			<div className="flex items-center justify-center py-12  h-full">
				<div className="mx-auto grid w-[350px] gap-6 ">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Login</h1>
						<p className="text-balance text-muted-foreground">
						Enter your email below to login to your account							
						</p>
					</div>
					<Login />
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account yet ?{" "}
						<Button onClick={() => router.replace("/signup")} variant={"link"} className="underline px-2">
							Sign up
						</Button>
					</div>{" "}
				</div>{" "}
			</div>
		</div>
	)
}
