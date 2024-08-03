"use client"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import React from "react"

export default function Page() {
	const router = useRouter()

	return (
		<div className="flex flex-col items-center justify-center w-full h-full px-10 ">
			<h3 className=" text-4xl py-4 bg-gradient-to-r font-bold from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Choose your game</h3>
			<Tabs defaultValue="account" className="w-full max-w-[600px] flex">
				<TabsList className="flex flex-col h-full justify-evenly rounded-r-none">
					<TabsTrigger value="account">Classic</TabsTrigger>
					<TabsTrigger value="password">IAmTheOne</TabsTrigger>
					<TabsTrigger value="three">1v1</TabsTrigger>
					{/* <TabsTrigger value="four">All In</TabsTrigger> */}
				</TabsList>
				<TabsContent value="account" className="mt-0">
					<Card className=" rounded-l-none">
						<CardHeader>
							<CardTitle>Classic Blind Test</CardTitle>
							<CardDescription>Choose a theme you want to play. You will have few time to guess the song and the artist. Good luck!</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button variant={"gradient"} onClick={() => router.push("app/game/classic")}>
								Choose the classic game
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="password" className="mt-0">
					<Card className="rounded-l-none">
						<CardHeader>
							<CardTitle> IAmTheOne</CardTitle>
							<CardDescription>Choose your countdown, select your favorite artist and find as many of his songs as possible. Prove that you are the best fan ever!</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button variant={"gradient"} onClick={() => router.push("app/game/iamtheone")}>
								Choose the IAmTheOne game
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="three" className="mt-0">
					<Card className="rounded-l-none">
						<CardHeader>
							<CardTitle>1v1</CardTitle>
							<CardDescription>Challenge your friends in a 1v1. You will have to guess the song and the artist with only a few seconds of the song. The first to guess the song wins the round. The first to win 5 rounds wins the game!</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button variant={"gradient"} onClick={() => router.push("app/game/1v1")}>
								Choose the 1v1 game
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				{/* <TabsContent value="four" className="mt-0">
				<Card className="rounded-l-none">
				<CardHeader>
							<CardTitle>UpToDate</CardTitle>
							<CardDescription>
								
							</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button variant={"gradient"} onClick={() => router.push('app/game/allin')}>Choose the All In game</Button>
						</CardFooter>
					</Card>
				</TabsContent> */}
			</Tabs>
		</div>
	)
}
