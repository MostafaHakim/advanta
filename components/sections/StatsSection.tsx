// "use client";

// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { Users, TrendingUp, Target, Globe } from "lucide-react";
// import Image from "next/image";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const stats = [
//   {
//     icon: <Users className="w-8 h-8" />,
//     value: 500,
//     suffix: "+",
//     label: "Happy Clients",
//     description: "Trusted by businesses worldwide",
//   },
//   {
//     icon: <TrendingUp className="w-8 h-8" />,
//     value: 150,
//     suffix: "%",
//     label: "Growth Rate",
//     description: "Average client growth",
//   },
//   {
//     icon: <Target className="w-8 h-8" />,
//     value: 1000,
//     suffix: "+",
//     label: "Projects Completed",
//     description: "Successful campaigns",
//   },
//   {
//     icon: <Globe className="w-8 h-8" />,
//     value: 50,
//     suffix: "+",
//     label: "Countries",
//     description: "Global presence",
//   },
// ];

// type Brand = {
//   _id: string;
//   name: string;
//   image: string;
// };

// const StatsSection = () => {
//   const [brands, setBrands] = useState<Brand[]>([]);
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.15,
//   });

//   const fetchBrands = async () => {
//     const res = await axios.get("/api/brand");
//     setBrands(res.data.data);
//   };

//   useEffect(() => {
//     fetchBrands();
//   }, []);

//   return (
//     <section className="relative py-6 lg:py-16 bg-linear-to-r from-blue-100 via-white to-blue-100 overflow-hidden">
//       {/* Light Background Grid */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

//       {/* Decorative Elements */}
//       <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-40" />
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30" />

//       {/* ✅ Parent container observed */}
//       <div ref={ref} className="container-custom relative z-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={stat.label}
//               initial={{ opacity: 0, y: 30 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className="text-center group"
//             >
//               {/* Icon */}
//               <div className="mx-auto mb-2 lg:mb-6 inline-flex w-10 h-10 lg:h-14 lg:w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-blue-200">
//                 <div className="text-blue-600">{stat.icon}</div>
//               </div>

//               {/* Number */}
//               <div className="lg:mb-2 flex items-baseline justify-center">
//                 <motion.span
//                   initial={{ scale: 0.6 }}
//                   animate={inView ? { scale: 1 } : {}}
//                   transition={{
//                     type: "spring",
//                     stiffness: 120,
//                     delay: index * 0.1 + 0.2,
//                   }}
//                   className=" text-2xl lg:text-4xl font-bold text-gray-900 md:text-5xl"
//                 >
//                   {stat.value}
//                 </motion.span>
//                 <span className="ml-1 text-lg md:text-2xl font-bold text-blue-600">
//                   {stat.suffix}
//                 </span>
//               </div>

//               {/* Label */}
//               <h3 className="lg:mb-2 text-lg md:text-xl font-semibold text-gray-800">
//                 {stat.label}
//               </h3>

//               {/* Description */}
//               <p className="text-gray-600 text-sm lg:text-lg">
//                 {stat.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Trusted Brands */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : {}}
//           transition={{ duration: 0.6, delay: 0.6 }}
//           className="mt-6 lg:mt-16 border-t border-gray-200 pt-6 lg:pt-12"
//         >
//           <p className="pb-6 text-center text-gray-600 text-sm lg:text-lg">
//             Trusted by leading brands worldwide
//           </p>

//           <div className="w-full mx-auto grid grid-cols-2 lg:grid-cols-5 items-center justify-center  gap-6 lg:gap-8 md:gap-16 px-4">
//             {brands.map((brand) => (
//               <div
//                 key={brand._id}
//                 className="cursor-pointer  rounded-lg hover:bg-gray-50 transition-all duration-300 group "
//               >
//                 <Image
//                   src={brand.image}
//                   alt={brand.name}
//                   width={150}
//                   height={150}
//                   className="text-base md:text-lg font-semibold text-gray-700 transition-colors group-hover:text-blue-600 rounded-lg"
//                 />
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default StatsSection;

"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Users,
  TrendingUp,
  Target,
  Globe,
  Award,
  Briefcase,
} from "lucide-react";
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
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-[#218c74] via-[#1e7a64] to-[#33d9b2] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black/5 rounded-full blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#33d9b2]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div ref={ref} className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20"
          >
            <Award className="w-4 h-4 text-[#33d9b2]" />
            <span className="text-xs font-medium text-white tracking-wider uppercase">
              Our Achievements
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 text-white"
          >
            Numbers That{" "}
            <span className="font-bold bg-gradient-to-r from-[#33d9b2] to-white bg-clip-text text-transparent">
              Speak Success
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base md:text-lg text-white/80 max-w-2xl mx-auto"
          >
            Our journey in numbers - delivering excellence across the globe
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 transition-all duration-500 hover:bg-white/20 hover:shadow-2xl hover:scale-105">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#33d9b2] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10 blur-xl"></div>

                {/* Icon */}
                <div className="mx-auto mb-4 lg:mb-6 inline-flex w-14 h-14 lg:w-16 lg:h-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110 group-hover:bg-white/30">
                  <div className="text-[#33d9b2] group-hover:text-white transition-colors duration-300">
                    {stat.icon}
                  </div>
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
                    className="text-3xl lg:text-5xl font-bold text-white"
                  >
                    {stat.value}
                  </motion.span>
                  <span className="ml-1 text-xl lg:text-3xl font-bold text-[#33d9b2]">
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <h3 className="mb-2 text-lg lg:text-xl font-semibold text-white">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm lg:text-base">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trusted Brands Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative"
        >
          {/* Divider with Gradient */}
          <div className="relative mb-8 lg:mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/20">
                TRUSTED PARTNERS
              </span>
            </div>
          </div>

          <p className="pb-6 lg:pb-8 text-center text-white/70 text-sm lg:text-base">
            Trusted by leading brands worldwide
          </p>

          <div className="w-full mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 px-4">
            {brands.map((brand, index) => (
              <motion.div
                key={brand._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 hover:bg-white/15 hover:scale-105 border border-white/10 hover:border-white/30">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={150}
                    height={150}
                    className="w-full h-auto object-contain transition-all duration-300 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                  />
                </div>
                <p className="text-center text-white/50 text-xs mt-2 group-hover:text-white/80 transition-colors duration-300">
                  {brand.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
