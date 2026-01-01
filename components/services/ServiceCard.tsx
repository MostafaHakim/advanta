import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Search,
  TrendingUp,
  MessageSquare,
  Code,
  PenTool,
  BarChart,
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  color: string;
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const iconMap: { [key: string]: ReactNode } = {
    SEO: <Search className="w-6 h-6" />,
    "Social Media": <MessageSquare className="w-6 h-6" />,
    "Web Development": <Code className="w-6 h-6" />,
    "Content Marketing": <PenTool className="w-6 h-6" />,
    PPC: <BarChart className="w-6 h-6" />,
    AI: <TrendingUp className="w-6 h-6" />,
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 border border-gray-100"
    >
      {/* Header with Gradient */}
      <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4">
              {iconMap[service.title]}
            </div>
            <h3 className="text-xl font-bold">{service.title}</h3>
          </div>
          <div className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
            Service
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-6">{service.description}</p>

        {/* Features */}
        <div className="mb-8">
          <h4 className="font-bold text-gray-900 mb-4">What's Included</h4>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h4 className="font-bold text-gray-900 mb-4">Key Benefits</h4>
          <div className="flex flex-wrap gap-2">
            {service.benefits.map((benefit, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <Link
            href={`/services/${service.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center group/link"
          >
            Learn More
            <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
          </Link>

          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            Get Quote
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
