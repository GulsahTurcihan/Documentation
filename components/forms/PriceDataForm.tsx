"use client";

import React, { useEffect, useRef } from "react";
import { PriceCurrency, priceDataSchema } from "@/utils/types";
import { Form } from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CustomFormBooleanSelect,
  CustomFormField,
  CustomFormSelect,
} from "@/components/forms/FormComponents";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

function mapToSelectItems<T>(values: T[]): { label: string; value: T }[] {
  return values.map((value) => ({
    label: String(value), // Kullanıcıya gösterilecek metin
    value, // Formda kullanılacak gerçek değer
  }));
}

type PriceDataProps = {
  onUpdate: (data: any) => void;
  name: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValues: z.infer<typeof priceDataSchema>;
};

export function PriceDataForm({
  name,
  label,
  onUpdate,
  defaultValues,
}: PriceDataProps) {
  const form = useForm<z.infer<typeof priceDataSchema>>({
    resolver: zodResolver(priceDataSchema),
    defaultValues,
    mode: "onChange",
  });

  const isFirstRender = useRef(true);
  useEffect(() => {
    // İlk render'da `onUpdate`'i çalıştırma
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const subscription = form.watch((value) => {
      if (JSON.stringify(value) !== JSON.stringify(defaultValues)) {
        onUpdate(value);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, onUpdate, defaultValues]);

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xs p-2 w-full border mb-4 justify-between bg-white hover:border-sidebar-ring rounded-md">
              {label}
            </AccordionTrigger>
            <AccordionContent className="bg-white p-4 mb-4 border rounded-md shadow-sm">
              <div className="form-layout">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    currency <span className="p-span">string</span>
                  </h3>
                  <p className="text-sm">Currency of the product.</p>
                </div>

                <CustomFormSelect
                  name="currency"
                  items={mapToSelectItems(Object.values(PriceCurrency))}
                  control={form.control}
                />
              </div>

              <div className="form-layout my-2">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    price <span className="p-span">string</span>
                  </h3>
                  <p className="text-sm">Unit price of the product.</p>
                </div>

                <CustomFormField
                  name="price"
                  control={form.control}
                  onChange={(e) => e.target.value}
                />
              </div>

              <div className="form-layout my-2">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    discount <span className="p-span">boolean</span>
                  </h3>
                  <p className="text-sm">
                    Represents whether there is a product-based discount.
                  </p>
                </div>

                <CustomFormBooleanSelect
                  name="discount"
                  control={form.control}
                  items={mapToSelectItems([true, false])}
                />
              </div>
              <div className="form-layout my-2">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    discountedPrice <span className="p-span">string</span>
                  </h3>
                  <p className="text-sm">Discounted price of the product.</p>
                </div>

                <CustomFormField
                  name="discountedPrice"
                  control={form.control}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-[0.25rem] mt-2">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    shippingPrice <span className="p-span">string</span>
                  </h3>
                  <p className="text-sm">Shipping price of the product.</p>
                </div>
                <CustomFormField name="shippingPrice" control={form.control} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Form>
    </FormProvider>
  );
}
