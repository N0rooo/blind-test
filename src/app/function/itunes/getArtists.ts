"use server"

export async function getArtists({offset = 0, allArtists = [], maxOffset = 50, genre}: {offset?: number, allArtists?: any[], maxOffset?: number, genre: string}) {
	const limit = 50

	try {
		// iTunes Search API pour les artistes
		const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(genre)}&media=music&entity=artist&limit=${limit}&country=FR`)

		if (!response.ok) {
			throw new Error("Failed to fetch artists from iTunes")
		}

		const data = await response.json()
		const fetchedArtists = data.results || []
		allArtists = allArtists.concat(fetchedArtists)

		offset += limit

		// iTunes API a des limites différentes, on s'arrête après quelques requêtes
		if (offset <= maxOffset && fetchedArtists.length >= 20) {
			return await getArtists({offset, allArtists, maxOffset, genre})
		}

		return allArtists
	} catch (error) {
		console.error("Error fetching artists from iTunes:", error)
		return allArtists
	}
} 