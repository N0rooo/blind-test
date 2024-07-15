"use server"

import { cookies } from "next/headers"

export async function getArtists({offset = 0, allArtists = [], maxOffset = 50, genre}: {offset?: number, allArtists?: any[], maxOffset?: number, genre: string}) {
	const access_token = cookies().get("access_token")?.value

	const limit = 50

// how to fetch artists from multiple genres
	const response = await fetch(`https://api.spotify.com/v1/search?q=genre:"${genre}"&market=FR&type=artist&limit=${limit}&offset=${offset}`, {
		headers: {
			Authorization: "Bearer " + access_token,
		},
	})


	if (!response.ok) {
		throw new Error("Failed to fetch artists")
	}

	const data = await response.json()
	const fetchedArtists = data.artists.items
	allArtists = allArtists.concat(fetchedArtists)

	offset += limit

	if (offset <= maxOffset && fetchedArtists.length >= 50) {
		return await getArtists({offset, allArtists, maxOffset, genre})
	}

	return allArtists
}
