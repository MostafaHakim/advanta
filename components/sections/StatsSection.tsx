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
    threshold: 0.15, // mobile friendly
  });

  return (
    <section className="relative py-16 bg-gradient-to-b from-[#0a3d62] to-[#3c6382] overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      {/* ✅ Parent container observed */}
      <div ref={ref} className="container-custom relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              {/* Icon */}
              <div className="mx-auto mb-6 inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-white shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                <div className="text-blue-600">{stat.icon}</div>
              </div>

              {/* Number */}
              <div className="mb-2 flex items-baseline justify-center">
                <motion.span
                  initial={{ scale: 0.6 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    delay: index * 0.1 + 0.2,
                  }}
                  className="text-4xl font-bold text-white md:text-5xl"
                >
                  {stat.value}
                </motion.span>
                <span className="ml-1 text-xl md:text-2xl font-bold text-white">
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <h3 className="mb-2 text-lg md:text-xl font-semibold text-blue-200">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-gray-200">{stat.description}</p>
            </motion.div>
          ))}
        </div>
        {/* Trusted Brands */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 border-t border-white/20 pt-8"
        >
          <p className="mb-8 text-center text-white">
            Trusted by leading brands worldwide
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 opacity-70 md:gap-12">
            {["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"].map(
              (brand) => (
                <span
                  key={brand}
                  className="cursor-pointer text-base md:text-lg font-semibold text-white transition-colors hover:text-blue-300"
                >
                  {brand}
                </span>
              )
            )}
          </div>
        </motion.div>{" "}
      </div>
    </section>
  );
};

export default StatsSection;
