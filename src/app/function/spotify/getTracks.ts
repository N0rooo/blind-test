"use server"
import { cookies } from "next/headers"

type List = {
	label: string
	id: string
}

export async function getTracks({ list, length=20 }: { list: List[], length?: number }) {
	try {
		
	
	const access_token = cookies().get("access_token")?.value

	console.log("access_token", access_token)

	const playlistsTracks = list.map(async (item) => {
		const response = await fetch(`https://api.spotify.com/v1/playlists/${item.id}`, {
			headers: {
				Authorization: "Bearer " + access_token,
			},
		})
		if (!response.ok) {
			console.log("Failed to fetch tracks")
			return
		}
		const data = await response.json()
		return data.tracks.items
	})
	const response = await Promise.all(playlistsTracks)
	const playlists = response.map((item, index) => {
		return {
			label: list[index].label,
			tracks: item,
		}
	})

	let trackWithoutDuplicate: any[] = [];
	let duplicate: any[] = [];

	playlists.forEach((playlist) => {
		playlist.tracks.forEach((track: any) => {
			if (!trackWithoutDuplicate.find((item) => item.track.id === track.track.id)) {
				trackWithoutDuplicate.push(track)
			}else{
				duplicate.push(track)

			}
		})
	})
	trackWithoutDuplicate.sort( (a, b) => {
		if(a.track.popularity < b.track.popularity) { return 1; }
		if(a.track.popularity  > b.track.popularity) { return -1; }
		return 0;
	})

	const tracks:Track[] = trackWithoutDuplicate.map((item) => {
		return {
			id: item.track.id,
			name: item.track.name,
			popularity: item.track.popularity,
			preview_url: item.track.preview_url,
			cover: item.track.album.images[0].url,
			artists: item.track.artists.map((artist: any) => {
				return {
					name: artist.name,
				}
			}),
		}
	})

	const randomTracks = Array.from({ length: length }, (_, i) => {
		const randomIndex = Math.floor(Math.random() * tracks.length)
		return tracks[randomIndex]
	}
	)

	return  {
		error: null,
		data: randomTracks
	
	}

} catch (error) {
	return {
		error: error,
		data: null
	}
		
}
}
