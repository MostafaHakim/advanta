"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Mail } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-4">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
            <span className="text-sm font-medium">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
          <HelpCircle className="w-5 h-5 text-gray-500 mr-2" />
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
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
                  openIndex === index
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
                    : "bg-white hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                      <HelpCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openIndex === index
                        ? "transform rotate-180 text-blue-600"
                        : "text-gray-400"
                    }`}
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
                        <p className="text-gray-600">{faq.answer}</p>
                        <div className="mt-4 flex items-center">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our team is here to
              help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
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
