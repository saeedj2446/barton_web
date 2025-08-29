import { z } from "zod";

export const createSellAdSchema = z.object({
  // Step 1 - Basic Information
  name: z
    .string()
    .min(1, "نام محصول الزامی است")
    .max(100, "نام محصول نباید بیش از 100 کاراکتر باشد")
    .trim(),
  title: z
    .string()
    .min(1, "عنوان آگهی الزامی است")
    .max(150, "عنوان آگهی نباید بیش از 150 کاراکتر باشد")
    .trim(),
  description: z
    .string()
    .min(10, "توضیحات باید حداقل 10 کاراکتر باشد")
    .max(1000, "توضیحات نباید بیش از 1000 کاراکتر باشد")
    .trim(),
  category_id: z.string().min(1, "انتخاب دسته‌بندی الزامی است"),

  // Step 2 - Product Details
  type: z.string().min(1, "نوع محصول الزامی است"),
  purchase_volume: z.number().min(1, "حجم خرید باید حداقل 1 باشد"),
  inventory: z.number().min(0, "موجودی نمی‌تواند منفی باشد"),
  min_sale_amount: z.number().min(1, "حداقل مقدار فروش باید حداقل 1 باشد"),

  // Step 3 - Settings & Options
  is_wholesale: z.boolean().default(false),
  active: z.boolean().default(true),
  off: z
    .number()
    .min(0, "درصد تخفیف نمی‌تواند منفی باشد")
    .max(100, "درصد تخفیف نمی‌تواند بیش از 100 باشد")
    .default(0),
});

export type CreateSellAdFormData = z.infer<typeof createSellAdSchema>;

// Partial schemas for each step
export const step1Schema = createSellAdSchema.pick({
  name: true,
  title: true,
  description: true,
  category_id: true,
});

export const step2Schema = createSellAdSchema.pick({
  type: true,
  purchase_volume: true,
  inventory: true,
  min_sale_amount: true,
});

export const step3Schema = createSellAdSchema.pick({
  is_wholesale: true,
  active: true,
  off: true,
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
