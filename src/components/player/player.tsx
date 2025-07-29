/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useRef, useState } from "react"
import AudioSpectrum from "react-audio-spectrum"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "../ui/card"
import { AspectRatio } from "../ui/aspect-ratio"
import Image from "next/image"
import CryptoJS from "crypto-js"
import { toast } from "sonner"
import { Skeleton } from "../ui/skeleton"
import { cleanData } from "@/app/function/clean-song-title"

interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {
	tracks: Track[]
	setIsGameFinished: (value: boolean) => void
}

export default function Player({ tracks, className, setIsGameFinished }: PlayerProps) {
	const audioRef = useRef<HTMLAudioElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isLastTrack, setIsLastTrack] = useState(false)
	const [isCorrect, setIsCorrect] = useState(false)
	const [trackSelected, setTrackSelected] = useState<Track>(tracks[0])
	const timeOut = useRef<NodeJS.Timeout>()
	const encrypt_key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY
	const [correctTitle, setCorrectTitle] = useState<string>("")
	const [correctArtists, setCorrectArtists] = useState<string[]>([])
	const inputUser = useRef<HTMLInputElement>(null)
	const [hasLose, setHasLose] = useState(false)

	// Log initial tracks data

	const nextAudio = () => {
		clearTimeout(timeOut.current)
		clear()

		const currentTrack = tracks.find((track) => track === trackSelected)
		if (!currentTrack) {
			return
		}
		const currentIndex = tracks.indexOf(currentTrack)
		const nextTrack = tracks[currentIndex + 1]

		if (nextTrack) {
			setTrackSelected(nextTrack)
			if (nextTrack.id === tracks[tracks.length - 1].id) {
				setIsLastTrack(true)
			}
		} else {
			console.log("No more tracks available")
		}
	}

	const clear = () => {
		setHasLose(false)
		setCorrectTitle("")
		setCorrectArtists([])
		setIsCorrect(false)
	}

	const playAudio = () => {
		if (audioRef.current) {
			audioRef.current
				.play()
				.then(() => {
					setIsPlaying(true)
					fadeIn()
				})
				.catch((error) => {
					console.error("Error playing audio:", error)
				})
		}
	}

	// const fadeOut = () => {
	// 	if (audioRef.current) {
	// 		if (audioRef.current.volume < 0.01) {
	// 			audioRef.current.pause()
	// 			audioRef.current.currentTime = 0
	// 			setIsPlaying(false)
	// 			return
	// 		}
	// 		audioRef.current.volume -= 0.01
	// 		if (audioRef.current.volume > 0) {
	// 			setTimeout(fadeOut, 100)
	// 		}
	// 	}
	// }
	const fadeIn = () => {
		if (audioRef.current) {
			audioRef.current.volume += 0.01
			if (audioRef.current.volume < 0.2) {
				setTimeout(fadeIn, 100)
			}
		}
	}

	const decryptData = (data: string) => {
		if (!encrypt_key) {
			console.error("ENCRYPTION_KEY is not defined")
			return
		}
		return CryptoJS.AES.decrypt(data, encrypt_key)?.toString(CryptoJS.enc.Utf8)
	}

	// ON CHANGE INPUT
	const cryptUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value

		Object.keys(trackSelected).forEach((key) => {
			trackSelected.artists.map((artist) => {
				const decryptedArtist = decryptData(artist.name)
				if (!decryptedArtist) {
					console.error("Error decrypting artist name:", artist)
					return
				}
				const isArtistCorrect = checkIfCorrect({ el1: decryptedArtist, el2: inputValue })
				if (isArtistCorrect && !correctArtists.includes(decryptedArtist)) {
					inputUser.current!.value = ""
					setCorrectArtists([...correctArtists, decryptedArtist])
				}
			})
			const decryptedTitle = decryptData(trackSelected.name)
			if (!decryptedTitle) {
				console.error("Error decrypting track title:", trackSelected)
				return
			}

			const isTitleCorrect = checkIfCorrect({ el1: decryptedTitle, el2: inputValue })

			if (isTitleCorrect && !correctTitle) {
				inputUser.current!.value = ""
				setCorrectTitle(decryptedTitle)
			}
		})
	}

	const checkIfCorrect = ({ el1, el2 }: { el1: string; el2: string }) => {
		return cleanData(el1) === cleanData(el2)
	}


	// useEffect(() => {
	// 	if (isPlaying) {
	// 		// use my ref timeOut
	// 		timeOut.current = setTimeout(() => {
	// 			fadeOut()
	// 		}, 20000)
	// 	}
	// 	return () => {
	// 		clearTimeout(timeOut.current)
	// 	}
	// }, [isPlaying])

	useEffect(() => {
		const handlePlayAudio = () => {
			if (!audioRef.current) return
			audioRef.current.load()
			audioRef.current.volume = 0
			if (!trackSelected.preview_url) {
				console.error("Preview URL is null or undefined:", trackSelected)
				return
			}
			playAudio()
		}
		handlePlayAudio()
	}, [trackSelected])

	useEffect(() => {
		const audio = audioRef.current
		if (audio) {
			const onEnded = () => {
				setIsPlaying(false)
			}

			audio.addEventListener("ended", onEnded)
			return () => {
				audio.removeEventListener("ended", onEnded)
			}
		}
	}, [])

	useEffect(() => {
		if (correctTitle && correctArtists.length === trackSelected.artists.length) {
			console.log("Correct answer")
			setIsCorrect(true)
		}
	}, [correctTitle, correctArtists])

	if (!trackSelected) {
		return (
			<div className="w-full h-full items-center flex flex-col">
				<h3 className="text-2xl font-normal">No track found</h3>
			</div>
		)
	}

	const revealAnswer = () => {
		setHasLose(true)
	setCorrectTitle(decryptData(trackSelected.name) ?? "")
		const selected = trackSelected.artists.map((artist) => {
			const decryptedArtist = decryptData(artist.name)
			if (!decryptedArtist) {
				console.error("Error decrypting artist name:", artist)
				return ""
			}
			
			return decryptedArtist
			
		})
		setCorrectArtists(selected)
	}

	return (
		<div className={cn("w-full h-full items-center  flex flex-col", className)}>
			<h3 className="text-5xl gradient-text  font-bold">Listen to the track ...</h3>
			<div className=" w-full  relative max-w-[400px] px-2 justify-start flex items-center">
				<div className="max-w-[120px]  mb-2 w-full flex flex-col items-center ">
					<AspectRatio ratio={1 / 1} className="bg-muted rounded-lg ">
						<Image src={CryptoJS.AES.decrypt(trackSelected.cover, encrypt_key!).toString(CryptoJS.enc.Utf8)} alt="Photo by Drew Beamer" fill className="rounded-lg object-cover" />
						{!isCorrect && (
							<div className="absolute   flex items-center justify-center inset-0 bg-input rounded-lg">
								<p className="  text-5xl pt-4 text-primary-foreground ">?</p>
							</div>
						)}
					</AspectRatio>
				</div>
				<div className=" p-4 text-lg w-full gap-y-3 flex flex-col">
					{correctTitle ? <p className="text-2xl font-bold">{correctTitle}</p> : <Skeleton className="animate-none w-full h-[20px] rounded-full" />}
					<div className="flex flex-wrap gap-x-3">
						{trackSelected.artists.map((artist, index) => {
							const decryptValue = CryptoJS.AES.decrypt(artist.name, encrypt_key!)?.toString(CryptoJS.enc.Utf8)
							return correctArtists.includes(decryptValue) ? (
								<p key={index} className=" font-bold">
									{decryptValue}
								</p>
							) : (
								<Skeleton key={index} className="animate-none my-1 w-[70px] h-[20px] rounded-full" />
							)
						})}
					</div>
				</div>
			</div>
			<div className=" relative justify-center flex items-center">
				<audio id="audio-element" ref={audioRef} src={trackSelected.preview_url} crossOrigin="anonymous" />
				<div className="absolute bottom-0 left-[50%] -translate-x-[50%]">
					<AudioSpectrum
						id="audio-canvas"
						height={100}
						width={900}
						audioId={"audio-element"}
						capColor={"#22D3EE"}
						capHeight={2}
						meterWidth={2}
						meterCount={512}
						meterColor={[
							{ stop: 0, color: "#22D3EE" },
							{ stop: 0.5, color: "#6366F1" },
							{ stop: 1, color: "#22D3EE" },
						]}
						gap={10}
					/>
				</div>
			</div>
			<Separator />
			<Card className="w-[400px] mt-2">
				<CardContent className="p-6">
					<Input ref={inputUser} disabled={hasLose} name="name" onChange={cryptUserInput} />
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant={"ghost"} disabled={isCorrect} onClick={revealAnswer}>
						Reveal
					</Button>
					<Button disabled={!isCorrect} onClick={isLastTrack ?  () => setIsGameFinished(true) : nextAudio }>
						{isLastTrack ? "Finish" : "Next"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
