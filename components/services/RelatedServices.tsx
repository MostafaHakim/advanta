"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const allServices = [
  {
    id: "seo",
    slug: "seo-optimization",
    title: "SEO Optimization",
    description: "Improve search rankings and drive organic traffic",
    icon: "🔍",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "ppc",
    slug: "ppc-advertising",
    title: "PPC Advertising",
    description: "Targeted ads for immediate traffic and conversions",
    icon: "📈",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "social-media",
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    description: "Build brand awareness and engage your audience",
    icon: "💬",
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Development",
    description: "Build fast, responsive, and conversion-optimized websites",
    icon: "💻",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: "content-marketing",
    slug: "content-marketing",
    title: "Content Marketing",
    description: "Create valuable content that drives engagement",
    icon: "✍️",
    color: "from-orange-500 to-orange-600",
  },
];

interface RelatedServicesProps {
  currentServiceId: string;
}

const RelatedServices = ({ currentServiceId }: RelatedServicesProps) => {
  const relatedServices = allServices.filter(
    (service) => service.id !== currentServiceId
  );

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Related <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore our other digital marketing services
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedServices.slice(0, 4).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`/services/${service.slug}`}>
                <div
                  className={`bg-gradient-to-br ${service.color} rounded-2xl p-8 text-white h-full transition-transform duration-300 group-hover:shadow-2xl`}
                >
                  <div className="text-4xl mb-6">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="opacity-90 mb-6">{service.description}</p>
                  <div className="flex items-center text-white/80 group-hover:text-white">
                    <span className="font-medium">Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
          >
            View All Services
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RelatedServices;
