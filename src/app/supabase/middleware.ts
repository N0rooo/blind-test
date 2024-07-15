import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { getSpotifyToken } from "../function/getSpotifyToken"

export async function updateSession(request: NextRequest) {

	let supabaseResponse = NextResponse.next({
		request,
	})

	const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
		cookies: {
			getAll() {
				return request.cookies.getAll()
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
				supabaseResponse = NextResponse.next({
					request,
				})
				cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
			},
		},
	})

	const {
		data: { user },
	} = await supabase.auth.getUser()


	if (!user && request.nextUrl.pathname !== "/" && request.nextUrl.pathname !== "/login" && request.nextUrl.pathname !== "/signup" && !request.nextUrl.pathname.startsWith("/auth")) {
		const url = request.nextUrl.clone()
		url.pathname = "/"
		return NextResponse.redirect(url)
	} else if (user) {
		console.log("User is logged in")
		if (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup") {
			const url = request.nextUrl.clone()
			url.pathname = "/app"
			return NextResponse.redirect(url)
		}
		const requestUrl = new URL(request.url)
		const origin = requestUrl.origin

		let accessToken = request.cookies.get("access_token")
		let tokenExpiry = request.cookies.get("token_expiry")

		const isTokenValid = () => {
			if (!tokenExpiry) return false
			const currentTime = new Date().getTime()
			console.log(currentTime, parseInt(tokenExpiry.value))
			return currentTime < parseInt(tokenExpiry.value)
		}
		if (!accessToken || !isTokenValid()) {
			try {
				console.log("Getting new token")
				const newAccessToken = await getSpotifyToken()
				const expiryTime = new Date().getTime() + 3600 * 1000

				const response = NextResponse.next()
				console.log("Setting new token")
				response.cookies.set("access_token", newAccessToken, { httpOnly: true, secure: true, maxAge: 3600 })
				response.cookies.set("token_expiry", expiryTime.toString(), { httpOnly: true, secure: true, maxAge: 3600 })
				return response
			} catch (error) {
				return NextResponse.redirect(`${origin}/`)
			}
		}

		return NextResponse.next()
	}
	return supabaseResponse
}
