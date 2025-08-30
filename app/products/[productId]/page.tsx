"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Star,
  MapPin,
  Truck,
  CreditCard,
  Phone,
  MessageCircle,
  Shield,
  Clock,
  Package,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

interface ProductDetailsPageProps {
  params: {
    productId: string;
  };
}

interface Seller {
  id: string;
  name: string;
  type: string;
  rating: number;
  reviewCount: number;
  location: string;
  verified: boolean;
  responseTime: string;
  memberSince: string;
  totalSales: number;
  avatar: string;
  description: string;
  specialties: string[];
}

interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory: string;
  brand: string;
  sku: string;
  minOrder: number;
  stock: number;
  weight: string;
  dimensions: string;
  warranty: string;
  features: string[];
  specifications: { [key: string]: string };
  seller: Seller;
  discount?: number;
  tags: string[];
  shippingOptions: {
    fast: { available: boolean; cost: number; time: string };
    standard: { available: boolean; cost: number; time: string };
  };
  paymentOptions: {
    cash: boolean;
    check: boolean;
    bankTransfer: boolean;
    installment: boolean;
  };
}

// Mock product data
const mockProduct: ProductDetails = {
  id: "1",
  name: "گوشی موبایل سامسونگ Galaxy A54 5G - ظرفیت 256 گیگابایت",
  description:
    "گوشی هوشمند سامسونگ Galaxy A54 5G با نمایشگر Super AMOLED 6.4 اینچی، دوربین اصلی 50 مگاپیکسل و باتری 5000 میلی‌آمپر ساعت. این محصول دارای پردازنده Exynos 1380 و حافظه رم 8 گیگابایت می‌باشد.",
  price: 8500000,
  originalPrice: 9200000,
  images: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80",
    "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&q=80",
  ],
  category: "الکترونیک",
  subcategory: "موبایل",
  brand: "سامسونگ",
  sku: "SAM-A54-256-BLK",
  minOrder: 10,
  stock: 150,
  weight: "202 گرم",
  dimensions: "158.2 × 76.7 × 8.2 میلی‌متر",
  warranty: "18 ماه گارانتی رسمی",
  features: [
    "نمایشگر Super AMOLED 6.4 اینچ",
    "دوربین اصلی 50 مگاپیکسل",
    "باتری 5000 میلی‌آمپر ساعت",
    "پردازنده Exynos 1380",
    "حافظه رم 8 گیگابایت",
    "پشتیبانی از 5G",
    "مقاوم در برابر آب IP67",
    "شارژ سریع 25 وات",
  ],
  specifications: {
    "سیستم عامل": "Android 13",
    پردازنده: "Exynos 1380 (5nm)",
    "حافظه داخلی": "256 گیگابایت",
    "حافظه رم": "8 گیگابایت",
    نمایشگر: "6.4 اینچ Super AMOLED",
    رزولوشن: "2340 × 1080 پیکسل",
    "دوربین اصلی": "50 + 12 + 5 مگاپیکسل",
    "دوربین جلو": "32 مگاپیکسل",
    باتری: "5000 میلی‌آمپر ساعت",
    شارژ: "25 وات سیمی",
    اتصالات: "5G, 4G, Wi-Fi 6, Bluetooth 5.3",
    سنسورها: "اثر انگشت، تشخیص چهره، شتاب‌سنج",
  },
  seller: {
    id: "seller-1",
    name: "فروشگاه کسری",
    type: "عمده‌فروش",
    rating: 4.8,
    reviewCount: 1247,
    location: "تهران، میدان ولیعصر",
    verified: true,
    responseTime: "کمتر از 1 ساعت",
    memberSince: "1401",
    totalSales: 15420,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kasra",
    description:
      "فروشگاه کسری با بیش از 10 سال تجربه در زمینه فروش محصولات الکترونیک، یکی از معتبرترین عمده‌فروشان کشور محسوب می‌شود. ما متعهد به ارائه محصولات اصل و با کیفیت به قیمت مناسب هستیم.",
    specialties: ["گوشی موبایل", "لپ‌تاپ", "تبلت", "لوازم جانبی"],
  },
  discount: 8,
  tags: ["پرفروش", "گارانتی رسمی", "ارسال سریع", "کیفیت بالا"],
  shippingOptions: {
    fast: { available: true, cost: 0, time: "24 ساعت" },
    standard: { available: true, cost: 50000, time: "2-3 روز" },
  },
  paymentOptions: {
    cash: true,
    check: true,
    bankTransfer: true,
    installment: false,
  },
};

export default function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(mockProduct.minOrder);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % mockProduct.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? mockProduct.images.length - 1 : prev - 1,
    );
  };

  const totalPrice = mockProduct.price * quantity;
  const savings = mockProduct.originalPrice
    ? (mockProduct.originalPrice - mockProduct.price) * quantity
    : 0;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              خانه
            </Link>
            <ArrowRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-primary">
              محصولات
            </Link>
            <ArrowRight className="w-4 h-4" />
            <Link
              href={`/products?category=${mockProduct.category}`}
              className="hover:text-primary"
            >
              {mockProduct.category}
            </Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-primary font-medium">
              {mockProduct.subcategory}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={mockProduct.images[selectedImageIndex]}
                alt={mockProduct.name}
                className="w-full h-96 object-cover"
              />
              {mockProduct.discount && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-white text-lg px-3 py-1">
                  {mockProduct.discount}% تخفیف
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 left-4 bg-white/80 hover:bg-white"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-16 left-4 bg-white/80 hover:bg-white"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </Button>
              {mockProduct.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </>
              )}
            </div>
            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${mockProduct.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{mockProduct.brand}</Badge>
                <Badge variant="outline">کد: {mockProduct.sku}</Badge>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {mockProduct.name}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {mockProduct.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-primary">
                    {mockProduct.price.toLocaleString()} تومان
                  </div>
                  {mockProduct.originalPrice && (
                    <div className="text-lg text-gray-500 line-through">
                      {mockProduct.originalPrice.toLocaleString()} تومان
                    </div>
                  )}
                </div>
                {savings > 0 && (
                  <div className="text-right">
                    <div className="text-sm text-gray-600">صرفه‌جویی شما:</div>
                    <div className="text-lg font-bold text-green-600">
                      {savings.toLocaleString()} تومان
                    </div>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600">
                حداقل سفارش: {mockProduct.minOrder} عدد | موجودی:{" "}
                {mockProduct.stock} عدد
              </div>
            </div>

            {/* Quantity and Order */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  تعداد سفارش
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setQuantity(Math.max(mockProduct.minOrder, quantity - 1))
                    }
                    disabled={quantity <= mockProduct.minOrder}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(
                          mockProduct.minOrder,
                          parseInt(e.target.value) || mockProduct.minOrder,
                        ),
                      )
                    }
                    className="w-24 text-center"
                    min={mockProduct.minOrder}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                  <span className="text-sm text-gray-600">عدد</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  مجموع: {totalPrice.toLocaleString()} تومان
                </div>
              </div>

              <div className="flex gap-3">
                <Button size="lg" className="flex-1">
                  <Package className="w-5 h-5 ml-2" />
                  ثبت سفارش
                </Button>
                <Dialog
                  open={isContactModalOpen}
                  onOpenChange={setIsContactModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="lg">
                      <Phone className="w-5 h-5 ml-2" />
                      تماس با فروشنده
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md" dir="rtl">
                    <DialogHeader>
                      <DialogTitle>تماس با فروشنده</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={mockProduct.seller.avatar}
                          alt={mockProduct.seller.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <div className="font-medium">
                            {mockProduct.seller.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {mockProduct.seller.type}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Input placeholder="نام شما" />
                        <Input placeholder="شماره تماس" />
                        <Textarea
                          placeholder="پیام شما..."
                          rows={4}
                          defaultValue={`سلام، در مورد محصول ${mockProduct.name} سوال داشتم.`}
                        />
                      </div>
                      <Button className="w-full">
                        <MessageCircle className="w-4 h-4 ml-2" />
                        ارسال پیام
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-3">
              {mockProduct.shippingOptions.fast.available && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Truck className="w-4 h-4" />
                  <span>
                    ارسال سریع ({mockProduct.shippingOptions.fast.time})
                  </span>
                </div>
              )}
              {mockProduct.paymentOptions.check && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <CreditCard className="w-4 h-4" />
                  <span>پذیرش چک</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-purple-600">
                <Shield className="w-4 h-4" />
                <span>{mockProduct.warranty}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-orange-600">
                <Award className="w-4 h-4" />
                <span>کیفیت تضمینی</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seller Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              اطلاعات فروشنده
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <img
                  src={mockProduct.seller.avatar}
                  alt={mockProduct.seller.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">
                      {mockProduct.seller.name}
                    </h3>
                    {mockProduct.seller.verified && (
                      <Badge className="bg-green-500 text-white text-xs">
                        <Check className="w-3 h-3 ml-1" />
                        تایید شده
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {mockProduct.seller.type}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">
                        {mockProduct.seller.rating}
                      </span>
                      <span className="text-gray-500">
                        ({mockProduct.seller.reviewCount} نظر)
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{mockProduct.seller.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">زمان پاسخ</div>
                    <div className="font-medium">
                      {mockProduct.seller.responseTime}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">عضو از</div>
                    <div className="font-medium">
                      {mockProduct.seller.memberSince}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">کل فروش</div>
                    <div className="font-medium">
                      {mockProduct.seller.totalSales.toLocaleString()} محصول
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">تخصص</div>
                    <div className="font-medium">
                      {mockProduct.seller.specialties[0]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <p className="text-sm text-gray-700">
              {mockProduct.seller.description}
            </p>
          </CardContent>
        </Card>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">توضیحات</TabsTrigger>
            <TabsTrigger value="specifications">مشخصات فنی</TabsTrigger>
            <TabsTrigger value="shipping">ارسال و پرداخت</TabsTrigger>
            <TabsTrigger value="reviews">نظرات</TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <Card>
              <CardHeader>
                <CardTitle>توضیحات محصول</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {mockProduct.description}
                </p>
                <div>
                  <h4 className="font-semibold mb-3">ویژگی‌های کلیدی:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {mockProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications">
            <Card>
              <CardHeader>
                <CardTitle>مشخصات فنی</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(mockProduct.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-2 border-b border-gray-100"
                      >
                        <span className="text-gray-600">{key}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-gray-600">وزن</div>
                    <div className="font-medium">{mockProduct.weight}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-gray-600">ابعاد</div>
                    <div className="font-medium">{mockProduct.dimensions}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-gray-600">گارانتی</div>
                    <div className="font-medium">{mockProduct.warranty}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    گزینه‌های ارسال
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockProduct.shippingOptions.fast.available && (
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">ارسال سریع</div>
                        <div className="text-sm text-gray-600">
                          {mockProduct.shippingOptions.fast.time}
                        </div>
                      </div>
                      <div className="text-left">
                        {mockProduct.shippingOptions.fast.cost === 0 ? (
                          <Badge className="bg-green-500">رایگان</Badge>
                        ) : (
                          <span className="font-medium">
                            {mockProduct.shippingOptions.fast.cost.toLocaleString()}{" "}
                            تومان
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {mockProduct.shippingOptions.standard.available && (
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">ارسال عادی</div>
                        <div className="text-sm text-gray-600">
                          {mockProduct.shippingOptions.standard.time}
                        </div>
                      </div>
                      <div className="text-left">
                        <span className="font-medium">
                          {mockProduct.shippingOptions.standard.cost.toLocaleString()}{" "}
                          تومان
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    روش‌های پرداخت
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className={`flex items-center gap-2 p-3 rounded-lg border ${
                        mockProduct.paymentOptions.cash
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      {mockProduct.paymentOptions.cash ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm">نقدی</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 p-3 rounded-lg border ${
                        mockProduct.paymentOptions.check
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      {mockProduct.paymentOptions.check ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm">چک</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 p-3 rounded-lg border ${
                        mockProduct.paymentOptions.bankTransfer
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      {mockProduct.paymentOptions.bankTransfer ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm">حواله بانکی</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 p-3 rounded-lg border ${
                        mockProduct.paymentOptions.installment
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      {mockProduct.paymentOptions.installment ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm">اقساطی</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-900">
                        تضمین امنیت پرداخت
                      </span>
                    </div>
                    <p className="text-sm text-blue-800">
                      پول شما تا زمان تایید دریافت کالا در حساب بارتون نگهداری
                      می‌شود و پس از تایید شما به فروشنده پرداخت خواهد شد.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>نظرات خریداران</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>هنوز نظری ثبت نشده است</p>
                  <p className="text-sm mt-2">
                    اولین نفری باشید که نظر خود را درباره این محصول می‌دهید
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
