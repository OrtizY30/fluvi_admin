
import { cookies } from "next/headers";

export default async function getToken() {
  const cookieStore = await cookies(); // ✅ En Next.js 15 es async
  const token = cookieStore.get("FLUVI_AUTH_TOKEN")?.value;
  return token || null;
}