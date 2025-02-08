import React from "react";
import { useLocalStorageForm } from "@/utils/hooks/useLocalStorageForm";
import { PriceCurrency, createAndEditProductSchema } from "@/utils/types";
import { Form, FormMessage } from "@/components/ui/form";
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

function mapToSelectItems<T>(values: T[]): { label: string; value: T }[] {
  return values.map((value) => ({
    label: String(value), // Kullanıcıya gösterilecek metin
    value, // Formda kullanılacak gerçek değer
  }));
}

export function PriceDataComponent() {
  const { form } = useLocalStorageForm("priceData", createAndEditProductSchema);

  return (
    <Form {...form}>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm pb-2">
            PRICE DATA OBJECTS
          </AccordionTrigger>
          <AccordionContent>
            <div className="form-layout">
              <div className="lg:col-span-2 pb-2">
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
              <FormMessage />

              <div className="lg:col-span-2 pb-2">
                <h3 className="p-title">
                  price <span className="p-span">string</span>
                </h3>
                <p className="text-sm">Unit price of the product.</p>
              </div>

              <CustomFormField name="price" control={form.control} />

              <div className="lg:col-span-2 pb-2">
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

              <div className="lg:col-span-2 pb-2">
                <h3 className="p-title">
                  discountedPrice <span className="p-span">string</span>
                </h3>
                <p className="text-sm">Discounted price of the product.</p>
              </div>

              <CustomFormField name="discountedPrice" control={form.control} />

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
  );
}
