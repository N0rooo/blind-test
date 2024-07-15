import Spotify from "@/components/svg/spotify"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"


export default function Home() {
	return (
		<section className="flex flex-col items-center h-full  justify-center">
			<NotConnected />
		</section>
	)
}


const NotConnected = () => {

	return (
		<div className="flex flex-col justify-center items-center ">
			<h1
				className="text-6xl leading-[70px]
      bg-gradient-to-r font-bold from-indigo-400 to-cyan-400 bg-clip-text text-transparent
      ">
				blind test.
			</h1>
			<Separator className="bg-gradient-to-r from-indigo-400 to-cyan-400" />
			<div className="flex items-end gap-x-4 pt-4">
				<p className="text-foreground">via</p>
				<Spotify width={100} height={"auto"} className="fill-foreground" />
			</div>
			<Link className="text-foreground hover:scale-105 transition-transform hover:transition-colors hover:text-transparent mt-4 hover:bg-gradient-to-r hover:from-indigo-400 bg-clip-text hover:to-cyan-400" href={"/login"}>
				Connect to the app
			</Link>
		</div>
	)
}
