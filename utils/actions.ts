import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function authenticateAndRedirect() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return userId;
}
