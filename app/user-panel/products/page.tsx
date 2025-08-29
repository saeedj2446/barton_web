"use client";

import React from "react";
import ProductManagement from "../components/product/ProductManagement";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

export default function ProductsPage() {
  const currentLanguage: Language = {
    name: "فارسی",
    code: "fa",
    direction: "rtl",
  };

  const translations = {
    // Add any specific translations needed for products page
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
      dir={currentLanguage.direction}
    >
      <ProductManagement
        currentLanguage={currentLanguage}
        translations={translations}
      />
    </div>
  );
}
