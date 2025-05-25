export function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // client side
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000"; // dev SSR
}