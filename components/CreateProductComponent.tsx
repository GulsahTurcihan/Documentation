"use client";

import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  CreateAndEditProductType,
  createAndEditProductSchema,
  ProductType,
  PriceCurrency,
  ShippingPayer,
} from "@/utils/types";
import response200 from "@/public/icons/response-200.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListHoverCard } from "./cards/ListHoverCard";
import Image from "next/image";
import postIcon from "@/public/icons/postIcon.svg";
import { Separator } from "./ui/separator";
import {
  CustomFormBooleanSelect,
  CustomFormField,
  CustomFormSelect,
} from "./forms/FormComponents";
import ArrayOfStringField from "./forms/ArrayOfStringField";
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
import { SetStateAction, useEffect, useState } from "react";
import { CreateMediaObject } from "./forms/CreateMediaObject";
import { OptionsForm } from "./forms/OptionsForm";
import { PriceDataForm } from "./forms/PriceDataForm";
import { GeneratedCodeBlockPost } from "./prism/GenerateCodeBlockPost";
import VariantsForm from "./forms/VariantsForm";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LanguageSelector from "./prism/LanguageSelector";

function mapToSelectItems<T>(values: T[]): { label: string; value: T }[] {
  return values.map((value) => ({
    label: String(value), // Kullanıcıya gösterilecek metin
    value, // Formda kullanılacak gerçek değer
  }));
}

function CreateProductComponent() {
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
      title: "",
      description: "",
      types: ProductType.digital,
      media: [
        {
          id: "",
          url: "",
          mediaType: "image",
          placement: 1,
        },
      ],
      priceData: {
        currency: PriceCurrency.usd,
        price: "",
        discount: false,
        discountedPrice: "",
        shippingPrice: "",
      },
      stockQuantity: 0,
      shippingPayer: ShippingPayer.buyerPays,
      category: [],
      variants: [
        {
          selections: [
            {
              selectionId: "",
            },
          ],
          stockQuantity: 1,
        },
      ],
      options: [],
      singleOption: false,
      customListing: false,
      customNote: "",
      placementScore: 1,
      dispatchDuration: 1,
    },
    mode: "onChange",
  });

  const [priceData, setPriceData] = useState(form.getValues().priceData);
  const [mediaData, setMediaData] = useState([]);
  const [variantData, setVariantData] = useState(form.getValues().variants);

  const formValues = useWatch({ control: form.control });
  console.log(formValues.variants);

  const handleMediaUpdate = (data: SetStateAction<never[]>) => {
    setMediaData(data);
  };

  const handlePriceUpdate = (data: any) => {
    if (JSON.stringify(data) !== JSON.stringify(priceData)) {
      setPriceData(data);
      form.setValue("priceData", data, { shouldValidate: true }); // 🔧 Gereksiz render'ı engelle
    }
  };
  const handleVariantUpdate = (data: any) => {
    if (JSON.stringify(data) !== JSON.stringify(variantData)) {
      setVariantData(data);
      form.setValue("variants", data, { shouldValidate: true }); // 🔧 Gereksiz render'ı engelle
    }
  };

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
              <h1 className="text-3xl font-semibold">Create a Product</h1>
              <ListHoverCard />
            </div>
            <div className="flex items-center gap-x-2">
              <Image src={postIcon} alt="get" width={48} height={48} />
              <span className="p-span">
                https://api.shopier.com/v1/products
              </span>
            </div>
            <p className="mt-2">Creates a new product.</p>
            <Separator className="my-4 border-sidebar-border" />
            <h3 className="text-sm capitalize font-semibold mb-2">
              QUERY PARAMS
            </h3>

            {/* ✅ Form Fields */}

            <div className="flex flex-col gap-2 border border-sidebar-border p-4 rounded-md bg-sidebar">
              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    title <span className="p-span">string</span>{" "}
                    <span className="p-span text-red-600">required</span>
                  </h3>
                  <p className="text-sm">Title of the product</p>
                </div>
                <CustomFormField
                  name="title"
                  control={form.control}
                  className="hover:border-sidebar-ring mt-[0.4rem]"
                />
              </div>

              {/* ✅ DESCRIPTION */}

              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    description <span className="p-span">string</span>
                  </h3>
                  <p className="text-sm">
                    Detailed description of the product.
                  </p>
                </div>
                <CustomFormField
                  name="description"
                  control={form.control}
                  className="hover:border-sidebar-ring mt-2"
                />
              </div>

              {/* ✅ PRODUCT TYPE */}

              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    type <span className="p-span">string</span>{" "}
                    <span className="text-red-600 p-span">required</span>
                  </h3>
                  <p className="text-sm">Filter by a product type.</p>
                </div>
                <div className="">
                  <CustomFormSelect
                    name="types"
                    items={mapToSelectItems(Object.values(ProductType))}
                    control={form.control}
                  />
                </div>
              </div>

              {/* ✅ MEDIA */}

              <div className="border-b border-sidebar-border pb-2">
                <h3 className="p-title">
                  media <span className="p-span">array of strings</span>{" "}
                  <span className="p-span text-red-600">required</span>
                </h3>
                <p className="text-sm mb-2">
                  Details of product media files. There can be a maximum of 5
                  media files.
                </p>

                <CreateMediaObject
                  name="media"
                  label="OBJECT"
                  control={form.control}
                  onUpdate={handleMediaUpdate}
                />
              </div>

              {/* ✅ PRICE DATA */}

              <div className="pb-2">
                <h3 className="p-title">
                  priceData <span className="p-span">object</span>{" "}
                  <span className="p-span text-red-600">required</span>
                </h3>
                <p className="text-sm mb-2">
                  Details of the price information.
                </p>
                <PriceDataForm
                  label="PRICE DATA OBJECTS"
                  name="priceData"
                  onUpdate={handlePriceUpdate}
                  defaultValues={priceData}
                />
              </div>

              {/* ✅ STOCK QUANTITY */}

              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    stockQuantity
                    <span className="p-span"> integer</span>
                  </h3>
                  <p className="text-sm">Stock quantity of the product.</p>
                </div>
                <CustomFormField
                  name="stockQuantity"
                  control={form.control}
                  className="hover:border-sidebar-ring mt-[0.4rem]"
                />
              </div>

              {/* ✅ SHIPPING PAYER */}

              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    shippingPayer <span className="p-span">string</span>
                  </h3>
                  <p className="text-sm">Filter by who pays for shipping.</p>
                </div>
                <div className="">
                  <CustomFormSelect
                    name="shippingPayer"
                    items={mapToSelectItems(Object.values(ShippingPayer))}
                    control={form.control}
                  />
                </div>
              </div>

              {/* ✅ CATEGORIES */}

              <div className="border-b border-sidebar-border pb-2">
                <h3 className="p-title">
                  categories <span className="p-span">array of objects</span>
                </h3>
                <p className="text-sm mb-2">
                  List of categories that product belongs to.
                </p>
                <ArrayOfStringField
                  isCollapsed={false}
                  name="category"
                  label="OBJECT"
                  description="The ID of category."
                  requirement="required"
                  typeName="string"
                  buttonName="ADD OBJECT"
                />
              </div>

              {/* ✅ VARIANTS */}

              <div>
                <h3 className="p-title">
                  variants <span className="p-span">array of objects</span>
                </h3>
                <p className="text-sm mb-2">List of variants of the product.</p>
                <VariantsForm
                  name="variants"
                  label="variant"
                  description="The ID of the selection."
                  typeName="string"
                  buttonNameMain="ADD VARIANT"
                  onUpdate={handleVariantUpdate}
                />
              </div>
              <Separator />

              <div className="border-b border-sidebar-border pb-2">
                <h3 className="p-title">
                  media <span className="p-span">array of strings</span>{" "}
                  <span className="p-span text-red-600">required</span>
                </h3>
                <p className="text-sm mb-2">
                  Details of product media files. There can be a maximum of 5
                  media files.
                </p>

                <OptionsForm name="optionId" label="OBJECT" />
              </div>

              {/* ✅ SINGLE OPTION */}

              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    singleOption <span className="p-span">boolean</span>
                  </h3>
                  <p className="text-sm">
                    Represents whether a single option or multiple options can
                    be selected during checkout.
                  </p>
                </div>
                <div className="">
                  <CustomFormBooleanSelect
                    name="singleOption"
                    items={mapToSelectItems([true, false])}
                    control={form.control}
                  />
                </div>
              </div>

              {/* ✅ CUSTOM LISTING */}

              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    customListing <span className="p-span">boolean</span>
                  </h3>
                  <p className="text-sm">
                    Represents whether the listing is a custom or standard one.
                  </p>
                </div>
                <div className="">
                  <CustomFormBooleanSelect
                    name="customListing"
                    items={mapToSelectItems([true, false])}
                    control={form.control}
                  />
                </div>
              </div>

              {/* ✅ CUSTOM NOTE */}

              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    customNote <span className="p-span">string</span>
                  </h3>
                  <p className="text-sm">
                    Overrides the placeholder for note to seller field. Used for
                    collecting a custom information from the buyer during
                    checkout.
                  </p>
                </div>
                <CustomFormField
                  name="customNote"
                  control={form.control}
                  className="hover:border-sidebar-ring mt-[0.4rem]"
                />
              </div>

              {/* ✅ PLACEMENT SCORE */}

              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    placementScore <span className="p-span">integer ≥ 1 </span>
                  </h3>
                  <p className="text-sm">
                    Placement score of the product. Products with higher values
                    are placed first in the store.
                  </p>
                </div>
                <CustomFormField
                  name="placementScore"
                  control={form.control}
                  className="hover:border-sidebar-ring mt-[0.4rem]"
                />
              </div>

              {/* ✅ DISPATCH DURATION */}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-[0.25rem]">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    dispatchDuration{" "}
                    <span className="p-span">integer 1 to 3 </span>
                  </h3>
                  <p className="text-sm">
                    Dispatch duration in terms of days from seller to shipping
                    company.
                  </p>
                </div>
                <CustomFormField
                  name="dispatchDuration"
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
          </div>

          <div className="md:col-span-2 md:top-4 ">
            <LanguageButtons />
            <LanguageSelector />
            <Credentials onTokenChange={setBearerToken} />

            <GeneratedCodeBlockPost
              selectedLanguage={selectedLanguage}
              formValues={formValues}
              bearerToken={bearerToken}
              mediaValues={[]}
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
        <div className="flex lg:justify-start lg:gap-x-[24rem] mb-8 justify-between">
          <Link href="/listProducts" className="flex items-center gap-x-2">
            <ArrowLeft
              height={20}
              className="text-gray-400 hover:cursor-pointer transform transition hover:-translate-x-1"
            />
            <span className="font-semibold">List all products</span>
          </Link>

          <Link href="/getProduct" className="flex items-center gap-x-2">
            <span className="font-semibold">Get a product</span>
            <ArrowRight
              height={20}
              className="text-gray-400 hover:cursor-pointer transform transition hover:translate-x-1"
            />
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}

export default CreateProductComponent;
