"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  Save,
  Package,
} from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  createSellAdSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  type CreateSellAdFormData,
  type Step1FormData,
  type Step2FormData,
  type Step3FormData,
} from "@/lib/validations/sellAd";

interface CreateSellAdModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentLanguage: { direction: "ltr" | "rtl"; code: string };
}

export function CreateSellAdModal({
  open,
  onOpenChange,
  currentLanguage,
}: CreateSellAdModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedData, setSavedData] = useState<Partial<CreateSellAdFormData>>({});

  const form = useForm<CreateSellAdFormData>({
    resolver: zodResolver(createSellAdSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
      category_id: "",
      type: "",
      purchase_volume: 1,
      inventory: 0,
      min_sale_amount: 1,
      is_wholesale: false,
      active: true,
      off: 0,
      ...savedData,
    },
  });

  const translations = {
    fa: {
      createSellAd: "ثبت آگهی فروش",
      step: "مرحله",
      basicInfo: "اطلاعات پایه",
      productDetails: "جزئیات محصول",
      settings: "تنظیمات",
      productName: "نام محصول",
      adTitle: "عنوان آگهی",
      description: "توضیحات",
      category: "دسته‌بندی",
      selectCategory: "انتخاب دسته‌بندی",
      productType: "نوع محصول",
      selectType: "انتخاب نوع",
      purchaseVolume: "حجم خرید",
      inventory: "موجودی",
      minSaleAmount: "حداقل مقدار فروش",
      isWholesale: "فروش عمده",
      isActive: "فعال",
      discount: "درصد تخفیف",
      next: "بعدی",
      previous: "قبلی",
      save: "ذخیره",
      saveAndContinue: "ذخیره و ادامه",
      completeLater: "بعداً تکمیل می‌کنم",
      submit: "ثبت آگهی",
      submitting: "در حال ثبت...",
      close: "بستن",
      electronics: "الکترونیک",
      clothing: "پوشاک",
      home: "خانه و آشپزخانه",
      books: "کتاب",
      sports: "ورزش",
      new: "نو",
      used: "دست دوم",
      refurbished: "بازسازی شده",
    },
    en: {
      createSellAd: "Create Sell Ad",
      step: "Step",
      basicInfo: "Basic Information",
      productDetails: "Product Details",
      settings: "Settings",
      productName: "Product Name",
      adTitle: "Ad Title",
      description: "Description",
      category: "Category",
      selectCategory: "Select Category",
      productType: "Product Type",
      selectType: "Select Type",
      purchaseVolume: "Purchase Volume",
      inventory: "Inventory",
      minSaleAmount: "Minimum Sale Amount",
      isWholesale: "Wholesale",
      isActive: "Active",
      discount: "Discount Percentage",
      next: "Next",
      previous: "Previous",
      save: "Save",
      saveAndContinue: "Save & Continue",
      completeLater: "Complete Later",
      submit: "Submit Ad",
      submitting: "Submitting...",
      close: "Close",
      electronics: "Electronics",
      clothing: "Clothing",
      home: "Home & Kitchen",
      books: "Books",
      sports: "Sports",
      new: "New",
      used: "Used",
      refurbished: "Refurbished",
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

  const productTypes = [
    { id: "new", name: t.new },
    { id: "used", name: t.used },
    { id: "refurbished", name: t.refurbished },
  ];

  const handleNext = async () => {
    let isValid = false;

    if (step === 1) {
      isValid = await form.trigger([
        "name",
        "title",
        "description",
        "category_id",
      ]);
    } else if (step === 2) {
      isValid = await form.trigger([
        "type",
        "purchase_volume",
        "inventory",
        "min_sale_amount",
      ]);
    }

    if (isValid && step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSave = () => {
    const currentData = form.getValues();
    setSavedData(currentData);
    console.log("Data saved:", currentData);
    // Here you would save to localStorage or backend
  };

  const handleCompleteLater = () => {
    handleSave();
    onOpenChange(false);
  };

  const onSubmit = async (data: CreateSellAdFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting sell ad:", data);
      // Here you would submit to your backend
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      onOpenChange(false);
      setStep(1);
      form.reset();
    } catch (error) {
      console.error("Error submitting sell ad:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((stepNumber, index) => (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                stepNumber <= step
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {stepNumber}
            </div>
            {index < 2 && (
              <div
                className={`w-16 h-1 mx-3 rounded-full transition-all ${
                  stepNumber < step ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {t.basicInfo}
        </h3>
        <p className="text-muted-foreground text-sm">
          اطلاعات اصلی محصول و آگهی خود را وارد کنید
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
      </div>

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-sm font-medium text-foreground">
              {t.adTitle}
            </FormLabel>
            <FormControl>
              <Input
                placeholder="عنوان جذاب برای آگهی خود بنویسید"
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
        name="description"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-sm font-medium text-foreground">
              {t.description}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="توضیحات کاملی از محصول خود ارائه دهید..."
                className="min-h-[120px] resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {t.productDetails}
        </h3>
        <p className="text-muted-foreground text-sm">
          جزئیات فنی و مشخصات محصول را تکمیل کنید
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium text-foreground">
                {t.productType}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder={t.selectType} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {productTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
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
          name="inventory"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium text-foreground">
                {t.inventory}
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
          name="purchase_volume"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium text-foreground">
                {t.purchaseVolume}
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
          name="min_sale_amount"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium text-foreground">
                {t.minSaleAmount}
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
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {t.settings}
        </h3>
        <p className="text-muted-foreground text-sm">
          تنظیمات نهایی آگهی خود را انجام دهید
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="off"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium text-foreground">
                {t.discount}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
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
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="is_wholesale"
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
                  {t.isWholesale}
                </FormLabel>
                <p className="text-xs text-muted-foreground">
                  آیا این محصول برای فروش عمده مناسب است؟
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
                  آگهی بلافاصله پس از ثبت فعال شود
                </p>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-background"
        dir={currentLanguage.direction}
      >
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="flex items-center gap-3 text-xl font-bold">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-5 w-5 text-primary" />
            </div>
            {t.createSellAd}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {renderStepIndicator()}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}

              <div className="flex justify-between items-center pt-6 border-t">
                <div className="flex gap-3">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      className="gap-2"
                    >
                      {currentLanguage.direction === "rtl" ? (
                        <ChevronRight className="h-4 w-4" />
                      ) : (
                        <ChevronLeft className="h-4 w-4" />
                      )}
                      {t.previous}
                    </Button>
                  )}
                </div>

                <div className="flex gap-3">
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
                    type="button"
                    variant="secondary"
                    onClick={handleCompleteLater}
                  >
                    {t.completeLater}
                  </Button>

                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="gap-2"
                    >
                      {t.next}
                      {currentLanguage.direction === "rtl" ? (
                        <ChevronLeft className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  ) : (
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
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
