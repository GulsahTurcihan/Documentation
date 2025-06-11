"use client";

import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { SquareMenu } from "lucide-react";
import links from "@/utils/links";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <nav className="flex items-center text-md font-thin text-sidebar-foreground lg:ml-[31.5rem] lg:mr-[8rem] lg:mt-6 my-6">
      <Sheet>
        <SheetTrigger className="lg:hidden md:hidden mx-4">
          <SquareMenu />
        </SheetTrigger>
        <SheetContent className="bg-sidebar w-[300px]" side="left">
          <SheetHeader>
            <SheetTitle className="hidden">menu</SheetTitle>
          </SheetHeader>
          <ul className="grid w-[200px] gap-4 mt-8 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  className="flex items-center gap-2 hover:bg-sidebar-accent p-2 rounded-md"
                  href={link.href}
                >
                  {link.icon}
                  <span className="text-sm">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>

      <NavigationMenu>
        <NavigationMenuItem className="lg:hidden md:hidden flex justify-start items-start">
          <NavigationMenuContent className="bg-sidebar">
            <ul className="grid w-[200px] gap-4 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    className="flex items-center gap-2 hover:bg-sidebar-accent p-2 rounded-md"
                    href={link.href}
                  >
                    {link.icon}
                    <span className="text-sm">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenu>
    </nav>
  );
}
