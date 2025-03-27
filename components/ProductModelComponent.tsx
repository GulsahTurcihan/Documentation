"use client";

import Link from "next/link";
import { Objects } from "./attributes/objects";
import { Separator } from "./ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";

function ProductModelComponent() {
  return (
    <section>
      <div className="lg:page-layout pb-4">
        <div className="md:col-span-3 lg:mr-16">
          <h1 className="text-3xl font-semibold">The Product Model</h1>

          <Separator className="my-4 border-sidebar-border" />

          <h2 className="text-xl font-semibold">Attributes</h2>
          <Separator className="my-4 border-sidebar-border" />

          <Objects />
        </div>
        <div className="md:col-span-2 md:mt-8">
          <h2 className="text-xs font-semibold mb-4">TABLE OF CONTENT</h2>
          <Link href="/productModel" className="text-xs">
            Attributes
          </Link>
        </div>
      </div>

      <hr className="my-8 lg:w-[40.5rem]" />

      <div className="flex lg:justify-start lg:gap-x-[24rem] mb-8 justify-between">
        <Link href="/" className="flex items-center gap-x-2">
          <ArrowLeft
            height={20}
            className="text-gray-400 hover:cursor-pointer transform transition hover:-translate-x-1"
          />
          <span className="font-semibold">Home page</span>
        </Link>

        <Link href="/listProducts" className="flex items-center gap-x-2">
          <span className="font-semibold">List all products</span>
          <ArrowRight
            height={20}
            className="text-gray-400 hover:cursor-pointer transform transition hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
export default ProductModelComponent;
