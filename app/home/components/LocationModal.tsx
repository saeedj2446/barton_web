"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface Location {
  id: string;
  name: string;
  type: "city" | "province" | "country" | "continent" | "global";
  parentId?: string;
}

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: Location;
  onLocationChange: (location: Location) => void;
  currentLanguage: { direction: "ltr" | "rtl"; code: string };
}

export default function LocationModal({
  isOpen,
  onClose,
  selectedLocation,
  onLocationChange,
  currentLanguage,
}: LocationModalProps) {
  const [tempSelection, setTempSelection] = useState({
    country: "",
    province: "",
    city: "",
    neighborhood: "",
  });

  // Location data
  const locationData = {
    countries: [
      { id: "iran", name: "ایران", type: "country" as const },
      { id: "uae", name: "امارات متحده عربی", type: "country" as const },
      { id: "turkey", name: "ترکیه", type: "country" as const },
    ],
    provinces: {
      iran: [
        {
          id: "fars",
          name: "فارس",
          type: "province" as const,
          parentId: "iran",
        },
        {
          id: "tehran",
          name: "تهران",
          type: "province" as const,
          parentId: "iran",
        },
        {
          id: "isfahan",
          name: "اصفهان",
          type: "province" as const,
          parentId: "iran",
        },
        {
          id: "khorasan",
          name: "خراسان رضوی",
          type: "province" as const,
          parentId: "iran",
        },
      ],
      uae: [
        {
          id: "dubai",
          name: "دبی",
          type: "province" as const,
          parentId: "uae",
        },
        {
          id: "abudhabi",
          name: "ابوظبی",
          type: "province" as const,
          parentId: "uae",
        },
      ],
      turkey: [
        {
          id: "istanbul",
          name: "استانبول",
          type: "province" as const,
          parentId: "turkey",
        },
        {
          id: "ankara",
          name: "آنکارا",
          type: "province" as const,
          parentId: "turkey",
        },
      ],
    },
    cities: {
      fars: [
        {
          id: "shiraz",
          name: "شیراز",
          type: "city" as const,
          parentId: "fars",
        },
        {
          id: "marvdasht",
          name: "مرودشت",
          type: "city" as const,
          parentId: "fars",
        },
        { id: "jahrom", name: "جهرم", type: "city" as const, parentId: "fars" },
      ],
      tehran: [
        {
          id: "tehran-city",
          name: "تهران",
          type: "city" as const,
          parentId: "tehran",
        },
        { id: "karaj", name: "کرج", type: "city" as const, parentId: "tehran" },
        {
          id: "eslamshahr",
          name: "اسلامشهر",
          type: "city" as const,
          parentId: "tehran",
        },
      ],
      isfahan: [
        {
          id: "isfahan-city",
          name: "اصفهان",
          type: "city" as const,
          parentId: "isfahan",
        },
        {
          id: "kashan",
          name: "کاشان",
          type: "city" as const,
          parentId: "isfahan",
        },
        {
          id: "najafabad",
          name: "نجف‌آباد",
          type: "city" as const,
          parentId: "isfahan",
        },
      ],
      khorasan: [
        {
          id: "mashhad",
          name: "مشهد",
          type: "city" as const,
          parentId: "khorasan",
        },
        {
          id: "neyshabur",
          name: "نیشابور",
          type: "city" as const,
          parentId: "khorasan",
        },
      ],
      dubai: [
        {
          id: "dubai-city",
          name: "دبی",
          type: "city" as const,
          parentId: "dubai",
        },
        {
          id: "sharjah",
          name: "شارجه",
          type: "city" as const,
          parentId: "dubai",
        },
      ],
      abudhabi: [
        {
          id: "abudhabi-city",
          name: "ابوظبی",
          type: "city" as const,
          parentId: "abudhabi",
        },
        {
          id: "alain",
          name: "العین",
          type: "city" as const,
          parentId: "abudhabi",
        },
      ],
      istanbul: [
        {
          id: "istanbul-city",
          name: "استانبول",
          type: "city" as const,
          parentId: "istanbul",
        },
        {
          id: "beyoglu",
          name: "بی‌اوغلو",
          type: "city" as const,
          parentId: "istanbul",
        },
      ],
      ankara: [
        {
          id: "ankara-city",
          name: "آنکارا",
          type: "city" as const,
          parentId: "ankara",
        },
      ],
    },
    neighborhoods: {
      shiraz: [
        {
          id: "shiraz-center",
          name: "مرکز شهر",
          type: "city" as const,
          parentId: "shiraz",
        },
        {
          id: "shiraz-golshan",
          name: "گلشن",
          type: "city" as const,
          parentId: "shiraz",
        },
        {
          id: "shiraz-sadra",
          name: "صدرا",
          type: "city" as const,
          parentId: "shiraz",
        },
      ],
      "tehran-city": [
        {
          id: "tehran-center",
          name: "مرکز تهران",
          type: "city" as const,
          parentId: "tehran-city",
        },
        {
          id: "tehran-north",
          name: "شمال تهران",
          type: "city" as const,
          parentId: "tehran-city",
        },
        {
          id: "tehran-west",
          name: "غرب تهران",
          type: "city" as const,
          parentId: "tehran-city",
        },
      ],
      "dubai-city": [
        {
          id: "dubai-marina",
          name: "مارینا",
          type: "city" as const,
          parentId: "dubai-city",
        },
        {
          id: "dubai-downtown",
          name: "مرکز شهر",
          type: "city" as const,
          parentId: "dubai-city",
        },
      ],
    },
  };

  const getProvinces = () => {
    if (!tempSelection.country) return [];
    return (
      locationData.provinces[
        tempSelection.country as keyof typeof locationData.provinces
      ] || []
    );
  };

  const getCities = () => {
    if (!tempSelection.province) return [];
    return (
      locationData.cities[
        tempSelection.province as keyof typeof locationData.cities
      ] || []
    );
  };

  const getNeighborhoods = () => {
    if (!tempSelection.city) return [];
    return (
      locationData.neighborhoods[
        tempSelection.city as keyof typeof locationData.neighborhoods
      ] || []
    );
  };

  const handleConfirm = () => {
    // Determine the most specific location selected
    let selectedLocationData: Location;

    if (tempSelection.neighborhood) {
      const neighborhoods = getNeighborhoods();
      selectedLocationData =
        neighborhoods.find((n) => n.id === tempSelection.neighborhood) ||
        selectedLocation;
    } else if (tempSelection.city) {
      const cities = getCities();
      selectedLocationData =
        cities.find((c) => c.id === tempSelection.city) || selectedLocation;
    } else if (tempSelection.province) {
      const provinces = getProvinces();
      selectedLocationData =
        provinces.find((p) => p.id === tempSelection.province) ||
        selectedLocation;
    } else if (tempSelection.country) {
      selectedLocationData =
        locationData.countries.find((c) => c.id === tempSelection.country) ||
        selectedLocation;
    } else {
      selectedLocationData = { id: "global", name: "جهانی", type: "global" };
    }

    onLocationChange(selectedLocationData);
    onClose();
  };

  const handleReset = () => {
    setTempSelection({
      country: "",
      province: "",
      city: "",
      neighborhood: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl" dir={currentLanguage.direction}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MapPin className="w-5 h-5 text-orange-500" />
            انتخاب موقعیت جغرافیایی
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Country Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">کشور</label>
              <Select
                value={tempSelection.country}
                onValueChange={(value) => {
                  setTempSelection({
                    country: value,
                    province: "",
                    city: "",
                    neighborhood: "",
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب کشور" />
                </SelectTrigger>
                <SelectContent>
                  {locationData.countries.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Province Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">استان</label>
              <Select
                value={tempSelection.province}
                onValueChange={(value) => {
                  setTempSelection({
                    ...tempSelection,
                    province: value,
                    city: "",
                    neighborhood: "",
                  });
                }}
                disabled={!tempSelection.country}
              >
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب استان" />
                </SelectTrigger>
                <SelectContent>
                  {getProvinces().map((province) => (
                    <SelectItem key={province.id} value={province.id}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">شهر</label>
              <Select
                value={tempSelection.city}
                onValueChange={(value) => {
                  setTempSelection({
                    ...tempSelection,
                    city: value,
                    neighborhood: "",
                  });
                }}
                disabled={!tempSelection.province}
              >
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب شهر" />
                </SelectTrigger>
                <SelectContent>
                  {getCities().map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Neighborhood Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">محله</label>
              <Select
                value={tempSelection.neighborhood}
                onValueChange={(value) => {
                  setTempSelection({
                    ...tempSelection,
                    neighborhood: value,
                  });
                }}
                disabled={!tempSelection.city}
              >
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب محله" />
                </SelectTrigger>
                <SelectContent>
                  {getNeighborhoods().map((neighborhood) => (
                    <SelectItem key={neighborhood.id} value={neighborhood.id}>
                      {neighborhood.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Current Selection Display */}
          <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm font-medium text-orange-800 mb-2">
              انتخاب فعلی:
            </p>
            <p className="text-orange-700">
              {tempSelection.neighborhood &&
                getNeighborhoods().find(
                  (n) => n.id === tempSelection.neighborhood,
                )?.name}
              {tempSelection.neighborhood && tempSelection.city && " - "}
              {tempSelection.city &&
                getCities().find((c) => c.id === tempSelection.city)?.name}
              {tempSelection.city && tempSelection.province && " - "}
              {tempSelection.province &&
                getProvinces().find((p) => p.id === tempSelection.province)
                  ?.name}
              {tempSelection.province && tempSelection.country && " - "}
              {tempSelection.country &&
                locationData.countries.find(
                  (c) => c.id === tempSelection.country,
                )?.name}
              {!tempSelection.country &&
                !tempSelection.province &&
                !tempSelection.city &&
                !tempSelection.neighborhood &&
                "جهانی"}
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleReset}>
            پاک کردن
          </Button>
          <Button variant="outline" onClick={onClose}>
            لغو
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-orange-500 hover:bg-orange-600"
          >
            تایید انتخاب
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
