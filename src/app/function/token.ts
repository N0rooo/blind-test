// import { error } from "console";
// import { getSpotifyToken } from "../api/getSpotifyToken";

// export const fetchAndStoreToken = async () => {
//   const access_token = await getSpotifyToken()
//   if (!access_token || access_token === '') return {error: 'Failed to fetch token'};
//   localStorage.setItem('access_token', access_token);
//   const expiryTime = new Date().getTime() + 3600 * 1000; 
//   localStorage.setItem('token_expiry', String(expiryTime));
//   return {error: null};

// }

// export const isTokenValid = () => {
//   const tokenExpiry = localStorage.getItem('token_expiry');
//   if (!tokenExpiry) return false;

//   const currentTime = new Date().getTime();
//   return currentTime < Number(tokenExpiry);
// }