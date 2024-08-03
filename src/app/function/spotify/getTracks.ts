"use server"
import { cookies } from "next/headers"
import CryptoJS from 'crypto-js';

type List = {
	label: string
	id: string
}

export async function getTracks({ list, length = 20 }: { list: List[]; length?: number }) {
	try {
		const access_token = cookies().get("access_token")?.value


		const playlistsTracks = list.map(async (item) => {
			const response = await fetch(
				`https://api.spotify.com/v1/playlists/${item.id}?market=FR&fields=tracks.items(track(id,name,preview_url,album(images),artists(name),popularity))
			`,
				{
					headers: {
						Authorization: "Bearer " + access_token,
					},
				}
			)
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

		let trackWithoutDuplicate: any[] = []
		let duplicate: any[] = []

		playlists.forEach((playlist) => {
			playlist.tracks.forEach((track: any) => {
				if (!trackWithoutDuplicate.find((item) => item.track.id === track.track.id)) {
					trackWithoutDuplicate.push(track)
				} else {
					duplicate.push(track)
				}
			})
		})
		trackWithoutDuplicate.sort((a, b) => {
			if (a.track.popularity < b.track.popularity) {
				return 1
			}
			if (a.track.popularity > b.track.popularity) {
				return -1
			}
			return 0
		})

		const tracks: Track[] = trackWithoutDuplicate.map((item) => {
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

		const notNullTracks = tracks.filter((track) => track.preview_url !== null)

		const mostPopularTracks = notNullTracks
		

		const randomTracks = Array.from({ length }, () => {
			const randomIndex = Math.floor(Math.random() * mostPopularTracks.length);
			const selectedTrack = mostPopularTracks[randomIndex];
			mostPopularTracks.splice(randomIndex, 1); // Remove the selected track
			return selectedTrack;
	});

  const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

  // Encrypt the data
	if (!encryptionKey) {
		return {
			error: "ENCRYPTION_KEY is not defined",
			data: null,
		}
	}
  const trackCrypted = randomTracks.map((track) => {
		return {
			...track,
			name: CryptoJS.AES.encrypt(track.name, encryptionKey).toString(),
			artists: track.artists.map((artist: any) => {
				return {
					name: CryptoJS.AES.encrypt(artist.name, encryptionKey).toString(),
				}
			}),
			cover: CryptoJS.AES.encrypt(track.cover, encryptionKey).toString(),

		
		}
	})

		return {
			error: null,
			data: trackCrypted,
		}
	} catch (error) {
		return {
			error: error,
			data: null,
		}
	}
}
