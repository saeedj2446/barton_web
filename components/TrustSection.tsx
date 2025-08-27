import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Users, BarChart3, CheckCircle } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

interface Metric {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface TrustBadge {
  icon: React.ReactNode;
  label: string;
}

interface TrustSectionProps {
  testimonials?: Testimonial[];
  metrics?: Metric[];
  trustBadges?: TrustBadge[];
}

const TrustSection: React.FC<TrustSectionProps> = ({
  testimonials = [
    {
      id: "1",
      name: "Sarah Johnson",
      company: "Retail Solutions Inc.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      content:
        "Barton has transformed how we source products. The platform is intuitive and the supplier verification process gives us confidence in every transaction.",
      rating: 5,
    },
    {
      id: "2",
      name: "Ahmed Hassan",
      company: "Global Trade Partners",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
      content:
        "As an international supplier, Barton has helped us reach new markets efficiently. The multilingual support makes communication seamless.",
      rating: 4,
    },
    {
      id: "3",
      name: "Li Wei",
      company: "Eastern Exports Co.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wei",
      content:
        "The platform's verification system has helped us build trust with new clients. Our wholesale business has grown 40% since joining Barton.",
      rating: 5,
    },
  ],
  metrics = [
    {
      value: "10,000+",
      label: "Verified Suppliers",
      icon: <Users className="h-6 w-6 text-blue-500" />,
    },
    {
      value: "25,000+",
      label: "Active Buyers",
      icon: <Users className="h-6 w-6 text-green-500" />,
    },
    {
      value: "$500M+",
      label: "Monthly Transactions",
      icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
    },
  ],
  trustBadges = [
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      label: "Secure Transactions",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      label: "Verified Businesses",
    },
    {
      icon: <Star className="h-6 w-6 text-amber-500" />,
      label: "Quality Assurance",
    },
  ],
}) => {
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
        />
      ));
  };

  return (
    <section className="w-full py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of businesses that trust Barton for their wholesale
            needs. Our platform ensures secure transactions and verified
            partners.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <div className="mr-3">{badge.icon}</div>
              <span className="font-medium text-gray-800">{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Business Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-center mb-3">{metric.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900">
                {metric.value}
              </h3>
              <p className="text-gray-600">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <h3 className="text-2xl font-semibold text-center mb-8">
          What Our Users Say
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-blue-600 border-blue-200 bg-blue-50"
          >
            Join Our Global Network
          </Badge>
          <h3 className="text-2xl font-bold mb-4">
            Ready to transform your wholesale business?
          </h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
