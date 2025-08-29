"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, Percent, Plus, Minus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  bulkPriceUpdateSchema,
  type BulkPriceUpdateData,
} from "@/lib/validations/product";
import type { Product } from "@/lib/types";

interface BulkPriceUpdateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProducts: string[];
  products: Product[];
  currentLanguage: { direction: "ltr" | "rtl"; code: string };
}

export function BulkPriceUpdateModal({
  open,
  onOpenChange,
  selectedProducts,
  products,
  currentLanguage,
}: BulkPriceUpdateModalProps) {
  const form = useForm<BulkPriceUpdateData>({
    resolver: zodResolver(bulkPriceUpdateSchema),
    defaultValues: {
      productIds: selectedProducts,
      updateType: "percentage",
      value: 0,
      applyToOriginalPrice: false,
    },
  });

  const watchUpdateType = form.watch("updateType");
  const watchValue = form.watch("value");
  const watchApplyToOriginal = form.watch("applyToOriginalPrice");

  const onSubmit = (data: BulkPriceUpdateData) => {
    console.log("Bulk price update:", data);
    // Here you would typically update prices in your backend
    onOpenChange(false);
    form.reset();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const calculateNewPrice = (product: Product) => {
    const basePrice =
      watchApplyToOriginal && product.originalPrice
        ? product.originalPrice
        : product.price;

    switch (watchUpdateType) {
      case "percentage":
        return basePrice + (basePrice * watchValue) / 100;
      case "fixed_amount":
        return basePrice + watchValue;
      case "set_price":
        return watchValue;
      default:
        return basePrice;
    }
  };

  const getUpdateTypeIcon = () => {
    switch (watchUpdateType) {
      case "percentage":
        return <Percent className="h-4 w-4" />;
      case "fixed_amount":
        return watchValue >= 0 ? (
          <Plus className="h-4 w-4" />
        ) : (
          <Minus className="h-4 w-4" />
        );
      case "set_price":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        dir={currentLanguage.direction}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-4">
            ویرایش گروهی قیمت‌ها
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center">
            {selectedProducts.length} محصول انتخاب شده
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Update Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                {getUpdateTypeIcon()}
                تنظیمات بروزرسانی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="updateType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع بروزرسانی</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="percentage">درصدی</SelectItem>
                            <SelectItem value="fixed_amount">
                              مبلغ ثابت
                            </SelectItem>
                            <SelectItem value="set_price">
                              تعیین قیمت جدید
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {watchUpdateType === "percentage" && "درصد تغییر"}
                          {watchUpdateType === "fixed_amount" &&
                            "مبلغ تغییر (تومان)"}
                          {watchUpdateType === "set_price" &&
                            "قیمت جدید (تومان)"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchUpdateType !== "set_price" && (
                    <FormField
                      control={form.control}
                      name="applyToOriginalPrice"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal">
                              اعمال بر روی قیمت اصلی (در صورت وجود)
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1">
                      اعمال تغییرات
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onOpenChange(false)}
                    >
                      لغو
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">پیش‌نمایش تغییرات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {products.map((product) => {
                  const newPrice = calculateNewPrice(product);
                  const priceChange = newPrice - product.price;
                  const changePercentage =
                    product.price > 0 ? (priceChange / product.price) * 100 : 0;

                  return (
                    <div
                      key={product.id}
                      className="border rounded-lg p-4 space-y-2"
                    >
                      <div className="font-medium text-sm line-clamp-1">
                        {product.name}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        SKU: {product.sku}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">
                            قیمت فعلی:
                          </div>
                          <div className="font-medium">
                            {formatPrice(product.price)}
                          </div>
                        </div>

                        <div>
                          <div className="text-muted-foreground">
                            قیمت جدید:
                          </div>
                          <div
                            className={`font-medium ${
                              newPrice > product.price
                                ? "text-green-600"
                                : newPrice < product.price
                                  ? "text-red-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {formatPrice(Math.max(0, newPrice))}
                          </div>
                        </div>
                      </div>

                      {priceChange !== 0 && (
                        <div
                          className={`text-xs ${
                            priceChange > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {priceChange > 0 ? "+" : ""}
                          {formatPrice(Math.abs(priceChange))}(
                          {changePercentage > 0 ? "+" : ""}
                          {changePercentage.toFixed(1)}%)
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
