"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();
  return (
    <main className="article">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-4 flex-grow mb-8">
        <div className="md:col-span-3 lg:mr-16">
          <div className="flex items-center gap-x-2">
            <h1 className="text-3xl font-semibold">Product</h1>
          </div>
          <hr className="my-8" />
          <p>
            Products are the items that sellers put up for sale on Shopier.
            These are listed by specifying product details and uploading product
            images. <br /> <br />
            By using the /products endpoints you may;
          </p>

          <br />

          <ul className="list-inside list-disc">
            <li>list the details of all products in the shop,</li>
            <li>get the details of a single product,</li>
            <li>create a new product,</li>
            <li>update an existing product,</li>
            <li>delete an existing product</li>
          </ul>

          <hr className="my-8" />

          <div className="flex justify-end gap-x-2 mt-8">
            <Link
              className="font-semibold hover:cursor-pointer flex items-center gap-x-2"
              href="/productModel"
            >
              <span>The Product model</span>
              <ArrowRight
                height={20}
                onClick={() => router.push("/productModel")}
                className="text-gray-400 hover:cursor-pointer transform transition hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
export default HomePage;
