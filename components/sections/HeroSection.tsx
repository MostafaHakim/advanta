"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
React;
interface HeroData {
  success: boolean;
  data: {
    content: [
      {
        contentTitle: string;
        contentSubTitle: string;
      }
    ];
    titleFirst: string;
    titleLast: string;
    subTitle: string;
    marqueeLabel: string[];
  }[];
}

export default function HeroSectionUnique() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const [data, setData] = React.useState<HeroData | null>(null);

  React.useEffect(() => {
    // Fetch hero data from the API
    const fetchHeroData = async () => {
      try {
        const res = await fetch("/api/hero");
        const heroData = await res.json();
        setData(heroData);
      } catch (error) {
        console.error("Failed to fetch hero data", error);
      }
    };

    fetchHeroData();
  }, []);
  console.log("Hero Data:", data);
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* Cursor Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(99,102,241,0.15), transparent 40%)`,
        }}
      />

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <div className="relative z-10 container-custom flex flex-col justify-center min-h-screen">
        {/* MAIN CONTENT */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
        >
          <span className="block text-gray-300">
            {" "}
            {data?.data[0].titleFirst}
          </span>
          <span className="block bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {data?.data[0].titleLast}
          </span>
          <span className="block text-gray-400 text-2xl mt-4 max-w-2xl font-normal">
            {data?.data[0].subTitle}
          </span>
        </motion.h1>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-5"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-7 py-3 font-semibold hover:scale-105 transition"
          >
            Let’s Work Together
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
          </Link>

          <Link
            href="/portfolio"
            className="inline-flex items-center rounded-full border border-white/30 px-7 py-3 text-gray-300 hover:text-white hover:border-white transition"
          >
            View Portfolio
          </Link>
        </motion.div>

        {/* STATS */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
          {data?.data[0].content?.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="text-3xl font-bold">{item.contentTitle}</div>
              <div className="text-gray-400 mt-1 text-sm">
                {item.contentSubTitle}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-10 w-full overflow-hidden">
        <motion.div
          animate={{ x: ["50%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="flex gap-12 text-gray-400 text-lg whitespace-nowrap"
        >
          {data?.data[0].marqueeLabel?.map((item, i) => (
            <span key={i} className="opacity-70">
              ✦ {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
