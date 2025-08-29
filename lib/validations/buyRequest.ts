import { z } from "zod";

export const createBuyRequestSchema = z.object({
  product_name: z.string().min(1, "نام محصول الزامی است"),
  category_id: z.string().min(1, "انتخاب دسته‌بندی الزامی است"),
  unit: z.string().min(1, "انتخاب واحد الزامی است"),
  required_volume: z.number().min(1, "حجم مورد نیاز باید حداقل 1 باشد"),
  max_price: z.number().min(0, "حداکثر قیمت نمی‌تواند منفی باشد").optional(),
  description: z.string().min(10, "توضیحات باید حداقل 10 کاراکتر باشد"),
  delivery_location: z.string().min(1, "محل تحویل الزامی است"),
  delivery_date: z.string().optional(),
  urgent: z.boolean().default(false),
  active: z.boolean().default(true),
});

export type CreateBuyRequestFormData = z.infer<typeof createBuyRequestSchema>;
