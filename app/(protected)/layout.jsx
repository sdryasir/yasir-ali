import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({children}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login"); // redirect to login if not authenticated
  }

  return <>{children}</>;
}
