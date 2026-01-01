"use client";

import { useState, useEffect } from "react";
import {
  Search,
  TrendingUp,
  MessageSquare,
  Code,
  PenTool,
  BarChart,
  Zap,
  Users,
  Target,
  Rocket,
} from "lucide-react";
import { ServiceCard } from "@/components/services";

import { FAQSection, ProcessSection } from "@/components/sections";

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  color: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch("/api/services");
      const data = await res.json();
      if (data && Array.isArray(data.data)) {
        setServices(data.data);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Comprehensive{" "}
              <span className="text-blue-600">Digital Marketing</span> Services
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We offer end-to-end digital marketing solutions tailored to your
              business goals. From SEO to social media, we've got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary">Get Free Consultation</button>
              <button className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors">
                View Pricing Plans
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We combine expertise, innovation, and dedication to deliver
              exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Fast Results",
                description: "Quick implementation and rapid results delivery",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Expert Team",
                description:
                  "Certified professionals with 10+ years experience",
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Data-Driven",
                description: "Strategies backed by data and analytics",
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Scalable Solutions",
                description:
                  "Grow with solutions that scale with your business",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-6 mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Let's discuss how our services can help you achieve your business
            goals
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Start Your Project Today
          </button>
        </div>
      </section>
    </>
  );
}
