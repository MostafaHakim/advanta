"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, TrendingUp, Target, Globe } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

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

type Brand = {
  _id: string;
  name: string;
  image: string;
};

const StatsSection = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const fetchBrands = async () => {
    const res = await axios.get("/api/brand");
    setBrands(res.data.data);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <section className="relative py-6 lg:py-16 bg-linear-to-r from-blue-100 via-white to-blue-100 overflow-hidden">
      {/* Light Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30" />

      {/* ✅ Parent container observed */}
      <div ref={ref} className="container-custom relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              {/* Icon */}
              <div className="mx-auto mb-2 lg:mb-6 inline-flex w-10 h-10 lg:h-14 lg:w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-blue-200">
                <div className="text-blue-600">{stat.icon}</div>
              </div>

              {/* Number */}
              <div className="lg:mb-2 flex items-baseline justify-center">
                <motion.span
                  initial={{ scale: 0.6 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    delay: index * 0.1 + 0.2,
                  }}
                  className=" text-2xl lg:text-4xl font-bold text-gray-900 md:text-5xl"
                >
                  {stat.value}
                </motion.span>
                <span className="ml-1 text-lg md:text-2xl font-bold text-blue-600">
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <h3 className="lg:mb-2 text-lg md:text-xl font-semibold text-gray-800">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm lg:text-lg">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trusted Brands */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 lg:mt-16 border-t border-gray-200 pt-6 lg:pt-12"
        >
          <p className="pb-6 text-center text-gray-600 text-sm lg:text-lg">
            Trusted by leading brands worldwide
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8 md:gap-16">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 group "
              >
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={150}
                  height={200}
                  className="text-base md:text-lg font-semibold text-gray-700 transition-colors group-hover:text-blue-600"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
