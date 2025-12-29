"use client";

import { useState } from "react";
import { Check, X, Zap, Users, Building, Star } from "lucide-react";
import { PricingCard } from "@/components/pricing";
import { FAQSection } from "@/components/sections";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses getting started",
      monthlyPrice: 499,
      yearlyPrice: 449,
      features: [
        { name: "Basic SEO Audit", included: true },
        { name: "Keyword Research (50 keywords)", included: true },
        { name: "On-page SEO Optimization", included: true },
        { name: "Monthly Performance Report", included: true },
        { name: "Social Media Management (2 platforms)", included: true },
        { name: "Content Writing (2 blog posts/month)", included: true },
        { name: "Google Analytics Setup", included: true },
        { name: "PPC Campaign Management", included: false },
        { name: "Advanced Analytics Dashboard", included: false },
        { name: "Dedicated Account Manager", included: false },
      ],
      popular: false,
      icon: <Zap className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses",
      monthlyPrice: 999,
      yearlyPrice: 899,
      features: [
        { name: "Everything in Starter", included: true },
        { name: "Advanced SEO Strategy", included: true },
        { name: "Keyword Research (200 keywords)", included: true },
        { name: "Technical SEO Audit", included: true },
        { name: "Social Media Management (4 platforms)", included: true },
        { name: "Content Writing (4 blog posts/month)", included: true },
        { name: "PPC Campaign Management", included: true },
        { name: "Email Marketing Campaigns", included: true },
        { name: "Advanced Analytics Dashboard", included: true },
        { name: "Dedicated Account Manager", included: false },
      ],
      popular: true,
      icon: <Users className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Enterprise",
      description: "Complete solution for large organizations",
      monthlyPrice: 2499,
      yearlyPrice: 2249,
      features: [
        { name: "Everything in Professional", included: true },
        { name: "Comprehensive SEO Strategy", included: true },
        { name: "Unlimited Keyword Research", included: true },
        { name: "Full Technical SEO Implementation", included: true },
        { name: "Social Media Management (All platforms)", included: true },
        { name: "Content Writing (8+ blog posts/month)", included: true },
        { name: "Multi-channel PPC Management", included: true },
        { name: "Advanced Email Marketing Automation", included: true },
        { name: "Custom Analytics & Reporting", included: true },
        { name: "Dedicated Account Manager", included: true },
      ],
      popular: false,
      icon: <Building className="w-8 h-8" />,
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  const features = [
    {
      category: "SEO Services",
      items: [
        "Comprehensive SEO Audit",
        "Keyword Research & Strategy",
        "On-page & Technical SEO",
        "Local SEO Optimization",
        "Link Building Strategy",
        "SEO Performance Tracking",
      ],
    },
    {
      category: "Content Marketing",
      items: [
        "Content Strategy Development",
        "Blog Writing & Editing",
        "Social Media Content",
        "Email Newsletter Creation",
        "Video Content Production",
        "Content Performance Analysis",
      ],
    },
    {
      category: "Paid Advertising",
      items: [
        "Google Ads Management",
        "Facebook/Instagram Ads",
        "LinkedIn Advertising",
        "Display & Remarketing",
        "Ad Copy & Creative Design",
        "Conversion Rate Optimization",
      ],
    },
    {
      category: "Analytics & Reporting",
      items: [
        "Google Analytics Setup",
        "Custom Dashboard Creation",
        "Monthly Performance Reports",
        "Competitor Analysis",
        "ROI Tracking & Analysis",
        "Strategy Recommendations",
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Simple, <span className="text-blue-600">Transparent</span> Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Choose the perfect plan for your business. All plans include our
              signature expertise and commitment to results.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-gray-100 rounded-full p-1 mb-12">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-white shadow-lg text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  billingCycle === "yearly"
                    ? "bg-white shadow-lg text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Yearly <span className="text-emerald-600 ml-1">(Save 20%)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                billingCycle={billingCycle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Detailed Feature Comparison
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Compare all features across our plans to find the perfect fit for
              your needs
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-4 border-b">
              <div className="p-6 font-bold">Features</div>
              <div className="p-6 text-center font-bold">Starter</div>
              <div className="p-6 text-center font-bold">Professional</div>
              <div className="p-6 text-center font-bold">Enterprise</div>
            </div>

            {features.map((category) => (
              <div key={category.category}>
                <div className="p-4 bg-gray-50 font-bold border-b">
                  {category.category}
                </div>
                {category.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 border-b hover:bg-gray-50"
                  >
                    <div className="p-4 pl-8">{item}</div>
                    <div className="p-4 text-center">
                      {idx < 5 ? (
                        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )}
                    </div>
                    <div className="p-4 text-center">
                      <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                    </div>
                    <div className="p-4 text-center">
                      <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Plan CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <Star className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Custom Solutions</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Need a Custom Plan?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                We understand that every business is unique. Let's create a
                custom package tailored specifically to your needs and budget.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Tailored strategy for your specific goals",
                  "Flexible budget options",
                  "Priority support and service",
                  "Custom reporting requirements",
                  "Industry-specific expertise",
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-300 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 text-gray-900">
              <h3 className="text-2xl font-bold mb-6">Request Custom Quote</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Select Service Requirements</option>
                  <option>SEO + Content Marketing</option>
                  <option>PPC + Social Media</option>
                  <option>Full Digital Marketing Suite</option>
                  <option>Custom Combination</option>
                </select>
                <textarea
                  placeholder="Tell us about your project..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <button type="submit" className="w-full btn-primary">
                  Request Custom Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              See how our pricing plans have helped businesses achieve their
              goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Tech Startup",
                plan: "Professional Plan",
                quote:
                  "The ROI from their services paid for itself in 3 months.",
                results: ["Traffic: +300%", "Leads: +150%", "ROI: 5x"],
              },
              {
                name: "E-commerce Store",
                plan: "Enterprise Plan",
                quote:
                  "Complete digital transformation that doubled our revenue.",
                results: ["Revenue: +200%", "Conversion: +35%", "CAC: -40%"],
              },
              {
                name: "Local Business",
                plan: "Starter Plan",
                quote: "Perfect for our budget and delivered amazing results.",
                results: [
                  "Local Ranking: #1",
                  "Calls: +500%",
                  "Cost/Lead: -60%",
                ],
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-3xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.plan}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="space-y-2">
                  {testimonial.results.map((result, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Choose a plan that fits your needs and start seeing results today
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Start 14-Day Free Trial
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
              Schedule Demo
            </button>
          </div>
          <p className="mt-6 text-sm opacity-80">
            No credit card required • Cancel anytime • 30-day money-back
            guarantee
          </p>
        </div>
      </section>
    </>
  );
}
