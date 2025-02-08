"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CustomFormBooleanSelect,
  CustomFormField,
  CustomFormSelect,
} from "@/components/forms/FormComponents";
import { ListHoverCard } from "@/components/cards/ListHoverCard";
import { Form } from "@/components/ui/form";

import { Separator } from "@/components/ui/separator";
import getIcon from "@/public/getIcon.svg";
import {
  productListSchema,
  ProductListType,
  ProductSort,
  ProductType,
  ShippingPayer,
  StockStatus,
} from "@/utils/types";
import Image from "next/image";
import { CategoryId } from "./forms/CategoryId";
import SelectionId from "./forms/SelectionId";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "@/utils/localStorageUtils";
import CodeBlock from "./prism/PrismLoader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LanguageSelector from "./prism/LanguageSelector";
import GeneratedCodeBlock from "./prism/GeneratedCodeBlock";

export function mapToSelectItems<T>(
  values: T[]
): { label: string; value: T }[] {
  return values.map((value) => ({
    label: String(value), // Kullanıcıya gösterilecek metin
    value, // Formda kullanılacak gerçek değer
  }));
}

function ListProductComponent() {
  // 🟢 Kullanıcının seçtiği dili saklayan state
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

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
    },
    mode: "onChange",
  });

  const {
    watch,
    formState: { errors },
  } = form;
  const formValues = watch();

  // 🟢 LocalStorage'a form verilerini kaydet
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (values: any) => {
      return new Promise<void>((resolve, reject) => {
        try {
          localStorage.setItem("listProduct", JSON.stringify(values));
          resolve();
        } catch (error) {
          reject(error);
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
    () => debounce((values: any) => mutate(values), 300),
    [mutate]
  );

  useEffect(() => {
    debouncedSaveToLocalStorage(formValues);
  }, [formValues, debouncedSaveToLocalStorage]);

  return (
    <Form {...form}>
      <form>
        <div className="flex items-center gap-x-2">
          <h1 className="text-3xl font-semibold">List all products</h1>
          <ListHoverCard />
        </div>
        <div className="flex items-center gap-x-2">
          <Image src={getIcon} alt="get" width={48} height={48} />
          <span className="p-span">https://api.shopier.com/v1/products</span>
        </div>

        <p>
          Returns a list of products with the provided limit, paging, sorting
          and filters. By default, products are returned in sorted order, with
          the most recent product listings appearing first.
        </p>
        <Separator className="my-4 border-sidebar-border" />
        <h3 className="text-sm capitalize font-semibold mb-2">METADATA</h3>

        <div className="flex flex-col gap-2 border border-sidebar-border p-4 rounded-md">
          <div className="form-layout">
            <div className="lg:col-span-2">
              <h3 className="p-title">
                dateStart <span className="p-span">string</span>
              </h3>
              <p className="text-sm">
                Show products listed at or after datetime. yyyy-MM-ddTHH:mm:ssZ
                format is used (e.g., 2022-07-21T13:24:51+0300)
              </p>
            </div>
            <CustomFormField
              name="dateStart"
              control={form.control}
              className="hover:border-sidebar-ring mt-[0.4rem]"
            />
          </div>

          <div className="form-layout">
            <div className="lg:col-span-2">
              <h3 className="p-title">
                dateEnd <span className="p-span">string</span>
              </h3>
              <p className="text-sm">
                Show products listed at or before datetime. yyyy-MM-ddTHH:mm:ssZ
                format is used (e.g., 2022-07-25T13:24:51+0300)
              </p>
            </div>
            <CustomFormField
              name="dateEnd"
              control={form.control}
              className="hover:border-sidebar-ring mt-2"
            />
          </div>

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

          <div className="form-layout">
            <div className="lg:col-span-2">
              <h3 className="p-title">
                stockStatus <span className="p-span">string of strings</span>
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

          <div className="border-b border-sidebar-border pb-2">
            <div className="">
              <h3 className="p-title">
                categoryId <span className="p-span">array of strings</span>
              </h3>
              <p className="text-sm mb-2">
                Filter by product categories by specifying category ID(s).
              </p>
            </div>
            <CategoryId />
          </div>

          <div className="border-b border-sidebar-border pb-2">
            <div className="">
              <h3 className="p-title">
                selectionId <span className="p-span">array of strings</span>
              </h3>
              <p className="text-sm mb-2">
                Filter by product selections by specifying selection ID(s)..
              </p>
            </div>
            <SelectionId />
          </div>

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

          <div className="form-layout">
            <div className="lg:col-span-2">
              <h3 className="p-title">
                limit{" "}
                <span className="p-span">integer 1 to 50 Defaults to 10</span>
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

          <div className="form-layout">
            <div className="lg:col-span-2">
              <h3 className="p-title">
                page <span className="p-span">integer ≥ 1 Defaults to 1</span>
              </h3>
              <p className="text-sm">Current page of the collection.</p>
            </div>
            <CustomFormField
              name="page"
              control={form.control}
              className="hover:border-sidebar-ring mt-[0.4rem]"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[0.25rem]">
            <div className="lg:col-span-2">
              <h3 className="p-title">
                sort <span className="p-span">string Defaults to dateDesc</span>
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
      </form>

      {/* 🟢 Dil Seçimi */}
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />

      <GeneratedCodeBlock
        selectedLanguage={selectedLanguage}
        formValues={formValues}
      />
    </Form>
  );
}
export default ListProductComponent;
