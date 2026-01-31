"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Mail, Sun, Moon } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const faqs = [
    {
      question: "How long does it take to see results from SEO?",
      answer:
        "SEO results typically start showing within 3-6 months, with significant improvements visible by 6-12 months. However, this timeline varies based on factors like competition, website age, and the scope of optimization. We provide monthly progress reports so you can track improvements.",
      category: "SEO",
    },
    {
      question: "What is included in your digital marketing packages?",
      answer:
        "Our packages include strategy development, implementation, ongoing management, and detailed reporting. Specific services vary by package but typically include SEO, content marketing, social media management, PPC campaigns (where applicable), and monthly performance analysis.",
      category: "General",
    },
    {
      question: "Do you offer month-to-month contracts?",
      answer:
        "Yes, we offer flexible month-to-month contracts for most services. We believe in earning your business every month. However, we do offer discounts for longer-term commitments (6-12 months) which provide better value.",
      category: "Billing",
    },
    {
      question: "How do you measure campaign success?",
      answer:
        "We use a combination of key performance indicators (KPIs) including website traffic, conversion rates, lead generation, revenue growth, and ROI. We provide custom dashboards with real-time data and monthly comprehensive reports.",
      category: "Analytics",
    },
    {
      question: "Can you work with our existing marketing team?",
      answer:
        "Absolutely! We often collaborate with in-house marketing teams. We can either supplement your existing efforts or take over specific functions. Our approach is flexible and tailored to your needs.",
      category: "Collaboration",
    },
    {
      question: "What industries do you specialize in?",
      answer:
        "We have experience across various industries including technology, e-commerce, healthcare, finance, education, and professional services. Our strategies are tailored to each industry specific requirements and regulations.",
      category: "Expertise",
    },
    {
      question: "How much should I budget for digital marketing?",
      answer:
        "Budgets vary based on business size, goals, and competition. Generally, businesses allocate 7-12% of revenue to marketing. During our consultation, we provide specific recommendations based on your objectives.",
      category: "Budget",
    },
    {
      question: "Do you provide content creation services?",
      answer:
        "Yes, we have an in-house team of writers, designers, and video producers who create high-quality content including blog posts, social media content, videos, infographics, and email newsletters.",
      category: "Content",
    },
  ];

  const categories = [
    { id: "all", name: "All Questions", count: faqs.length },
    {
      id: "SEO",
      name: "SEO",
      count: faqs.filter((f) => f.category === "SEO").length,
    },
    {
      id: "General",
      name: "General",
      count: faqs.filter((f) => f.category === "General").length,
    },
    {
      id: "Billing",
      name: "Billing",
      count: faqs.filter((f) => f.category === "Billing").length,
    },
    {
      id: "Analytics",
      name: "Analytics",
      count: faqs.filter((f) => f.category === "Analytics").length,
    },
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  // Light theme colors
  const themeColors = {
    background: isDarkMode ? "#1f2937" : "#ffffff",
    sectionBackground: isDarkMode ? "#111827" : "#f9fafb",
    textPrimary: isDarkMode ? "#f9fafb" : "#111827",
    textSecondary: isDarkMode ? "#d1d5db" : "#4b5563",
    cardBackground: isDarkMode ? "#374151" : "#ffffff",
    border: isDarkMode ? "#4b5563" : "#e5e7eb",
    primary: isDarkMode ? "#60a5fa" : "#2563eb",
    primaryLight: isDarkMode ? "#1e3a8a" : "#dbeafe",
    hover: isDarkMode ? "#4b5563" : "#f3f4f6",
    gradientFrom: isDarkMode ? "#1e40af" : "#2563eb",
    gradientTo: isDarkMode ? "#7c3aed" : "#7c3aed",
  };

  return (
    <section
      className="py-12 md:py-20 transition-colors duration-300"
      style={{ backgroundColor: themeColors.sectionBackground }}
    >
      <div className="container-custom">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors"
            style={{
              backgroundColor: themeColors.cardBackground,
              color: themeColors.textPrimary,
              border: `1px solid ${themeColors.border}`,
            }}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center px-4 py-2 rounded-full mb-4"
            style={{
              backgroundColor: isDarkMode
                ? themeColors.primaryLight
                : "#dbeafe",
              color: isDarkMode ? "#dbeafe" : themeColors.primary,
            }}
          >
            <span
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: themeColors.primary }}
            />
            <span className="text-sm font-medium">FAQ</span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: themeColors.textPrimary }}
          >
            Frequently Asked{" "}
            <span style={{ color: themeColors.primary }}>Questions</span>
          </h2>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: themeColors.textSecondary }}
          >
            Find answers to common questions about our services and processes
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <HelpCircle
            className="w-5 h-5 mr-2"
            style={{ color: themeColors.textSecondary }}
          />
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id ? "shadow-lg" : "shadow"
              }`}
              style={{
                backgroundColor:
                  activeCategory === category.id
                    ? themeColors.primary
                    : themeColors.cardBackground,
                color:
                  activeCategory === category.id
                    ? "#ffffff"
                    : themeColors.textPrimary,
                border:
                  activeCategory !== category.id
                    ? `1px solid ${themeColors.border}`
                    : "none",
              }}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                  openIndex === index ? "border" : "border hover:shadow-md"
                }`}
                style={{
                  backgroundColor:
                    openIndex === index
                      ? isDarkMode
                        ? "rgba(30, 64, 175, 0.2)"
                        : "#f0f9ff"
                      : themeColors.cardBackground,
                  borderColor:
                    openIndex === index
                      ? themeColors.primary
                      : themeColors.border,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                      style={{ backgroundColor: themeColors.primaryLight }}
                    >
                      <HelpCircle
                        className="w-5 h-5"
                        style={{ color: themeColors.primary }}
                      />
                    </div>
                    <h3
                      className="text-base md:text-lg font-semibold"
                      style={{ color: themeColors.textPrimary }}
                    >
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                    style={{
                      color:
                        openIndex === index
                          ? themeColors.primary
                          : themeColors.textSecondary,
                    }}
                  />
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pl-14">
                        <p style={{ color: themeColors.textSecondary }}>
                          {faq.answer}
                        </p>
                        <div className="mt-4 flex items-center">
                          <span
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{
                              backgroundColor: themeColors.primaryLight,
                              color: themeColors.primary,
                            }}
                          >
                            {faq.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <div
            className="rounded-3xl p-8 md:p-12 text-white text-center"
            style={{
              background: `linear-gradient(135deg, ${themeColors.gradientFrom}, ${themeColors.gradientTo})`,
            }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Can&apos;t find the answer you&apos;re looking for? Our team is here to
              help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                className="bg-white px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                style={{ color: themeColors.primary }}
              >
                Contact Support
              </button>
              <button className="border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
                Schedule a Call
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
