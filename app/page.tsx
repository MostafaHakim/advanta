import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import StatsSection from "@/components/sections/StatsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Top-Tier Digital Marketing Services - Drive Growth with Our Agency",
  description:
    "Partner with our leading digital marketing agency to unlock your brand's full potential. We offer a comprehensive suite of services, including SEO, PPC, social media, and content marketing, to help you achieve your business goals.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
