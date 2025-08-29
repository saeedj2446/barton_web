"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCart, Loader2, X, Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  createBuyRequestSchema,
  type CreateBuyRequestFormData,
} from "@/lib/validations/buyRequest";

interface CreateBuyRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentLanguage: { direction: "ltr" | "rtl"; code: string };
}

export function CreateBuyRequestModal({
  open,
  onOpenChange,
  currentLanguage,
}: CreateBuyRequestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateBuyRequestFormData>({
    resolver: zodResolver(createBuyRequestSchema),
    defaultValues: {
      product_name: "",
      category_id: "",
      unit: "",
      required_volume: 1,
      max_price: 0,
      description: "",
      delivery_location: "",
      delivery_date: "",
      urgent: false,
      active: true,
    },
  });

  const translations = {
    fa: {
      createBuyRequest: "ثبت درخواست خرید",
      productName: "نام محصول",
      category: "دسته‌بندی",
      selectCategory: "انتخاب دسته‌بندی",
      unit: "واحد",
      selectUnit: "انتخاب واحد",
      requiredVolume: "حجم مورد نیاز",
      maxPrice: "حداکثر قیمت (اختیاری)",
      description: "توضیحات درخواست",
      deliveryLocation: "محل تحویل",
      deliveryDate: "تاریخ تحویل (اختیاری)",
      urgent: "فوری",
      isActive: "فعال",
      save: "ذخیره",
      submit: "ثبت درخواست",
      submitting: "در حال ثبت...",
      close: "بستن",
      electronics: "الکترونیک",
      clothing: "پوشاک",
      home: "خانه و آشپزخانه",
      books: "کتاب",
      sports: "ورزش",
      kg: "کیلوگرم",
      piece: "عدد",
      meter: "متر",
      liter: "لیتر",
      box: "جعبه",
      ton: "تن",
    },
    en: {
      createBuyRequest: "Create Buy Request",
      productName: "Product Name",
      category: "Category",
      selectCategory: "Select Category",
      unit: "Unit",
      selectUnit: "Select Unit",
      requiredVolume: "Required Volume",
      maxPrice: "Max Price (Optional)",
      description: "Request Description",
      deliveryLocation: "Delivery Location",
      deliveryDate: "Delivery Date (Optional)",
      urgent: "Urgent",
      isActive: "Active",
      save: "Save",
      submit: "Submit Request",
      submitting: "Submitting...",
      close: "Close",
      electronics: "Electronics",
      clothing: "Clothing",
      home: "Home & Kitchen",
      books: "Books",
      sports: "Sports",
      kg: "Kilogram",
      piece: "Piece",
      meter: "Meter",
      liter: "Liter",
      box: "Box",
      ton: "Ton",
    },
  };

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.en;

  const categories = [
    { id: "1", name: t.electronics },
    { id: "2", name: t.clothing },
    { id: "3", name: t.home },
    { id: "4", name: t.books },
    { id: "5", name: t.sports },
  ];

  const units = [
    { id: "kg", name: t.kg },
    { id: "piece", name: t.piece },
    { id: "meter", name: t.meter },
    { id: "liter", name: t.liter },
    { id: "box", name: t.box },
    { id: "ton", name: t.ton },
  ];

  const onSubmit = async (data: CreateBuyRequestFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting buy request:", data);
      // Here you would submit to your backend
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting buy request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = () => {
    const currentData = form.getValues();
    console.log("Data saved:", currentData);
    // Here you would save to localStorage or backend
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-background"
        dir={currentLanguage.direction}
      >
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="flex items-center gap-3 text-xl font-bold">
            <div className="p-2 bg-green-100 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-green-600" />
            </div>
            {t.createBuyRequest}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="product_name"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-medium text-foreground">
                        {t.productName}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="مثال: گوشی موبایل سامسونگ"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-medium text-foreground">
                        {t.category}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder={t.selectCategory} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-medium text-foreground">
                        {t.unit}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder={t.selectUnit} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {units.map((unit) => (
                            <SelectItem key={unit.id} value={unit.id}>
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="required_volume"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-medium text-foreground">
                        {t.requiredVolume}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
                          className="h-11"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 1)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="max_price"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-medium text-foreground">
                        {t.maxPrice}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          className="h-11"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="delivery_location"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-medium text-foreground">
                        {t.deliveryLocation}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="تهران، میدان آزادی"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="delivery_date"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-medium text-foreground">
                      {t.deliveryDate}
                    </FormLabel>
                    <FormControl>
                      <Input type="date" className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-medium text-foreground">
                      {t.description}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="توضیحات کاملی از درخواست خود ارائه دهید..."
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="urgent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">
                          {t.urgent}
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          آیا این درخواست فوری است؟
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">
                          {t.isActive}
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          درخواست بلافاصله پس از ثبت فعال شود
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between items-center pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSave}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  {t.save}
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="gap-2 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t.submitting}
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      {t.submit}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
