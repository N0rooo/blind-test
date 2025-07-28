"use client"
import { getTracks } from "@/app/function/itunes/getTracks"
import ConfirmAction from "@/components/modal/confirm-action"
import Player from "@/components/player/player"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronsUpDown, OctagonX } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { toast } from "sonner"

type Selected = {
	label: string
	id: string
	content: {
		id: string
		label: string
	}[]
}

const playlistClassiquesRapFr = {
	label: "Eminem",
	id: "classiques-rap-fr",
	content: [
		{
			id: "",
			label: "Eminem",
		},
		{
		id: "",
		label: "Eminem",
		},

		
	],
}



const playlistsRapFr = {
	label: "Britney Spears",
	id: "britney-spears",
	content: [
		{
			id: "",
			label: "Britney Spears",
		},
		{
			id: "",
			label: "Britney Spears",
		},
	],
}


const genres = [playlistsRapFr, playlistClassiquesRapFr]

export default function Page() {
	const [openGenreCombo, setOpenGenreCombo] = useState(false)
	const [genre, setGenre] = useState<Selected | null>(null)
	const isDesktop = useMediaQuery("(min-width: 768px)")
	const [isCounterStarted, setIsCounterStarted] = useState(false)
	const [counter, setCounter] = useState(3)
	const [isLoading, setIsLoading] = useState(false)
	const [isGameStarted, setIsGameStarted] = useState(false)
	const [tracks, setTracks] = useState<Track[]>([])
	const router = useRouter()
	const [isGameFinished, setIsGameFinished] = useState(false)

	const fetchTracks = async () => {
		setIsLoading(true)
		if (!genre) {
			setIsLoading(false)
			toast.error("Please select a genre")
			return false
		}

		const { data, error } = await getTracks({ list: genre.content, length: 10 })
		if (error) {
			toast.error("Failed to fetch tracks")
			return false
		}
		if (!data) {
			toast.error("No data found")
			return false
		}
		return data
	}

	const startTheGame = async () => {
		const response = await fetchTracks()
		if (response) {
			setIsLoading(false)
			setTracks(response)
			setIsCounterStarted(true)
			startCounter()
		}
	}

	const startCounter = () => {
		const interval = setInterval(() => {
			setCounter((prev) => prev - 1)
		}, 1000)
		setTimeout(() => {
			clearInterval(interval)
			setCounter(3)
			setIsCounterStarted(false)
			setIsGameStarted(true)
		}, 3000)
	}

	if (isCounterStarted) {
		return (
			<div className=" flex mt-[200px] gap-3">
				<p className="text-7xl animate-out-counter font-bold gradient-text">{counter}</p>
			</div>
		)
	}

	if (isLoading) {
		return (
			<div className=" flex mt-[200px] gap-3">
				<Spinner className="mb-2">Loading...</Spinner>
			</div>
		)
	}

	if (isGameStarted && !isGameFinished && !isCounterStarted && !isLoading) {
		// return <code className="h-full overflow-scroll">{JSON.stringify(tracks, null, 2)}</code>
		
		return (
			<>
				<div className="w-full ">
					<ConfirmAction action={() => setIsGameFinished(true)} description="
				Your score will be lost and you will have to start the game again." title="Are you sure you want to stop the game?
					">
						<Button variant={"ghost"} className=" pl-2 pb-3  flex items-center gap-x-2">
							<OctagonX className="h-6  " />
							<p className="mt-1">Stop the game</p>
						</Button>
					</ConfirmAction>
				</div>
				<Player tracks={tracks} className="pt-10" setIsGameFinished={setIsGameFinished} />
			</>
		)
	}

	if (isGameFinished) {
		return (
			<div className="w-full flex flex-col h-full justify-center items-center pb-20">
				<h3 className=" font-bold gradient-text text-5xl">The game has ended</h3>
				<Button onClick={() => router.replace("/app")} variant={"outline"}>
					Go back
				</Button>
			</div>
		)
	}

	if (!isCounterStarted && !isGameStarted && !isLoading) {
		return (
			<>
				<div className="w-full ">
					<Button onClick={() => router.replace("/app")} variant={"ghost"} className=" pl-2 pb-3  flex items-center gap-x-2">
						<ChevronLeft className="h-6  " />
						<p className="mt-1">Go back</p>
					</Button>
				</div>

				<h3 className="text-5xl font-bold pt-20 gradient-text">Classic Blind Test</h3>
				<Card className="max-w-[600px] w-full">
					<CardHeader>
						<CardTitle>Define your rules</CardTitle>
						<CardDescription>Select a genre and start the game. You will have to guess the artist of the song played. You can play in hard mode to increase the difficulty.</CardDescription>
						<Separator />
					</CardHeader>
					<CardContent className="flex flex-col gap-6  ">
						<Combo open={openGenreCombo} setOpen={setOpenGenreCombo} genre={genre} setGenre={setGenre} isDesktop={isDesktop} />
					
					</CardContent>
					<CardFooter>
						<Button disabled={genre == null} onClick={startTheGame} className={cn("")} variant="gradient">
							Start the game
						</Button>
					</CardFooter>
				</Card>
			</>
		)
	}
}

interface GenreComboProps {
	open: boolean
	setOpen: (open: boolean) => void
	genre: Selected | null
	setGenre: (genre: Selected | null) => void
	isDesktop: boolean
}
const Combo = ({ open, setOpen, genre, setGenre, isDesktop }: GenreComboProps) => {
	return (
		<div className="flex flex-col space-y-1.5">
			<Label>Choose your genre</Label>

			{isDesktop ? (
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
							{genre?.id ? genres.find((framework) => framework.id === genre.id)?.label : "Select genre..."}
							<ChevronsUpDown className="ml-2 mb-[2px]  h-4 w-4 shrink-0 opacity-50 " />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0">
						<List setOpen={setOpen} setSelected={setGenre} dataList={genres} />
					</PopoverContent>
				</Popover>
			) : (
				<Drawer open={open} onOpenChange={setOpen}>
					<DrawerTrigger asChild>
						<Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between ">
							{genre?.id ? genres.find((framework) => framework.id === genre.id)?.label : "Select genre..."}
							<ChevronsUpDown className="ml-2 mb-[2px] h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<div className="mt-4 border-t">
							<List setOpen={setOpen} setSelected={setGenre} dataList={genres} />
						</div>
					</DrawerContent>
				</Drawer>
			)}
		</div>
	)
}

function List({ dataList, setOpen, setSelected }: { dataList: Selected[]; setOpen: (open: boolean) => void; setSelected: (selected: Selected | null) => void }) {
	return (
		<Command>
			<CommandInput placeholder="Filter status..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{dataList.map((genre) => (
						<CommandItem
							key={genre.id}
							value={genre.id}
							onSelect={(value: string) => {
								setSelected(dataList.find((data) => data.id === value) || null)
								setOpen(false)
							}}>
							{genre.label}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	)
}
