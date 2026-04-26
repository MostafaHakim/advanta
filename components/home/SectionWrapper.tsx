"use client";

import { motion, Variants } from "framer-motion";
import { fadeInUp, fadeIn } from "@/lib/utils";

type VariantType = "fadeInUp" | "fadeIn";

interface SectionWrapperProps {
  children: React.ReactNode;
  delay?: number;
  variant?: VariantType;
  className?: string;
}

export const SectionWrapper = ({
  children,
  delay = 0,
  variant = "fadeInUp",
  className = "w-full",
}: SectionWrapperProps) => {
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
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInWrapper = ({
  children,
  duration = 0.5,
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SpringWrapper = ({
  children,
  delay = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
