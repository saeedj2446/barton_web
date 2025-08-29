import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "نام محصول باید حداقل ۲ کاراکتر باشد"),
  description: z.string().min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
  price: z.number().min(0, "قیمت نمی‌تواند منفی باشد"),
  originalPrice: z.number().optional(),
  category: z.string().min(1, "دسته‌بندی الزامی است"),
  subcategory: z.string().optional(),
  brand: z.string().optional(),
  sku: z.string().min(1, "کد محصول الزامی است"),
  stock: z.number().min(0, "موجودی نمی‌تواند منفی باشد"),
  minStock: z.number().min(0, "حداقل موجودی نمی‌تواند منفی باشد"),
  status: z.enum(["active", "inactive", "out_of_stock", "draft"]),
  images: z.array(z.string()).min(1, "حداقل یک تصویر الزامی است"),
  weight: z.number().optional(),
  dimensions: z
    .object({
      length: z.number(),
      width: z.number(),
      height: z.number(),
    })
    .optional(),
  tags: z.array(z.string()),
});

export const bulkPriceUpdateSchema = z.object({
  productIds: z.array(z.string()).min(1, "حداقل یک محصول انتخاب کنید"),
  updateType: z.enum(["percentage", "fixed_amount", "set_price"]),
  value: z.number(),
  applyToOriginalPrice: z.boolean().default(false),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type BulkPriceUpdateData = z.infer<typeof bulkPriceUpdateSchema>;
