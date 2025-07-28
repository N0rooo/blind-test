"use server"
import CryptoJS from 'crypto-js';

type List = {
	label: string
	id: string
}

export async function getTracks({ list, length = 20 }: { list: List[]; length?: number }) {
	try {
		// iTunes Search API ne nécessite pas d'authentification
		// Nous allons utiliser les genres comme termes de recherche
		const tracksPromises = list.map(async (item) => {
			const response = await fetch(
				`https://itunes.apple.com/search?term=${encodeURIComponent(item.label)}&media=music&entity=song&limit=50&country=FR`
			)
			
			if (!response.ok) {
				console.log("Failed to fetch tracks from iTunes")
				return []
			}
			
			const data = await response.json()
			return data.results || []
		})

		const responses = await Promise.all(tracksPromises)
		const allTracks = responses.flat()

		// Supprimer les doublons basés sur trackId
		const trackWithoutDuplicate = allTracks.filter((track: any, index: number, self: any[]) => 
			index === self.findIndex((t) => t.trackId === track.trackId)
		)

		// Trier par popularité (basé sur le prix ou la disponibilité de preview)
		trackWithoutDuplicate.sort((a: any, b: any) => {
			// Prioriser les tracks avec preview_url
			if (a.previewUrl && !b.previewUrl) return -1
			if (!a.previewUrl && b.previewUrl) return 1
			return 0
		})

		const tracks: Track[] = trackWithoutDuplicate.map((item: any) => {
			return {
				id: item.trackId.toString(),
				name: item.trackName,
				popularity: item.trackPrice || 0, // Utiliser le prix comme indicateur de popularité
				preview_url: item.previewUrl,
				cover: item.artworkUrl100?.replace('100x100', '600x600') || item.artworkUrl60?.replace('60x60', '600x600'),
				artists: [{
					name: item.artistName,
				}],
			}
		})

		const notNullTracks = tracks.filter((track) => track.preview_url !== null)

		if (notNullTracks.length === 0) {
			return {
				error: "Aucune piste avec preview trouvée",
				data: null,
			}
		}

		const mostPopularTracks = notNullTracks

		const randomTracks = Array.from({ length: Math.min(length, mostPopularTracks.length) }, () => {
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