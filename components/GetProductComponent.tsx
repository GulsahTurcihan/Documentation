"use client";

import { FormProvider, useForm } from "react-hook-form";
import {
  CreateAndEditProductType,
  createAndEditProductSchema,
} from "@/utils/types";
import response200 from "@/public/icons/response-200.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListHoverCard } from "./cards/ListHoverCard";
import Image from "next/image";
import postIcon from "@/public/icons/postIcon.svg";
import { Separator } from "./ui/separator";
import { CustomFormField } from "./forms/FormComponents";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Objects } from "./attributes/objects";
import LanguageButtons from "./prism/LanguageButtons";
import Credentials from "./prism/Credentials";
import { Button } from "./ui/button";
import { useAsideContext } from "@/app/provider";
import ResponseComponent from "./prism/ResponseComponent";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GeneratedCodeBlockGetProduct } from "./prism/GeneratedCodeBlockGetProduct";
import LanguageSelector from "./prism/LanguageSelector";

function GetProductComponent() {
  const {
    selectedLanguage,
    bearerToken,
    setBearerToken,
    apiResponse,
    setApiResponse,
  } = useAsideContext();

  const form = useForm<CreateAndEditProductType>({
    resolver: zodResolver(createAndEditProductSchema),
    defaultValues: {
      id: "",
    },
    mode: "onChange",
  });

  const { watch } = form;
  const formValues = watch();

  useEffect(() => {
    const savedResponse = localStorage.getItem("apiResponse");
    if (savedResponse) {
      setApiResponse(JSON.parse(savedResponse));
    }
  }, [setApiResponse]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const mockResponse = {
        status: 200,
        message: "Success!",
        requestData: formValues,
      };
      setApiResponse(mockResponse);
      localStorage.setItem("apiResponse", JSON.stringify(mockResponse));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-4 flex-grow mb-8">
          <div className="md:col-span-3 lg:mr-16">
            <div className="flex items-center gap-x-2">
              <h1 className="text-3xl font-semibold">Get a Product</h1>
              <ListHoverCard />
            </div>
            <div className="flex items-center gap-x-2">
              <Image src={postIcon} alt="get" width={48} height={48} />
              <span className="p-span">
                https://api.shopier.com/v1/products/id
              </span>
            </div>
            <p className="mt-2">
              Returns a single product with the provided product ID.
            </p>
            <Separator className="my-4 border-sidebar-border" />
            <h3 className="text-sm capitalize font-semibold mb-2">METADATA</h3>

            {/* ✅ Form Fields */}

            <div className="flex flex-col gap-2 border border-sidebar-border p-4 rounded-md bg-sidebar">
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-[0.25rem]">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    id <span className="p-span">string</span>{" "}
                    <span className="p-span text-red-600">required</span>
                  </h3>
                  <p className="text-sm">
                    Specify the product ID to retrieve the product.
                  </p>
                </div>
                <CustomFormField
                  name="id"
                  control={form.control}
                  className="hover:border-sidebar-ring mt-[0.4rem]"
                />
              </div>
            </div>
            <Separator className="mb-4 mt-8" />

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:bg-white">
                  <div className="flex justify-between">
                    <Image
                      src={response200}
                      width={40}
                      height={40}
                      alt="response-200"
                    />
                    <h1 className="text-sm font-bold">
                      200 <span className="font-normal">(OK)</span>
                    </h1>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <Objects />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8 flex lg:justify-start lg:gap-[20.5rem] justify-between mb-8">
              <Link href="/createProduct" className="flex items-center gap-x-2">
                <ArrowLeft
                  height={20}
                  className="text-gray-400 hover:cursor-pointer transform transition hover:-translate-x-1"
                />
                <span className="font-semibold">Create a product</span>
              </Link>

              <Link href="/updateProduct" className="flex items-center gap-x-2">
                <span className="font-semibold">Update a product</span>
                <ArrowRight
                  height={20}
                  className="text-gray-400 hover:cursor-pointer transform transition hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          <div className="md:col-span-2 md:top-4 ">
            <LanguageButtons />
            <LanguageSelector />
            <Credentials onTokenChange={setBearerToken} />

            <GeneratedCodeBlockGetProduct
              selectedLanguage={selectedLanguage}
              bearerToken={bearerToken}
              formValues={formValues}
              productId={form.watch("id")}
            />

            <Button
              onClick={fetchData}
              className="my-2 w-full bg-sidebar-accent hover:border hover:border-sidebar-ring px-4 py-2 rounded text-gray-500"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Try it!"}
            </Button>
            {apiResponse && <ResponseComponent responseData={apiResponse} />}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
export default GetProductComponent;
