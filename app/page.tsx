"use client";

import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import StatsSection from "@/components/sections/StatsSection";
import { TeamSection } from "@/components/sections";
import { motion, Variants } from "framer-motion";

// Reusable animation variants with proper typing
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// Type for variant options
type VariantType = "fadeInUp" | "fadeIn";

// Section wrapper component with animations
const AnimatedSection = ({
  children,
  delay = 0,
  variant = "fadeInUp",
}: {
  children: React.ReactNode;
  delay?: number;
  variant?: VariantType;
}) => {
  // Map variant string to actual variant object
  const variants: Record<VariantType, Variants> = {
    fadeInUp,
    fadeIn,
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants[variant]}
      transition={{ delay }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <>
      {/* Hero with special animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
      </motion.div>

      {/* Stats with staggered animation */}
      <AnimatedSection delay={0.1}>
        <StatsSection />
      </AnimatedSection>

      {/* Services with fadeInUp */}
      <AnimatedSection delay={0.2}>
        <ServicesSection />
      </AnimatedSection>

      {/* Team with fadeIn */}
      <AnimatedSection variant="fadeIn" delay={0.3}>
        <TeamSection />
      </AnimatedSection>

      {/* Portfolio with fadeInUp */}
      <AnimatedSection delay={0.4}>
        <PortfolioSection />
      </AnimatedSection>

      {/* Testimonials with fadeIn */}
      <AnimatedSection variant="fadeIn" delay={0.5}>
        <TestimonialsSection />
      </AnimatedSection>

      {/* CTA with special attention */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          type: "spring",
          stiffness: 100,
        }}
      >
        <CTASection />
      </motion.div>
    </>
  );
}
