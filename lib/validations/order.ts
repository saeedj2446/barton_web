import { z } from "zod";

export const orderStatusUpdateSchema = z.object({
  status: z.enum([
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "returned",
  ]),
  notes: z.string().optional(),
  trackingNumber: z.string().optional(),
  estimatedDelivery: z.string().optional(),
});

export const orderFilterSchema = z.object({
  status: z.enum([
    "all",
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "returned",
  ]),
  paymentStatus: z.enum(["all", "pending", "paid", "failed", "refunded"]),
  dateRange: z.object({
    from: z.string(),
    to: z.string(),
  }),
  searchQuery: z.string(),
});

export type OrderStatusUpdateData = z.infer<typeof orderStatusUpdateSchema>;
export type OrderFilterData = z.infer<typeof orderFilterSchema>;
