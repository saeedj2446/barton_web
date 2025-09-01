import React, { useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import { Badge } from "../../../components/ui/badge";
import { Star, MapPin } from "lucide-react";

interface Product {
  id: string;
  name: string;
  image: string;
  priceRange: string;
  minOrderQuantity: string;
  rating: number;
  supplierName: string;
  supplierLocation: string;
  verified: boolean;
}
interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}
interface Location {
  id: string;
  name: string;
  type: "city" | "province" | "country" | "continent" | "global";
  parentId?: string;
}

interface ProductRecommendationsProps {
  title?: string;
  industries?: string[];
  products?: Product[];
  currentLanguage?: Language;
  selectedLocation?: Location;
  onLocationChange?: (location: Location) => void;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  title = "Recommended Products for Your Industry",
  industries = [
    "All",
    "Electronics",
    "Textiles",
    "Food & Beverage",
    "Construction",
    "Automotive",
  ],
  selectedLocation = {
    id: "shiraz",
    name: "شیراز",
    type: "city",
    parentId: "fars",
  },
  onLocationChange = () => {},
  products = [
    {
      id: "1",
      name: "Industrial Grade Microchips - Bulk Order",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      priceRange: "$5.00 - $8.50 per unit",
      minOrderQuantity: "1,000 units",
      rating: 4.8,
      supplierName: "TechCore Solutions",
      supplierLocation: "Taiwan",
      verified: true,
    },
    {
      id: "2",
      name: "Premium Cotton Fabric Rolls",
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
      priceRange: "$3.20 - $4.50 per meter",
      minOrderQuantity: "500 meters",
      rating: 4.6,
      supplierName: "TextilePro Manufacturing",
      supplierLocation: "India",
      verified: true,
    },
    {
      id: "3",
      name: "Organic Dried Fruits - Wholesale",
      image:
        "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=80",
      priceRange: "$12.00 - $18.00 per kg",
      minOrderQuantity: "250 kg",
      rating: 4.9,
      supplierName: "Natural Harvest Co.",
      supplierLocation: "Turkey",
      verified: true,
    },
    {
      id: "4",
      name: "Industrial Steel Beams",
      image:
        "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80",
      priceRange: "$850 - $1,200 per ton",
      minOrderQuantity: "10 tons",
      rating: 4.7,
      supplierName: "SteelWorks International",
      supplierLocation: "Germany",
      verified: true,
    },
    {
      id: "5",
      name: "Automotive LED Light Assemblies",
      image:
        "https://images.unsplash.com/photo-1600661653561-629509216228?w=800&q=80",
      priceRange: "$22.50 - $35.00 per unit",
      minOrderQuantity: "500 units",
      rating: 4.5,
      supplierName: "AutoLux Components",
      supplierLocation: "South Korea",
      verified: true,
    },
    {
      id: "6",
      name: "Bulk Spices and Seasonings",
      image:
        "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=80",
      priceRange: "$8.00 - $25.00 per kg",
      minOrderQuantity: "100 kg",
      rating: 4.8,
      supplierName: "Global Spice Traders",
      supplierLocation: "Morocco",
      verified: true,
    },
  ],
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  // Filter products based on selected industry (in a real app)
  // This is just a placeholder - in a real implementation you would filter based on industry
  const filteredProducts = products;

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {selectedLocation.type === "global"
              ? title
              : `محصولات پیشنهادی از ${selectedLocation.name}`}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            کشف محصولات با کیفیت از تامین‌کنندگان تایید شده
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {filteredProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative static mr-2" />
            <CarouselNext className="relative static ml-2" />
          </div>
        </Carousel>

        <div className="flex justify-center mt-10">
          <button className="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product = {
    id: "1",
    name: "Product Name",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    priceRange: "$10.00 - $20.00",
    minOrderQuantity: "100 units",
    rating: 4.5,
    supplierName: "Supplier Name",
    supplierLocation: "Country",
    verified: true,
  },
}) => {
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2 mb-2">
          {product.name}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
        </div>

        <div className="text-orange-600 font-medium mb-1">
          {product.priceRange}
        </div>
        <div className="text-sm text-gray-500 mb-3">
          Min. Order: {product.minOrderQuantity}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
              {product.supplierName.charAt(0)}
            </div>
            <span className="text-sm font-medium truncate max-w-[120px]">
              {product.supplierName}
            </span>
          </div>

          {product.verified && (
            <Badge
              variant="outline"
              className="border-orange-500 text-orange-600 text-xs"
            >
              Verified
            </Badge>
          )}
        </div>

        <div className="flex items-center mt-2 text-xs text-gray-500">
          <MapPin className="w-3 h-3 mr-1" />
          {product.supplierLocation}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductRecommendations;
