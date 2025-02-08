"use client";

import { ChevronUp, GalleryVerticalEnd, Search, User2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import links, { getStyle } from "@/utils/links";
import Link from "next/link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function AppSidebar() {
  return (
    <aside className="hidden md:block">
      <Sidebar collapsible="offcanvas" className="hidden lg:block">
        <SidebarHeader className="mt-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-x-36 justify-between">
                <SidebarMenuButton size="lg" asChild>
                  <Link href="/">
                    <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <GalleryVerticalEnd className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">Docs</span>
                      <span className="">v1.0.0</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <form>
          <SidebarGroup className="px-2">
            <SidebarGroupContent className="relative">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <Input
                id="search"
                placeholder="Search the docs..."
                className="pl-8 "
              />
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </SidebarGroupContent>
          </SidebarGroup>
        </form>

        <SidebarContent className="mt-8">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-y-4">
                {links.map((link) => (
                  <SidebarMenuItem key={link.label}>
                    <SidebarMenuButton asChild>
                      <a
                        href={link.href}
                        className="flex justify-between items-center w-full"
                      >
                        <div className="flex justify-between items-center gap-2">
                          {link.icon}
                          <span>{link.label}</span>
                        </div>
                        {link.tag && getStyle(link.tag as string)}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </aside>
  );
}
