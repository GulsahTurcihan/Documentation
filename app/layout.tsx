import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product Management Documentation",
  description: "Product management documentation site using Next.js App Router",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <div className="relative min-h-screen flex flex-col w-full">
              <Navbar />
              <div className="flex flex-auto w-full">
                <AppSidebar />
                <SidebarTrigger className="hidden sticky top-0 md:block lg:block ml-3 mt-0" />
                <main className="flex flex-col w-full bg-sidebar p-16 lg:ml-24 lg:mr-[9rem] md:ml-4 md:mr-12 mx-2 my-4 rounded-lg border border-sidebar-border shadow-sm">
                  <Provider> {children}</Provider>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
