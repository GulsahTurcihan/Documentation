import * as z from "zod";

// Enums
export enum PriceCurrency {
  usd = "USD",
  euro = "EUR",
  TL = "TRY",
}

export enum StockStatus {
  inStock = "inStock",
  outOfStock = "outOfStock",
}

export enum ProductType {
  physical = "physical",
  digital = "digital",
}

export enum ShippingPayer {
  sellerPays = "sellerPays",
  buyerPays = "buyerPays",
}

export enum ProductSort {
  DateDesc = "dateDesc",
  DateAsc = "dateAsc",
  PriceAsc = "priceAsc",
  PriceDesc = "priceDesc",
}

// Interfaces
export interface PriceData {
  price: string;
  currency: PriceCurrency;
  discount: boolean;
  discountedPrice?: string;
  shippingPrice?: string;
}

export interface MediaType {
  url: string;
  mediaType: "image";
  id: string;
  placement: number;
}

interface Variation {
  id: string;
  title: string;
}

interface Selection {
  id: string;
  title: string;
}

export interface Variant {
  variations: Variation[];
  selections: Selection[];
  stockStatus: StockStatus;
  stockQuantity: number;
}

export interface Option {
  id: string;
  title: string;
  price: string;
}

export interface Product {
  id: string;
  title: string;
  priceData: PriceData[];
  type: ProductType;
  media: MediaType[];
  shippingPayer: ShippingPayer;

  description?: string;
  dateCreated?: string;
  dateUpdated?: string;
  url?: string;
  placement?: number;
  stockStatus?: StockStatus;
  stockQuantity?: number;
  tags?: string[];
  category?: string;
  variants?: Variant[];
  options?: Option[];
  singleOption?: boolean;
  customListing?: boolean;
  customNote?: string;
  placementScore?: number;
  dispatchDuration?: number;
}

// Types
export type CreateProductInput = Omit<
  Product,
  "id" | "dateCreated" | "dateUpdated"
>;
export type UpdateProductInput = Partial<CreateProductInput>;

export interface ProductListParams {
  dateStart?: string;
  dateEnd?: string;
  productType?: ProductType;
  shippingPayer?: ShippingPayer;
  stockStatus?: StockStatus;
  categoryId?: string[];
  selectionId?: string[];
  discount?: boolean;
  customListing?: boolean;
  limit?: number;
  page?: number;
  sort?: ProductSort;
  priceData: PriceData;
}

// Schemas
export const priceDataSchema = z.object({
  price: z.string().nonempty("Price data cannot be empty"),
  currency: z.nativeEnum(PriceCurrency),
  discount: z.union([z.literal(true), z.literal(false), z.null()]),
  discountedPrice: z.string().optional(),
  shippingPrice: z.string().optional(),
  dynamicKeys: z.record(z.string(), z.any()).optional(),
});

export type PriceDataType = z.infer<typeof priceDataSchema>;

const imageUrlRegex = /\.(jpeg|jpg|gif|png|bmp|svg|webp)$/i;

export const mediaSchema = z.object({
  url: z.string().url().regex(imageUrlRegex, "URL must point to an image file"),
  mediaType: z.literal("image"),
  id: z.string().min(2, { message: "id must be at least 2 characters" }),
  placement: z.number().int(),
});

export type MediaSchemaType = z.infer<typeof mediaSchema>;

export const productListSchema = z.object({
  dateStart: z.coerce
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}([+-]\d{2}:\d{2}|Z)?$/, {
      message: "Invalid date format. Use YYYY-MM-DDTHH:mm:ssZ",
    })
    .optional(),

  dateEnd: z.coerce
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}([+-]\d{2}:\d{2}|Z)?$/, {
      message: "Invalid date format. Use YYYY-MM-DDTHH:mm:ssZ",
    })
    .optional(),
  productType: z.nativeEnum(ProductType).optional(),
  shippingPayer: z.nativeEnum(ShippingPayer).optional(),
  stockStatus: z.nativeEnum(StockStatus).optional(),
  categoryId: z.string().array().optional(),
  selectionId: z.string().array().optional(),
  discount: z.union([z.literal(true), z.literal(false), z.null()]),
  customListing: z.boolean().optional(),
  limit: z.coerce
    .number()
    .min(1, { message: "Limit must be at least 1" })
    .max(50, { message: "Limit must be at most 50" }), // 🟢 `lte(50)` yerine `.max(50)` kullanıldı

  page: z.coerce
    .number()
    .min(1, { message: "Page number must be at least 1" }) // 🟢 `gte(1)` yerine `.min(1)`
    .default(1), // Varsayılan olarak 1

  sort: z.nativeEnum(ProductSort),
  dynamicKeys: z.record(z.string(), z.array(z.string()).optional()).optional(),
});

export type ProductListType = z.infer<typeof productListSchema>;

export const createAndEditProductSchema = z.object({
  id: z.string().min(2, {
    message: "id must be at least 2 characters",
  }),
  title: z.string().min(2, {
    message: "title must be at least 2 characters",
  }),
  description: z
    .string()
    .min(10, {
      message: "description must be at least 10 character",
    })
    .optional(),
  tags: z.string().optional(),
  category: z.string().optional(),
  customNote: z.string().optional(),

  singleOption: z.boolean().nullable(),
  customListing: z.boolean().nullable(),

  dateCreated: z.string().datetime({ local: true }).optional(),
  dateUpdated: z.string().datetime({ local: true }).optional(),
  url: z.string().url().optional(),

  placement: z.number().min(1).optional(),
  stockQuantity: z.number().optional(),
  placementScore: z.number().optional(),
  dispatchDuration: z.number().min(1).max(3).optional(),

  type: z.nativeEnum(ProductType),
  shippingPayer: z.nativeEnum(ShippingPayer),
  stockStatus: z.nativeEnum(StockStatus),
  sort: z.nativeEnum(ProductSort),

  priceData: priceDataSchema,
});

export type CreateAndEditProductType = z.infer<
  typeof createAndEditProductSchema
>;

// Utility Functions
export function validateWithZodSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
}

export type FormKeys =
  | keyof ProductListType
  | `dynamicKeys.${string}`
  | PriceDataType;
