"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, TrendingUp, Target, Globe } from "lucide-react";

const stats = [
  {
    icon: <Users className="w-8 h-8" />,
    value: 500,
    suffix: "+",
    label: "Happy Clients",
    description: "Trusted by businesses worldwide",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    value: 150,
    suffix: "%",
    label: "Growth Rate",
    description: "Average client growth",
  },
  {
    icon: <Target className="w-8 h-8" />,
    value: 1000,
    suffix: "+",
    label: "Projects Completed",
    description: "Successful campaigns",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    value: 50,
    suffix: "+",
    label: "Countries",
    description: "Global presence",
  },
];

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 bg-gradient-to-b from-[#0a3d62] to-[#3c6382]  overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg mb-6 group-hover:shadow-xl transition-shadow duration-300 mx-auto">
                <div className="text-blue-600">{stat.icon}</div>
              </div>

              <div className="flex items-baseline justify-center mb-2">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="text-4xl md:text-5xl font-bold text-white"
                >
                  {stat.value}
                </motion.span>
                <span className="text-2xl font-bold text-white">
                  {stat.suffix}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-blue-200 mb-2">
                {stat.label}
              </h3>
              <p className="text-gray-200">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Trusted By Brands */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <p className="text-center text-white mb-8">
            Trusted by leading brands worldwide
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"].map(
              (brand, index) => (
                <div
                  key={brand}
                  className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {brand}
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
