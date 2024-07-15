/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useRef, useState } from "react"
import AudioSpectrum from "react-audio-spectrum"
import { Separator } from "../ui/separator"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "../ui/card"



interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {
	tracks: Track[]
}

export default function Player({ tracks, className }: PlayerProps) {
	const audioRef = useRef<HTMLAudioElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)
  const [trackIsEnded, setTrackIsEnded] = useState(false)
  const [isLastTrack, setIsLastTrack] = useState(false)
  const [trackSelected, setTrackSelected] = useState<Track>(tracks[0])
console.log(tracks)
	

  const nextAudio = () => {
    const currentTrack = tracks.find(track => track === trackSelected)
    if (!currentTrack) {
      return
    }
    const currentIndex = tracks.indexOf(currentTrack)
    
    setTrackSelected(tracks[currentIndex + 1])
    if (tracks[currentIndex + 1].id === tracks[tracks.length - 1].id) {
      setIsLastTrack(true)
    }

    setTrackIsEnded(false)
  }

	useEffect(() => {
		playAudio()
	}, [trackSelected])

	const fadeInVolume = () => {
		const interval = setInterval(() => {
			if (audioRef.current) {
				if (audioRef.current.volume == 0.1) {
					return
				}
				if (audioRef.current.volume >= 0.098) {
					audioRef.current.volume = 0.1
					clearInterval(interval)
					return
				}
				audioRef.current.volume += 0.02
			}
		}, 200)
		setTimeout(() => {
			clearInterval(interval)
		}, 1000)
		setTimeout(() => {
			fadeOutVolume()
		}, 20000)
	}

	const fadeOutVolume = () => {
		
		const interval = setInterval(() => {
			if (audioRef.current) {
				console.log(audioRef.current.volume)
				if (audioRef.current.volume <= 0.02) {
					audioRef.current.volume = 0
					clearInterval(interval)
					return
				}
				audioRef.current.volume -= 0.02
			}
		}, 200)
		setTimeout(() => {
			clearInterval(interval)
			if (audioRef.current) {

				audioRef.current.pause()
				audioRef.current.currentTime = 0
        setTrackIsEnded(true)
			}
		}, 1000)
	}

	const playAudio = () => {
		if (audioRef.current) {
			audioRef.current
				.play()
				.then(() => {
					setIsPlaying(true)
					fadeInVolume()
					console.log("Audio is playing")
				})
				.catch((error) => {
					console.error("Error playing audio:", error)
				})
		}
	}

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0
			audioRef.current.muted = false // Ensure audio is not muted
			audioRef.current.loop = false
			audioRef.current.autoplay = false
			playAudio()
		}
	}, [tracks])

	return (
		<div className={cn("w-full h-full items-center flex flex-col",className)}>

    <h3 className="text-5xl gradient-text font-bold">Listen the track ...</h3>
			<audio key={trackSelected.id} id="audio-element" ref={audioRef} src={trackSelected.preview_url} crossOrigin="anonymous" />
		
			{/* <div className=" border-primary bg-border overflow-hidden flex items-end h-[200px] rounded-full"> */}
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
			<Separator />
      <Card className="w-[400px] mt-2">
				<CardContent className=" p-6">
      <Input value={trackSelected?.name}  />
			</CardContent>
			<CardFooter >
      <Button disabled={!trackIsEnded} onClick={nextAudio}>{isLastTrack ? "Finish" : "Next"}</Button>
			</CardFooter>
			</Card>
			{/* </div> */}
		</div>
	)
}
