"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface HeroData {
  success: boolean;
  data: {
    content: Array<{
      contentTitle: string;
      contentSubTitle: string;
    }>;
    titleFirst: string;
    titleLast: string;
    subTitle: string;
    marqueeLabel: string[];
  }[];
}

export default function HeroSectionUnique() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [data, setData] = useState<HeroData | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await fetch("/api/hero");
        const heroData: HeroData = await res.json();
        setData(heroData);
      } catch (error) {
        console.error("Failed to fetch hero data", error);
      }
    };
    fetchHeroData();
  }, []);

  // 🔥 Safe destructure
  const hero = data?.data?.[0];

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full blur-3xl opacity-60"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-tr from-blue-50 to-blue-100 rounded-full blur-3xl opacity-40"
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Interactive Mouse Effect */}
      <div
        className="pointer-events-none fixed inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(0, 51, 204, 0.08), transparent 40%)`,
        }}
      />

      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B1221_1px,transparent_1px),linear-gradient(to_bottom,#0B1221_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 container-custom min-h-screen flex flex-col justify-center py-20">
        {/* Main Heading */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight"
          >
            <span className="text-gray-900">{hero?.titleFirst}</span>
            <br />
            <span className="text-blue-600">{hero?.titleLast}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 mt-6 max-w-3xl leading-relaxed"
          >
            {hero?.subTitle}
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
          >
            Start Your Project
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>

          <Link
            href="/portfolio"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            View Our Work
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {hero?.content?.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {item.contentTitle}
              </div>
              <div className="text-gray-600">{item.contentSubTitle}</div>
            </div>
          ))}
        </motion.div>

        {/* Trust Marquee */}
        {hero?.marqueeLabel && hero.marqueeLabel.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10" />
            <motion.div
              animate={{ x: ["0%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex gap-12 whitespace-nowrap py-4"
            >
              {[...Array(3)].map((_, idx) => (
                <React.Fragment key={idx}>
                  {hero.marqueeLabel.map((label, i) => (
                    <div
                      key={`${idx}-${i}`}
                      className="inline-flex items-center gap-4 text-gray-500 font-medium"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      {label}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
        >
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-sm mb-3">
              Scroll to explore
            </span>
            <div className="relative">
              <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1.5 h-4 bg-blue-500 rounded-full mt-2"
                />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 border-2 border-blue-200 rounded-full opacity-50"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
