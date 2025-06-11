"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CustomFormBooleanSelect,
  CustomFormField,
  CustomFormSelect,
} from "@/components/forms/FormComponents";
import { ListHoverCard } from "@/components/cards/ListHoverCard";
import { Separator } from "@/components/ui/separator";
import getIcon from "@/public/icons/getIcon.svg";
import {
  productListSchema,
  ProductListType,
  ProductSort,
  ProductType,
  ShippingPayer,
  StockStatus,
} from "@/utils/types";
import Image from "next/image";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { GeneratedCodeBlockGet } from "./prism/GeneratedCodeBlockGet";

import { useAsideContext } from "@/app/provider";
import { Objects } from "./attributes/objects";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

import response200 from "@/public/icons/response-200.svg";
import LanguageButtons from "./prism/LanguageButtons";
import Credentials from "@/components/prism/Credentials";
import ResponseComponent from "./prism/ResponseComponent";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import ArrayOfStringField from "./forms/ArrayOfStringField";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LanguageSelector from "./prism/LanguageSelector";

function mapToSelectItems<T>(values: T[]): { label: string; value: T }[] {
  return values.map((value) => ({
    label: String(value), // Kullanıcıya gösterilecek metin
    value, // Formda kullanılacak gerçek değer
  }));
}

function ListProductComponent() {
  // 🟢 Kullanıcının seçtiği dili saklayan state
  const {
    selectedLanguage,
    bearerToken,
    setBearerToken,
    apiResponse,
    setApiResponse,
  } = useAsideContext();

  // 🟢 React Hook Form
  const form = useForm<ProductListType>({
    resolver: zodResolver(productListSchema),
    defaultValues: {
      dateStart: "",
      dateEnd: "",
      productType: ProductType.digital,
      shippingPayer: ShippingPayer.sellerPays,
      stockStatus: StockStatus.inStock,
      discount: false,
      customListing: true,
      limit: 10,
      page: 1,
      sort: ProductSort.DateDesc,
      categoryId: [""],
      selectionId: [""],
    },
    mode: "onChange",
  });

  const formValues = useWatch({ control: form.control });

  useEffect(() => {
    const savedResponse = localStorage.getItem("apiResponse");
    if (savedResponse) {
      setApiResponse(JSON.parse(savedResponse));
    }
  }, []);

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

  /* fetch data from API
  
    const fetchData = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const url = new URL("https://dummyjson.com/test");

      // ✅ Append form values to the URL
      Object.entries(formValues).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });

      console.log("API Request URL:", url.toString()); // Debugging

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          Accept: "application/json",
        },
      });

      console.log("Response Status:", response.status); // Debugging

      const data = await response.json();
      console.log("API Response:", data); // Debugging

      if (response.ok) {
        setApiResponse(data); // ✅ Store response in state
        localStorage.setItem("apiResponse", JSON.stringify(data));
      } else {
        setApiResponse({
          status: response.status,
          message: `Error: ${response.statusText}`,
          details: data,
        });
      }
    } catch (error) {
      console.error("API request failed:", error);
      setApiResponse({
        status: 500,
        message: "API request failed.",
        details: (error as Error).message,
      });
    }
  }; */

  /* 🟢 save date in localStorage
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: async (values: ProductListType) => {
      return new Promise<void>(() => {
        try {
          localStorage.setItem("listProduct", JSON.stringify(values));
          return Promise.resolve();
        } catch (error) {
          Promise.reject(error);
        }
      });
    },
    onSuccess: () => {
      toast({ description: `Saved successfully!` });
      queryClient.invalidateQueries({ queryKey: "listProduct" });
    },
    onError: () => {
      toast({ description: `There was an error saving.` });
    },
  });

  const debouncedSaveToLocalStorage = useMemo(
    () => debounce((values: ProductListType) => mutate(values), 300),
    [mutate]
  );

  useEffect(() => {
    const subscription = watch((values) => {
      debouncedSaveToLocalStorage(values);
    });
    return () => subscription.unsubscribe();
  }, [debouncedSaveToLocalStorage, form]);*/

  return (
    <FormProvider {...form}>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-4 flex-grow mb-8">
          <div className="md:col-span-3 lg:mr-16">
            <div className="flex items-center gap-x-2">
              <h1 className="text-3xl font-semibold">List all products</h1>
              <ListHoverCard />
            </div>
            <div className="flex items-center gap-x-2">
              <Image src={getIcon} alt="get" width={48} height={48} />
              <span className="p-span">
                https://api.shopier.com/v1/products
              </span>
            </div>
            <p className="text-sm mt-2">
              Returns a list of products with the provided limit, paging,
              sorting and filters. By default, products are returned in sorted
              order, with the most recent product listings appearing first.
            </p>
            <Separator className="my-4 border-sidebar-border" />
            <h3 className="text-sm capitalize font-semibold mb-2">
              QUERY PARAMS
            </h3>

            {/* ✅ Form Fields */}
            <div className="flex flex-col gap-2 border border-sidebar-border p-4 rounded-md bg-sidebar">
              {/* ✅ DATE START */}

              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    dateStart <span className="p-span">string</span>
                  </h3>
                  <p className="text-sm">
                    Show products listed at or after datetime.
                    yyyy-MM-ddTHH:mm:ssZ format is used (e.g.,
                    2022-07-21T13:24:51+0300)
                  </p>
                </div>
                <CustomFormField
                  name="dateStart"
                  control={form.control}
                  className="hover:border-sidebar-ring mt-[0.4rem]"
                />
              </div>

              {/* ✅ DATE END */}

              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    dateEnd <span className="p-span">string</span>
                  </h3>
                  <p className="text-sm">
                    Show products listed at or before datetime.
                    yyyy-MM-ddTHH:mm:ssZ format is used (e.g.,
                    2022-07-25T13:24:51+0300)
                  </p>
                </div>
                <CustomFormField
                  name="dateEnd"
                  control={form.control}
                  className="hover:border-sidebar-ring mt-2"
                />
              </div>

              {/* ✅ PRODUCT TYPE */}

              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    productType <span className="p-span">string</span>
                  </h3>
                  <p className="text-sm">Filter by a product type.</p>
                </div>
                <div className="">
                  <CustomFormSelect
                    name="productType"
                    items={mapToSelectItems(Object.values(ProductType))}
                    control={form.control}
                  />
                </div>
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

              {/* ✅ STOCK STATUS */}

              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    stockStatus{" "}
                    <span className="p-span">string of strings</span>
                  </h3>
                  <p className="text-sm">Filter by a stock status.</p>
                </div>
                <div className="">
                  <CustomFormSelect
                    name="stockStatus"
                    items={mapToSelectItems(Object.values(StockStatus))}
                    control={form.control}
                  />
                </div>
              </div>

              {/* ✅ CATEGORY ID */}

              <div className="border-b border-sidebar-border pb-2">
                <div className="">
                  <h3 className="p-title">
                    categoryId <span className="p-span">array of strings</span>
                  </h3>
                  <p className="text-sm mb-2">
                    Filter by product categories by specifying category ID(s).
                  </p>
                </div>
                <ArrayOfStringField
                  isCollapsed={false}
                  name="categoryId"
                  label="Category ID"
                  buttonName="ADD CATEGORY"
                />
              </div>

              {/* ✅ SELECTION ID */}

              <div className="border-b border-sidebar-border pb-2">
                <div className="">
                  <h3 className="p-title">
                    selectionId <span className="p-span">array of strings</span>
                  </h3>
                  <p className="text-sm mb-2">
                    Filter by product selections by specifying selection ID(s)..
                  </p>
                </div>

                <ArrayOfStringField
                  isCollapsed={false}
                  name="selectionId"
                  label="Selection ID"
                  buttonName="ADD SELECTION"
                />
              </div>

              {/* ✅ DISCOUNT */}

              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    discount <span className="p-span">boolean</span>
                  </h3>
                  <p className="text-sm">Filter by products with discounts.</p>
                </div>
                <div className="">
                  <CustomFormBooleanSelect
                    name="discount"
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
                  <p className="text-sm">Filter by customized listings.</p>
                </div>
                <div className="">
                  <CustomFormBooleanSelect
                    name="customListing"
                    items={mapToSelectItems([true, false])}
                    control={form.control}
                  />
                </div>
              </div>

              {/* ✅ LIMIT */}

              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    limit{" "}
                    <span className="p-span">
                      integer 1 to 50 Defaults to 10
                    </span>
                  </h3>
                  <p className="text-sm">
                    The maximum number of items to be returned in result set.
                  </p>
                </div>
                <CustomFormField
                  name="limit"
                  control={form.control}
                  className="hover:border-sidebar-ring mt-[0.4rem]"
                />
              </div>

              {/* ✅ PAGE */}

              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    page{" "}
                    <span className="p-span">integer ≥ 1 Defaults to 1</span>
                  </h3>
                  <p className="text-sm">Current page of the collection.</p>
                </div>
                <CustomFormField
                  name="page"
                  control={form.control}
                  className="hover:border-sidebar-ring mt-[0.4rem]"
                />
              </div>

              {/* ✅ SORT */}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-[0.25rem]">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    sort{" "}
                    <span className="p-span">string Defaults to dateDesc</span>
                  </h3>
                  <p className="text-sm">Sort results by date.</p>
                </div>
                <CustomFormSelect
                  name="sort"
                  items={mapToSelectItems(Object.values(ProductSort))}
                  control={form.control}
                />
              </div>
            </div>

            <Separator className="mb-4 mt-8" />

            {/* ✅ Response */}

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

          {/* ✅ Prism Code Block */}

          <div className="md:col-span-2 md:top-4 ">
            <LanguageButtons />
            <LanguageSelector />

            <Credentials onTokenChange={setBearerToken} />

            <GeneratedCodeBlockGet
              selectedLanguage={selectedLanguage}
              formValues={formValues}
              bearerToken={bearerToken}
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
        <div className="flex lg:justify-start lg:gap-[21rem] mb-8 justify-between">
          <Link href="/productModel" className="flex items-center gap-x-2">
            <ArrowLeft
              height={20}
              className="text-gray-400 hover:cursor-pointer transform transition hover:-translate-x-1"
            />
            <span className="font-semibold">The Product Model</span>
          </Link>

          <Link href="/createProduct" className="flex items-center gap-x-2">
            <span className="font-semibold">Create a product</span>
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
export default ListProductComponent;
