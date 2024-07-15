"use client"
import Login from "@/components/auth/login"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import { redirect, usePathname, useRouter } from "next/navigation"
import React from "react"

export default function Page() {
	const router = useRouter()
	const getBack = () => {
		router.back()
	}
	return (
		<Dialog defaultOpen>
			<DialogContent className="mx-auto max-w-sm" onInteractOutside={getBack} onClickCross={getBack}>
				<DialogHeader>
					<DialogTitle className="text-2xl">Login</DialogTitle>
					<DialogDescription>Enter your information below to login to your account.</DialogDescription>
				</DialogHeader>
				<DialogClose asChild>
					<Login />
				</DialogClose>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account yet ?{" "}
					<DialogClose asChild>
						<Link href="/signup" className="underline">
							Sign up
						</Link>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	)
}
