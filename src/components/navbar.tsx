"use client"
import React from "react"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"
import { User } from "@supabase/supabase-js"
import { signOut } from "@/app/function/supabase/signOut"
import { Button } from "./ui/button"
import { Menu, Moon, Package2, Sun } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet"
import { useTheme } from "next-themes"
import redirectHard from "@/app/function/hard-refresh"
import { useRouter } from "next/navigation"

export default function Navbar({ user }: { user: User | null }) {
	const { setTheme } = useTheme()
	const router = useRouter()

	const handleSignOut = async () => {
		await signOut()
	}

	return (
		<header className="z-[10]  relative">
			<nav className="fixed top-0 p-6 w-full  flex justify-between">
				<Link
					href="/"
					className="text-5xl leading-[45px]
      bg-gradient-to-r font-bold from-indigo-400 to-cyan-400 bg-clip-text text-transparent
      ">
					bT.
				</Link>
				<div className="gap-x-4 flex items-center">
					{user?.email && (
						<p className="pt-1 hidden sm:flex">
							You are connected as : &nbsp;<span className="bg-gradient-to-r font-bold gradient-text">{user?.email}</span>
						</p>
					)}
					<ModeToggle className="hidden md:flex" />
					{user && (
						<Button onClick={handleSignOut} variant={"ghost"} className=" hidden md:block px-2">
							{" "}
							Logout{" "}
						</Button>
					)}

					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline" size="icon" className="shrink-0 md:hidden">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right">
							<nav className="grid gap-6 pt-10 text-lg font-medium">
								{user ? (
									<>
										<Link href="#" className="text-muted-foreground hover:text-foreground">
											Dashboard
										</Link>
										<Link href="#" className="text-muted-foreground hover:text-foreground">
											Orders
										</Link>
										<Link href="#" className="text-muted-foreground hover:text-foreground">
											Products
										</Link>
										<Link href="#" className="text-muted-foreground hover:text-foreground">
											Customers
										</Link>
										<Link href="#" className="text-muted-foreground hover:text-foreground">
											Settings
										</Link>
										<SheetClose asChild>

										<button onClick={handleSignOut} className="text-muted-foreground text-left hover:text-foreground">
											Logout
										</button>
										</SheetClose>
									</>
								) : (
									<>
										<SheetClose asChild>
											<button onClick={() => redirectHard("/login")} className="text-left text-muted-foreground hover:text-foreground">
												Login
											</button>
										</SheetClose>
										<SheetClose asChild>
											<button onClick={() => router.push("/signup")} className="text-left text-muted-foreground hover:text-foreground">
												Signup
											</button>
										</SheetClose>
									</>
								)}

								<Button variant="outline" size="icon">
									<Sun onClick={() => setTheme("dark")} className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
									<Moon onClick={() => setTheme("light")} className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
									<span className="sr-only">Toggle theme</span>
								</Button>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	)
}
