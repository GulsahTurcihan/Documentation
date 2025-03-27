"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { EllipsisVertical } from "lucide-react";
import { languageIcons, getIconStyle } from "@/utils/languageIcons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAsideContext } from "@/app/provider";

function LanguageButtons() {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  // Context'i her durumda ve koşulsuz olarak çağır.
  const asideContext = useAsideContext();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { setSelectedLanguage } = asideContext;

  const handleLanguageChange = (language: any) => {
    setSelectedLanguage(language);
    console.log("Selected Language:", language);
  };

  const visibleIcons =
    windowWidth < 1600 ? languageIcons.slice(0, 3) : languageIcons.slice(0, 5);
  const hiddenIcons = languageIcons.slice(windowWidth < 1600 ? 3 : 5);

  return (
    <div className="my-4">
      <h1 className="mb-4 text-sm font-semibold text-gray-500 uppercase hidden lg:flex">
        LANGUAGE
      </h1>
      <div className="lg:flex hidden lg:gap-x-6 mb-2">
        {visibleIcons.map((icon) => (
          <Button
            key={icon.label}
            className="py-6 px-4 w-16 hover:ring-1 hover:ring-sidebar-border focus:ring-1 focus:ring-sidebar-ring hover:cursor-pointer"
            onClick={(event) => {
              handleLanguageChange(icon.icon);
              event.preventDefault();
            }}
          >
            <div className="justify-items-center ">
              {getIconStyle(icon.icon)}
              <span className="text-xs font-normal">{icon.label}</span>
            </div>
          </Button>
        ))}
        {hiddenIcons.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="py-6 px-4 hover:ring-1 hover:ring-sidebar-border focus:ring-2 focus:ring-sidebar-border">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-sidebar ">
              <div className="flex flex-col gap-y-2 items-start">
                {hiddenIcons.map((icon) => (
                  <DropdownMenuItem
                    key={icon.label}
                    className="items-start w-full hover:bg-sidebar-accent hover:cursor-pointer "
                    onClick={(event) => {
                      handleLanguageChange(icon.icon);
                      event.preventDefault();
                    }}
                    asChild
                  >
                    <div className="items-start flex gap-x-4 ">
                      {getIconStyle(icon.icon)}
                      <span className="text-xs font-normal ml-2 ">
                        {icon.label}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default LanguageButtons;

/*function LanguageButtons() {
  const visibleIcons = languageIcons.slice(0, 5);
  const hiddenIcons = languageIcons.slice(7);
  const iconsSmallScreen = languageIcons.slice(0, 3);

  const asideContext = useAsideContext();

  if (!asideContext) {
    return (
      <p className="text-red-500">Error: Language context is not available.</p>
    );
  }

  const { setSelectedLanguage } = asideContext;

  const handleLanguageChange = (languages: string) => {
    setSelectedLanguage(languages);
    console.log("Selected Language:", languages);
  };

  return (
    <div className="my-4">
      <h1 className="mb-4 text-sm font-semibold text-gray-500 uppercase">
        LANGUAGE
      </h1>

      <div className="flex lg:gap-x-4 mb-2">
        {visibleIcons.map((icon) => (
          <Button
            key={icon.label}
            className="py-6 px-4 w-16 hover:ring-1 hover:ring-sidebar-border focus:ring-1 focus:ring-sidebar-ring hover:cursor-pointer"
            onClick={(event) => {
              handleLanguageChange(icon.icon);
              event.preventDefault();
            }}
          >
            <div className="justify-items-center ">
              {getIconStyle(icon.icon)}
              <span className="text-xs font-normal">{icon.label}</span>
            </div>
          </Button>
        ))}
        {hiddenIcons.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="py-6 px-4 hover:ring-1 hover:ring-sidebar-border focus:ring-2 focus:ring-sidebar-border">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-sidebar ">
              <div className="flex flex-col gap-y-2 items-start">
                {hiddenIcons.map((icon) => (
                  <DropdownMenuItem
                    key={icon.label}
                    className="items-start w-full hover:bg-sidebar-accent hover:cursor-pointer "
                    onClick={(event) => {
                      handleLanguageChange(icon.icon);
                      event.preventDefault();
                    }}
                    asChild
                  >
                    <div className="items-start flex gap-x-4 ">
                      {getIconStyle(icon.icon)}
                      <span className="text-xs font-normal ml-2 ">
                        {icon.label}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default LanguageButtons; */
