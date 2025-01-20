"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
function Container({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();

  return (
    <main>
      {state === "expanded" ? (
        <div className="ml-[24rem] mr-[8rem] mt-20 ">{children}</div>
      ) : (
        <div className="ml-[4rem] mr-[8rem] mt-20 ">{children}</div>
      )}
    </main>
  );
}

export default Container;
