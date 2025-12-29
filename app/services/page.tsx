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

export const metadata = {
  title: "Services | Digital Marketing Solutions",
  description:
    "Comprehensive digital marketing services including SEO, PPC, Social Media, Web Development, and more.",
};

const services = [
  {
    id: "seo",
    icon: <Search className="w-8 h-8" />,
    title: "SEO Optimization",
    description:
      "Improve your search engine rankings and drive organic traffic with our comprehensive SEO strategies.",
    features: [
      "Keyword Research & Analysis",
      "On-page SEO Optimization",
      "Technical SEO Audit",
      "Link Building Strategy",
      "Local SEO Optimization",
      "Content Optimization",
    ],
    benefits: [
      "Increased Organic Traffic",
      "Higher Search Rankings",
      "Improved User Experience",
      "Better Conversion Rates",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "ppc",
    icon: <TrendingUp className="w-8 h-8" />,
    title: "PPC Advertising",
    description:
      "Drive immediate results with targeted pay-per-click campaigns across Google, Facebook, and more.",
    features: [
      "Google Ads Management",
      "Facebook/Instagram Ads",
      "LinkedIn Advertising",
      "Display Network Campaigns",
      "Remarketing Strategies",
      "Conversion Tracking",
    ],
    benefits: [
      "Immediate Traffic Boost",
      "Targeted Audience Reach",
      "Measurable ROI",
      "Flexible Budget Control",
    ],
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "social-media",
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Social Media Marketing",
    description:
      "Build brand awareness and engage your audience across all major social media platforms.",
    features: [
      "Social Media Strategy",
      "Content Creation & Scheduling",
      "Community Management",
      "Influencer Marketing",
      "Paid Social Advertising",
      "Analytics & Reporting",
    ],
    benefits: [
      "Increased Brand Awareness",
      "Higher Engagement Rates",
      "Community Building",
      "Direct Customer Feedback",
    ],
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "web-development",
    icon: <Code className="w-8 h-8" />,
    title: "Web Development",
    description:
      "Build fast, responsive, and conversion-optimized websites that drive business growth.",
    features: [
      "Custom Website Development",
      "E-commerce Solutions",
      "WordPress Development",
      "React/Next.js Applications",
      "Performance Optimization",
      "Ongoing Maintenance",
    ],
    benefits: [
      "Improved User Experience",
      "Faster Loading Speeds",
      "Mobile Responsive",
      "SEO Friendly Structure",
    ],
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: "content-marketing",
    icon: <PenTool className="w-8 h-8" />,
    title: "Content Marketing",
    description:
      "Create compelling content that engages your audience and drives conversions.",
    features: [
      "Content Strategy Development",
      "Blog Writing & Editing",
      "Video Production",
      "Infographic Design",
      "Email Marketing",
      "Content Distribution",
    ],
    benefits: [
      "Increased Brand Authority",
      "Better Search Rankings",
      "Higher Engagement",
      "Lead Generation",
    ],
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "analytics",
    icon: <BarChart className="w-8 h-8" />,
    title: "Analytics & Reporting",
    description:
      "Make data-driven decisions with comprehensive analytics and insightful reporting.",
    features: [
      "Google Analytics Setup",
      "Custom Dashboard Creation",
      "Conversion Tracking",
      "Competitor Analysis",
      "ROI Measurement",
      "Monthly Performance Reports",
    ],
    benefits: [
      "Data-Driven Decisions",
      "Performance Insights",
      "ROI Tracking",
      "Strategy Optimization",
    ],
    color: "from-indigo-500 to-indigo-600",
  },
];

export default function ServicesPage() {
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
