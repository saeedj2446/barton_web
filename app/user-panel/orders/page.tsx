"use client";

import React, { useState } from "react";
import { OrderManagement } from "../components/order/OrderManagement";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

export default function OrdersPage() {
  const [currentLanguage] = useState<Language>({
    name: "فارسی",
    code: "fa",
    direction: "rtl",
  });

  const translations = {
    orderManagement: "مدیریت سفارشات",
    orders: "سفارشات",
    allOrders: "همه سفارشات",
    newOrders: "سفارشات جدید",
    processing: "در حال پردازش",
    shipped: "ارسال شده",
    delivered: "تحویل داده شده",
    cancelled: "لغو شده",
    returned: "مرجوع شده",
    confirmed: "تایید شده",
    pending: "در انتظار",
    search: "جستجو در سفارشات...",
    orderNumber: "شماره سفارش",
    customer: "مشتری",
    total: "مبلغ کل",
    status: "وضعیت",
    date: "تاریخ",
    actions: "عملیات",
    viewDetails: "مشاهده جزئیات",
    edit: "ویرایش",
    noOrders: "سفارشی یافت نشد",
    totalOrders: "کل سفارشات",
    processingOrders: "در حال پردازش",
    completedOrders: "تکمیل شده",
    cancelledOrders: "لغو شده",
    todayOrders: "سفارشات امروز",
    thisWeek: "این هفته",
    thisMonth: "این ماه",
    revenue: "درآمد",
    averageOrder: "میانگین سفارش",
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20"
      dir={currentLanguage.direction}
    >
      <OrderManagement
        currentLanguage={currentLanguage}
        translations={translations}
      />
    </div>
  );
}
