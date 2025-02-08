import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { useState } from "react";

export async function authenticateAndRedirect() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return userId;
}
