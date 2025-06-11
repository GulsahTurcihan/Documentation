"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React from "react";

import links, { getStyle } from "@/utils/links";

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" className="hidden lg:block">
      <SidebarHeader className="mt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-center">
              <SidebarMenuButton size="lg" asChild></SidebarMenuButton>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
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
                        <span className="text-[16px] ml-4">{link.label}</span>
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
    </Sidebar>
  );
}
